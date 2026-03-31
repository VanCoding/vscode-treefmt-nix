{ inputs, ... }:
{
  perSystem =
    { pkgs, ... }:
    {
      packages.treefmt =
        (inputs.treefmt-nix.lib.evalModule pkgs {
          programs.nixfmt.enable = true;
          programs.oxfmt.enable = true;
        }).config.build.wrapper;
    };
}
