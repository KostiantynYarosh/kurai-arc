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



# 6. Install Docker Compose (System-wide for sudo access)
echo "Installing Docker Compose..."
# Check latest version on: https://github.com/docker/compose/releases
DOCKER_COMPOSE_VERSION="v2.24.5" 
sudo mkdir -p /usr/local/lib/docker/cli-plugins/
sudo curl -SL https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

echo "Setup complete! Please logout and log back in for docker group changes to take effect."
