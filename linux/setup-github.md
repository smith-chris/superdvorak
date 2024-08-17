Setting up SSH access to GitHub from a Linux machine involves generating an SSH key, adding the key to the SSH agent, and then adding the SSH key to your GitHub account. Here's a step-by-step guide:
1. Check for Existing SSH Keys

Before generating a new SSH key, check if you already have one by running:

bash

ls -al ~/.ssh

If you see id_rsa and id_rsa.pub, you have existing SSH keys. If not, proceed to the next step to generate a new key.
2. Generate a New SSH Key

If you don't have an SSH key or want to generate a new one, run the following command:

bash

ssh-keygen -t ed25519 -C "your_email@example.com"

If you're using an older system that doesn't support the ed25519 algorithm, you can use rsa:

bash

ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

    When prompted to "Enter a file in which to save the key," press Enter to accept the default location (~/.ssh/id_ed25519 or ~/.ssh/id_rsa).
    You can choose to add a passphrase for an extra layer of security or press Enter to leave it empty.

3. Add Your SSH Key to the SSH Agent

Start the SSH agent in the background:

bash

eval "$(ssh-agent -s)"

Then add your SSH private key to the SSH agent:

bash

ssh-add ~/.ssh/id_ed25519

Or if you're using RSA:

bash

ssh-add ~/.ssh/id_rsa

4. Add Your SSH Key to GitHub

Copy the SSH public key to your clipboard:

bash

cat ~/.ssh/id_ed25519.pub

Or for RSA:

bash

cat ~/.ssh/id_rsa.pub

    Copy the output of the command, which is your SSH public key.

Now, add the key to your GitHub account:

    Go to GitHub's SSH settings.
    Click "New SSH key" or "Add SSH key."
    Paste your key into the "Key" field.
    Give it a title (e.g., "My Linux machine").
    Click "Add SSH key."

5. Test Your Connection

To test that your SSH key is set up correctly, run:

bash

ssh -T git@github.com

You should see a message like:

vbnet

Hi username! You've successfully authenticated, but GitHub does not provide shell access.

This means your SSH setup is complete, and you can now use SSH to connect to GitHub.