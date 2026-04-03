<p align="center">
  <img src="logo.png" alt="vscode-treefmt-nix logo" width="180" />
</p>

# vscode-treefmt-nix

A VSCode extension to format all files using [trefmt-nix](https://github.com/numtide/treefmt-nix).

## How to use

The extension itself is zero-config. It expects a binary called "treefmt" in your PATH.
This can be the official treefmt binary, or a wrapper that includes the treefmt config file, like the one you get from treefmt-nix.

This repository also uses treefmt-nix. You can look at it's code for an example.

## Development

### Prerequisites

- Install [Nix](https://nixos.org/download/) and [Direnv](https://direnv.net/)
- Create an `.envrc` file by copying the default:

  ```
  cp .envrc.example .envrc
  ```

- Then initialize dev shell by running
  ```
  direnv allow
  ```

### Making Changes

- Edit code
- Compile and install the extension
  ```
  npm run install-extension
  ```

### Publishing new versions

- Build the extension
  ```
  npm run package
  ```
- Upload the version on https://marketplace.visualstudio.com/manage/publishers/vancoding

## Attributions

This project was derived from the [treefmt-vscode](https://github.com/isbecker/treefmt-vscode) project by isbecker, and thus inherited it's GPL license.

The logo was generated with Google Gemini.
