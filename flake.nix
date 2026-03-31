{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";
  };

  outputs =
    inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      imports = [ ./nix/treefmt.nix ];
      perSystem =
        { pkgs, self', ... }:
        {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs
              pkgs.pnpm
              self'.packages.treefmt
              pkgs.typescript-go
              pkgs.vsce
            ];
          };
        };
    };
}
