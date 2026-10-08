import Image from "next/image";
import { gcseSchools, type ChampionSchool } from "@/content/schools";

// Logo box inside each tile (200×88 tile minus 14px padding). Logos are scaled
// to the same visible area, then capped to the box, so wide wordmarks and
// narrow crests read as an even size.
const BOX_W = 172;
const BOX_H = 60;
const TARGET_AREA = BOX_W * BOX_H * 0.65;

function logoWidthPercent({ width, height }: ChampionSchool["logo"]) {
  const scale = Math.min(Math.sqrt(TARGET_AREA / (width * height)), BOX_W / width, BOX_H / height);
  return `${((width * scale) / BOX_W) * 100}%`;
}

function LogoList({ schools, hidden = false }: { schools: ChampionSchool[]; hidden?: boolean }) {
  return (
    // pr-4 matches the gap, so each copy is exactly half the track and the loop has no jump.
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 list-none gap-4 p-0 pr-4 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      {schools.map((school) => (
        <li
          key={school.slug}
          className="flex h-[72px] w-[160px] shrink-0 items-center justify-center rounded-xl bg-white p-3 md:h-[88px] md:w-[200px] md:p-[14px]"
        >
          <Image
            src={school.logo.src}
            alt={hidden ? "" : school.logo.alt}
            width={school.logo.width}
            height={school.logo.height}
            unoptimized
            // Eager: tiles start off-screen inside the strip, and lazy ones would pop in mid-scroll.
            loading="eager"
            className="max-h-full object-contain mix-blend-multiply"
            style={{ width: logoWidthPercent(school.logo), height: "auto" }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function ChampionSchools({ schools = gcseSchools }: { schools?: ChampionSchool[] }) {
  return (
    <div className="mt-16">
      <div className="h-px w-full bg-white/10" aria-hidden="true" />
      <p className="mt-10 text-center text-[12px] uppercase tracking-[0.25em] text-white/65">
        OUR CHAMPION SCHOOLS
      </p>

      {/* Focusable so keyboard users can pause it too; the edge fade only applies while it scrolls. */}
      <div
        role="region"
        aria-label="Our champion schools"
        tabIndex={0}
        className="group mt-6 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-safe:[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
      >
        <div className="flex w-max motion-safe:animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused] motion-reduce:w-full">
          <LogoList schools={schools} />
          <LogoList schools={schools} hidden />
        </div>
      </div>
    </div>
  );
}
