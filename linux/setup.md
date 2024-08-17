# ASDF

## git if not present

sudo apt update
sudo apt install curl git

## clone asdf to home (guide[https://asdf-vm.com/guide/getting-started.html])

git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0

## add asdf to bash

echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
source ~/.bashrc

# Node

## dependencies

sudo apt-get install dirmngr gpg curl gawk

asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Docker

## zorin 17 uses ubuntu jammy (22.04 LTS)

https://download.docker.com/linux/ubuntu/dists/