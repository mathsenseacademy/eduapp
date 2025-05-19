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
SERVER_NAME="15.206.148.160"  # Using IP address instead of full domain name

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
    
    log "Building application"
    npm run build || handle_error $LINENO
    
    # Verify build directory exists
    if [ ! -d "build" ]; then
        log "Error: Build directory not found"
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
    
    # Create new configuration
    sudo tee "$NGINX_CONF" > /dev/null << EOL
server {
    listen 80;
    server_name $SERVER_NAME;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache control
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
    
    location / {
        root $NGINX_DIR;
        index index.html;
        try_files \$uri \$uri/ /index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
    }
    
    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
EOL

    # Create symlink
    sudo ln -s "$NGINX_CONF" /etc/nginx/sites-enabled/
    
    # Test Nginx configuration
    sudo nginx -t || handle_error $LINENO
    log "Nginx configuration verified"
}

# Verify deployment
#verify_deployment() {
    #log "Verifying deployment"
    # Wait for Nginx to restart
    #sleep 5
    
    # Check if the application is accessible
    #if ! curl -s -f "http://$SERVER_NAME" > /dev/null; then
    #    log "Error: Application not accessible after deployment"
   #     handle_error $LINENO
  #  fi
 #   log "Deployment verification successful"
#}

# Main deployment process
main() {
    log "Starting deployment process"
    
    # Execute deployment steps
    backup_current
    verify_dependencies
    update_system
    deploy_app
    
    # Copy build files with proper permissions
    log "Copying build files"
    sudo rm -rf "$NGINX_DIR"/*
    sudo cp -r "$REACT_APP_DIR/build/"* "$NGINX_DIR"/
    sudo chown -R www-data:www-data "$NGINX_DIR"
    sudo chmod -R 755 "$NGINX_DIR"
    
    configure_nginx
    sudo systemctl restart nginx
    #verify_deployment
    
    log "Deployment completed successfully"
}

# Run main function
main
