#!/bin/bash

# Update system and install dependencies
sudo apt-get update -y
sudo apt-get install -y nginx

# Create React app directory if it doesn't exist
REACT_APP_DIR="/var/www/react-app"
if [ ! -d "$REACT_APP_DIR" ]; then
    sudo mkdir -p $REACT_APP_DIR
fi

# Clone or pull the latest code
if [ -d "$REACT_APP_DIR/.git" ]; then
    cd $REACT_APP_DIR
    git fetch origin
    git reset --hard origin/main
else
    cd /var/www
    git clone https://github.com/yourusername/react-repo.git react-app
    cd react-app
fi

# Install dependencies and build
sudo npm install
sudo npm run build

# Copy build files to nginx directory
sudo cp -r build/* /var/www/html/

# Configure Nginx if not already configured
NGINX_CONF="/etc/nginx/sites-available/react-app"
if [ ! -f "$NGINX_CONF" ]; then
    sudo tee $NGINX_CONF > /dev/null << EOL
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
EOL
    sudo ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/
fi

# Restart Nginx
sudo service nginx restart

echo "React app deployed successfully!"
