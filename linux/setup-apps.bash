# https://tableplus.com/blog/2019/10/tableplus-linux-installation.html#apt

# Ubuntu 22.04 X86_64

# Add TablePlus gpg key
wget -qO - https://deb.tableplus.com/apt.tableplus.com.gpg.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/tableplus-archive.gpg > /dev/null

# Add TablePlus repo
sudo add-apt-repository "deb [arch=amd64] https://deb.tableplus.com/debian/22 tableplus main"

# Install tableplus
sudo apt update
sudo apt install tableplus


# Install postgres 
sudo apt update
sudo apt install postgresql

# Add postgres service


# Set postgres user password
sudo -i -u postgres
psql
# you will be asked for password for user 'postgres'
\password postgres
CREATE DATABASE "x";
\q
exit
