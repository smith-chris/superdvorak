To install Docker on Zorin OS, which is based on Ubuntu, follow these steps:
Step 1: Update Your System

First, it's good practice to ensure your system is up-to-date.

    Open a terminal.

    Run the following commands:

    bash

    sudo apt update
    sudo apt upgrade -y

Step 2: Install Required Dependencies

Install necessary packages to allow apt to use a repository over HTTPS:

bash

sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

Step 3: Add Docker’s Official GPG Key

To ensure the downloads are valid, add Docker’s official GPG key:

bash

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

Step 4: Set Up the Docker Repository

Add the Docker APT repository:

bash

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

Step 5: Update Package Database

After adding the Docker repository, update your package database:

bash

sudo apt update

Step 6: Install Docker

Now, install Docker:

bash

sudo apt install docker-ce docker-ce-cli containerd.io -y

Step 7: Start and Enable Docker

Ensure Docker is started and configured to start on boot:

bash

sudo systemctl start docker
sudo systemctl enable docker

Step 8: Verify Docker Installation

Check if Docker is installed correctly by running:

bash

sudo docker --version

You should see the version of Docker installed.
Optional: Manage Docker as a Non-Root User

If you want to use Docker without needing sudo:

    Create a Docker group:

    bash

sudo groupadd docker

Add your user to the Docker group:

bash

sudo usermod -aG docker $USER

Log out and log back in to apply the group membership.

Test Docker without sudo:

bash

    docker run hello-world

If everything is set up correctly, Docker should download and run a test container, displaying a success message.

That's it! Docker is now installed on your Zorin OS.