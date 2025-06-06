#!/bin/bash

# Exit on error
set -e
set -o pipefail

# Configuration
REACT_APP_DIR="/var/www/eduapp"
NGINX_DIR="/var/www/html"
BACKUP_DIR="/var/www/backups"
LOG_DIR="/var/log/eduapp"
LOG_FILE="$LOG_DIR/eduapp.log"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Default SERVER_NAME (can be overridden by .env file)
SERVER_NAME="13.200.225.145"  # Using IP address instead of full domain name

# Create log directory and file first
sudo mkdir -p "$LOG_DIR"
sudo touch "$LOG_FILE"
sudo chown -R $USER:$USER "$LOG_DIR"
sudo chmod -R 755 "$LOG_DIR"
sudo chmod 644 "$LOG_FILE"

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | sudo tee -a "$LOG_FILE"
}

# Error handling
handle_error() {
    log "Error occurred in deployment at line $1"
    # Add rollback logic here if needed
    exit 1
}
trap 'handle_error $LINENO' ERR

# Create necessary directories
log "Creating necessary directories"
sudo mkdir -p "$REACT_APP_DIR" "$BACKUP_DIR" "$NGINX_DIR"
sudo chown -R $USER:$USER "$REACT_APP_DIR" "$BACKUP_DIR"
sudo chmod -R 755 "$REACT_APP_DIR" "$BACKUP_DIR"

# Load environment variables if exists
if [ -f .env ]; then
    log "Loading environment variables from .env file"
    source .env
fi

# Set memory limits for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
export NODE_ENV=production

# Verify required environment variables
if [ -z "$SERVER_NAME" ]; then
    log "Warning: SERVER_NAME not set in .env, using default: $SERVER_NAME"
fi

# Backup current deployment
backup_current() {
    log "Creating backup of current deployment"
    if [ -d "$NGINX_DIR" ]; then
        sudo tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C "$NGINX_DIR" .
        log "Backup created: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
    fi
}

# Verify Node.js and npm installation
verify_dependencies() {
    log "Verifying Node.js and npm installation"
    
    # Check and install git
    if ! command -v git &> /dev/null; then
        log "Git not found. Installing..."
        sudo apt-get update
        sudo apt-get install -y git
    fi
    
    # Check and install Node.js
    if ! command -v node &> /dev/null; then
        log "Node.js not found. Installing..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    
    # Check and install npm
    if ! command -v npm &> /dev/null; then
        log "npm not found. Installing..."
        sudo apt-get install -y npm
    fi
    
    # Log versions
    log "Git version: $(git --version)"
    log "Node.js version: $(node --version)"
    log "npm version: $(npm --version)"
}

# Update system packages
update_system() {
    log "Updating system packages"
    sudo apt-get update -y
    sudo apt-get install -y nginx
}

# Configure Nginx main configuration
configure_nginx_main() {
    log "Configuring Nginx main settings"
    local NGINX_MAIN_CONF="/etc/nginx/nginx.conf"
    
    # Backup the original configuration
    sudo cp "$NGINX_MAIN_CONF" "${NGINX_MAIN_CONF}.bak"
    
    # Add or update server_names_hash_bucket_size
    if ! grep -q "server_names_hash_bucket_size" "$NGINX_MAIN_CONF"; then
        sudo sed -i '/http {/a \    server_names_hash_bucket_size 128;' "$NGINX_MAIN_CONF"
    else
        sudo sed -i 's/server_names_hash_bucket_size.*/server_names_hash_bucket_size 128;/' "$NGINX_MAIN_CONF"
    fi
    
    log "Nginx main configuration updated"
}

# Deploy application
deploy_app() {
    log "Starting deployment process"
    
    # Remove existing directory if it exists
    if [ -d "$REACT_APP_DIR" ]; then
        log "Removing existing directory: $REACT_APP_DIR"
        sudo rm -rf "$REACT_APP_DIR"
        # Recreate the directory
        sudo mkdir -p "$REACT_APP_DIR"
        sudo chown $USER:$USER "$REACT_APP_DIR"
        sudo chmod 755 "$REACT_APP_DIR"
    fi
    
    # Clone the repository
    log "Cloning repository"
    cd /var/www
    git clone https://github.com/mathsenseacademy/eduapp "$REACT_APP_DIR" || handle_error $LINENO
    cd "$REACT_APP_DIR"
    
    # Verify we're in the correct directory
    if [ ! -f "package.json" ]; then
        log "Error: package.json not found in $(pwd)"
        handle_error $LINENO
    fi
    
    # Install dependencies and build
    log "Installing dependencies"
    # Clear npm cache
    npm cache clean --force
    
    # Try npm ci first, fall back to npm install if it fails
    npm ci || {
        log "npm ci failed, trying npm install"
        npm install || handle_error $LINENO
    }
    
    # Build the application with memory optimization and retry
    log "Building application with memory optimization..."
    for i in {1..3}; do
        # Clear cache and build with increased memory
        rm -rf node_modules/.cache
        NODE_OPTIONS="--max-old-space-size=4096" npm run build && break || {
            log "Build failed, attempt $i/3"
            sleep 10
            # Try cleaning up more resources
            if [ $i -lt 3 ]; then
                log "Cleaning up resources before retry..."
                npm cache clean --force
                rm -rf node_modules
                npm ci
            fi
        }
        if [ $i -eq 3 ]; then
            log "Failed to build application after 3 attempts"
            exit 1
        fi
    done || handle_error $LINENO
    
    # Verify build directory exists
    if [ ! -d "build" ]; then
        log "Error: Build directory not found"
        handle_error $LINENO
    fi
    
    # Verify static directory exists in build
    if [ ! -d "build/static" ]; then
        log "Error: static directory not found in build"
        handle_error $LINENO
    fi
    
    log "Build completed successfully"
}

# Configure Nginx
configure_nginx() {
    log "Configuring Nginx"
    
    # Configure main Nginx settings first
    configure_nginx_main
    
    local NGINX_CONF="/etc/nginx/sites-available/react-app"
    
    # Remove existing configuration if it exists
    if [ -f "$NGINX_CONF" ]; then
        sudo rm "$NGINX_CONF"
    fi
    
    # Remove existing symlink if it exists
    if [ -L "/etc/nginx/sites-enabled/react-app" ]; then
        sudo rm "/etc/nginx/sites-enabled/react-app"
    fi
    
    # Remove default nginx site if it exists
    if [ -L "/etc/nginx/sites-enabled/default" ]; then
        sudo rm "/etc/nginx/sites-enabled/default"
    fi
    
    # Create new configuration
    sudo tee "$NGINX_CONF" > /dev/null << EOL
server {
    listen 80 default_server;
    server_name $SERVER_NAME;
    
    root /var/www/html;
    index index.html;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Serve static files
    location /static/ {
        root /var/www/html;
        try_files \$uri \$uri/ =404;
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
    
    # Serve other static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root /var/www/html;
        try_files \$uri =404;
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
    
    # Main application - handle all routes
    location / {
        root /var/www/html;
        try_files \$uri \$uri/ /index.html;
    }
    
    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
}
EOL

    # Create symlink
    sudo ln -s "$NGINX_CONF" /etc/nginx/sites-enabled/
    
    # Test Nginx configuration
    if ! sudo nginx -t; then
        log "Error: Nginx configuration test failed"
        handle_error $LINENO
    fi
    log "Nginx configuration verified"
}

# Verify deployment
verify_deployment() {
    log "Verifying deployment"
    
    # Wait for Nginx to restart
    sleep 5
    
    # Check if Nginx is running
    if ! systemctl is-active --quiet nginx; then
        log "Error: Nginx is not running"
        handle_error $LINENO
    fi
    
    # Check if the build directory exists and has content
    if [ ! -f "$NGINX_DIR/index.html" ]; then
        log "Error: index.html not found in $NGINX_DIR"
        handle_error $LINENO
    fi
    
    # Check if static directory exists and has content
    if [ ! -d "$NGINX_DIR/static" ]; then
        log "Error: static directory not found in $NGINX_DIR"
        handle_error $LINENO
    fi
    
    # List contents of the static directory for verification
    log "Contents of static directory:"
    ls -la "$NGINX_DIR/static" | sudo tee -a "$LOG_FILE"
    
    # Check if the application is accessible
    local max_retries=3
    local retry_count=0
    local success=false
    
    while [ $retry_count -lt $max_retries ] && [ "$success" = false ]; do
        if curl -s -f "http://$SERVER_NAME" > /dev/null; then
            success=true
            log "Application is accessible"
        else
            retry_count=$((retry_count + 1))
            log "Attempt $retry_count: Application not accessible, retrying..."
            sleep 5
        fi
    done
    
    if [ "$success" = false ]; then
        log "Error: Application not accessible after $max_retries attempts"
        log "Checking Nginx error logs:"
        sudo tail -n 20 /var/log/nginx/error.log
        handle_error $LINENO
    fi
    
    log "Deployment verification successful"
}

# Main deployment process
main() {
    log "Starting deployment process"
    
    # Execute deployment steps
    backup_current
    verify_dependencies
    update_system
    deploy_app
    
    # Verify the static directory exists
    if [ ! -d "$NGINX_DIR/static" ]; then
        log "Error: static directory not found in build"
        handle_error $LINENO
    fi
    
    # Set proper permissions
    sudo chown -R www-data:www-data "$NGINX_DIR"
    sudo chmod -R 755 "$NGINX_DIR"
    
    # Verify build files were copied
    if [ ! -f "$NGINX_DIR/index.html" ]; then
        log "Error: Failed to copy build files"
        handle_error $LINENO
    fi
    
    # List contents of the static directory for verification
    log "Contents of static directory:"
    ls -la "$NGINX_DIR/static" | sudo tee -a "$LOG_FILE"
    
    configure_nginx
    sudo systemctl restart nginx
    verify_deployment
    
    log "Deployment completed successfully"
}

# Run main function
main
