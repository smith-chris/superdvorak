
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# After installing brew

echo >> /Users/chris-work/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/chris-work/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

brew install node

brew install yarn

# For react-native
brew install watchman

# Mise

curl https://mise.run | sh

# After installing Mise

echo "eval \"\$(/Users/chris-work/.local/bin/mise activate zsh)\"" >> "/Users/chris-work/.zshrc"
echo "eval \"\$(/Users/chris/.local/bin/mise activate zsh)\"" >> "/Users/chris/.zshrc"

# Optional: Fixing mise pods

which pod
cd /Users/chris-work/.local/share/mise/installs/cocoapods/1.15.2 && bundle install

# Settings to alter

Accessibility -> Zoom -> [x] Use scroll gesture with modifier keys to zoom

Accessibility -> Pointer Control -> Trackpad Options -> [x] Use trackpad for dragging (Three fingers)

Keyboard ->
    Key repat rate: Fast
    Delay until repeat: Short
    Adjust keyboard brightness in low light: Off
    Press [Globe] key to: (Do nothing)

Desktop & Dock -> 
    Click wallpaper to reveal desktop (Only in Stage Manager)
    Tilled Windows have margins [OFF]
    Hot Corners (disable all)

Control Center ->
    Bluetooth: Show in Menu Bar
    Sound: Always Show in Menu Bar
    Automatically hide and show the menu bar: Never

Displays ->
Automatically adjust brightness [OFF]


# Finder

Toolbar: Go To -> Computer
Move 'Macintosh HD' & 'chris/chris-work' to the sidebar

# Terminal

Theme: Pro (set as Default)
Font: Monaco 14

# Links

https://brave.com/pl/download/

https://code.visualstudio.com/docs/?dv=osx

https://www.google.com/chrome/

https://www.cursor.com/


# VS Code

# Preferences
{
    "editor.inlineSuggest.enabled": true,
    "sync.gist": "fe8394b4a73fb693d7563c3be23b21a3",
    "workbench.sideBar.location": "right",
    "editor.fontSize": 14,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}

# Shortcuts

[
    {
        "key": "cmd+m",
        "command": "explorer.newFile"
    },
    {
        "key": "shift+cmd+m",
        "command": "explorer.newFolder"
    },
    {
        "key": "shift+cmd+m",
        "command": "-workbench.actions.view.problems",
        "when": "workbench.panel.markers.view.active"
    },
    {
        "key": "f2",
        "command": "renameFile",
        "when": "filesExplorerFocus && foldersViewVisible && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
    },
    {
        "key": "enter",
        "command": "-renameFile",
        "when": "filesExplorerFocus && foldersViewVisible && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
    }
]

# Git

# .gitconfig
[include]
   path = ./sc-config/.gitconfig 
[filter "lfs"]
	required = true
	clean = git-lfs clean -- %f
	smudge = git-lfs smudge -- %f
	process = git-lfs filter-process
	ui = true
[core]
	editor = code --wait


# Fix Xcode

defaults write /Applications/Xcode-15.app/Contents/Info.plist CFBundleVersion -string 23051 

# Better display

https://github.com/waydabber/BetterDisplay
93E62DFD-102399D6-202BBA32-5D117663-32E41D74