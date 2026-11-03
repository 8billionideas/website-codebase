import Image from "next/image";
import { MONEY_MASTERS_IMAGE } from "@/content/money-masters";

// The Money Masters box in a 4/3 frame (shown whole, its off-white background blended into the
// paper with multiply), or a mint "Image coming soon" block when MONEY_MASTERS_IMAGE is null. Used
// at the top of /money-masters (the /resources row uses the kits' own image frame).
export default function MoneyMastersImage({ sizes, priority = false }: { sizes: string; priority?: boolean }) {
  if (MONEY_MASTERS_IMAGE) {
    return (
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={MONEY_MASTERS_IMAGE.src}
          alt={MONEY_MASTERS_IMAGE.alt}
          fill
          sizes={sizes}
          {...(priority ? { preload: true } : { loading: "lazy" as const })}
          className="object-contain mix-blend-multiply"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-accent/[0.18]">
      <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">Image coming soon</p>
    </div>
  );
}
