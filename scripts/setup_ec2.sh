#!/bin/bash
# setup_ec2.sh
# Run this script on your AWS EC2 instance (Amazon Linux 2023) to set up Docker and Git

# 1. Update the system
echo "Updating system..."
sudo dnf update -y

# 2. Install Git
echo "Installing Git..."
sudo dnf install git -y

# 3. Install Docker
echo "Installing Docker..."
sudo dnf install docker -y

# 4. Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker



# 5. Add user to the docker group
sudo usermod -aG docker ec2-user

# 6. Install Certbot (SSL)
echo "Installing Certbot..."
sudo dnf install certbot -y

# 7. Install Docker Compose (System-wide for sudo access)
echo "Installing Docker Compose..."
# Check latest version on: https://github.com/docker/compose/releases
sudo mkdir -p /usr/local/lib/docker/cli-plugins/
sudo curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

echo "Setup complete! Please logout and log back in for docker group changes to take effect."
