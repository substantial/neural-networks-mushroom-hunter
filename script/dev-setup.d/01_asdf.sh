# shellcheck shell=bash
# WARNING: DO NOT MODIFY
# This file was generated by Subscript as part of the dev-setup-asdf package.
# Do not modify it directly. Instead, you may update the package in Subscript:
# 
# https://github.com/substantial/subscript/tree/master/packages/dev-setup-asdf
# 
# Then use "sub update dev-setup-asdf" to update this file.

function install-asdf {
  if ! cmd asdf; then
    if [ ! -d ~/.asdf ]; then
      info "Installing asdf to ~/.asdf..."
      git clone https://github.com/HashNuke/asdf.git ~/.asdf
    fi

    error "Please add asdf to your bashrc/zshrc:"
    echo
    echo "# For Ubuntu or other linux distros"
    printf "echo -e '\\n. %s/.asdf/asdf.sh' >> ~/.bashrc" "$HOME"
    echo
    printf "echo -e '\\n. %s/.asdf/completions/asdf.bash' >> ~/.bashrc" "$HOME"
    echo
    echo
    echo "# OR for Max OSX"
    printf "echo -e '\\n. %s/.asdf/asdf.sh' >> ~/.bash_profile" "$HOME"
    echo
    printf "echo -e '\\n. %s/.asdf/completions/asdf.bash' >> ~/.bash_profile" "$HOME"
    echo
    warn "If you use zsh or any other shell, replace .bashrc with the config file for the respective shell"

    exit 1
  fi
}

function add-asdf-plugin {
  install-asdf

  if ! asdf plugin-list | grep -q "$1"; then
    info "Installing the asdf plugin for $1..."
    asdf plugin-add "$1" "$2"
  fi

  if [ "$1" = "nodejs" ]; then
    export GNUPGHOME="${ASDF_DIR:-$HOME/.asdf}/keyrings/nodejs"
    if [ ! -d "$GNUPGHOME" ] || \
         ! gpg --list-keys | grep -q 821C587A; then
      info "No keyring found. Importing..."
      if ! cmd gpg; then
        install-package gnupg
      fi
      rm -rf "$GNUPGHOME"
      mkdir -p "$GNUPGHOME"
      chmod 0700 "$GNUPGHOME"
      ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
    fi
  fi
}

function install-asdf-plugins {
  install-asdf

  if ! asdf install > /dev/null; then
    info "Installation of tools failed, updating plugins and trying again..."

    # shellcheck disable=SC2034
    while IFS=' ' read -r plugin version
    do
      asdf plugin-update "$plugin"
    done < .tool-versions

    asdf install
  fi
}