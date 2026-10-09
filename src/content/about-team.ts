// /about "The people behind 8billionideas" collage.

export interface TeamPhoto {
  src: string;
  alt: string;
  // object-position inside the 4/3 frame (keeps faces in view where the source isn't 4/3).
  position: string;
}

export interface TeamQuote {
  text: string;
  name: string;
  role: string;
}

export const teamPhotos = {
  // IMG_2746.jpg (1250×1102) — near-square, so cropped from near the top to keep heads.
  group: {
    src: "/images/about/team/team-group.webp",
    alt: "The 8billionideas team together in the office",
    position: "50% 15%",
  },
  // IMG_7396.jpg (4032×3024)
  schoolVisit: {
    src: "/images/about/team/team-school-visit.webp",
    alt: "A member of the 8billionideas team on a visit to a primary school",
    position: "50% 50%",
  },
  // hq720.jpg (686×386)
  radio: {
    src: "/images/about/team/team-radio.webp",
    alt: "A member of the 8billionideas team speaking on a radio show",
    position: "50% 40%",
  },
  // "Joyful Laughter in a Modern Lounge.png" (1254×1254) — square, cropped from the top third.
  laughing: {
    src: "/images/about/team/team-laughing.webp",
    alt: "Two members of the 8billionideas team laughing together",
    position: "50% 30%",
  },
} satisfies Record<string, TeamPhoto>;

// Optional quote cards in the desktop collage. null renders nothing.
export const teamQuotes: { nearGroup: TeamQuote | null; betweenRight: TeamQuote | null } = {
  nearGroup: null,
  betweenRight: null,
};
