{ inputs, ... }:
{
  imports = [
    inputs.treefmt-nix.flakeModule
  ];
  perSystem.treefmt = {
    programs.nixfmt.enable = true;
    programs.oxfmt.enable = true;
  };
}
