import Image from "next/image";

// "light" (default) is the original logo for light backgrounds. "dark" is the
// white-wordmark version on a transparent background, for ink sections.
// logo-on-dark.png was generated from logo.png (wordmark recoloured to white,
// green dots unchanged); swap in an official version when one is available.
export default function Logo({
  background = "light",
  className = "",
  preload = true,
}: {
  background?: "light" | "dark";
  className?: string;
  // On for the nav (above the fold); off for the footer.
  preload?: boolean;
}) {
  return (
    <Image
      src={background === "dark" ? "/images/logo-on-dark.png" : "/logo.png"}
      alt="8billionideas"
      width={154}
      height={52}
      preload={preload}
      className={className}
    />
  );
}
