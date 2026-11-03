"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { GEC_VIDEO_ID, gecImages, gecVideo } from "@/content/gec-academy";

// The film in a rounded 16:9 card: the thumbnail with a green play button. YouTube (the
// privacy-enhanced domain) loads only when it's played.
export default function VideoCard() {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) iframeRef.current?.focus();
  }, [playing]);

  return (
    <div className="relative mx-auto aspect-video w-full max-w-[960px] overflow-hidden rounded-2xl bg-ink/[0.06] shadow-[0_8px_24px_rgba(22,33,61,0.12)]">
      {playing ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${GEC_VIDEO_ID}?autoplay=1&modestbranding=1&rel=0`}
          title={gecVideo.iframeTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          aria-label={gecVideo.playLabel}
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-accent"
        >
          <Image
            src={gecImages.videoThumbnail.src}
            alt=""
            fill
            loading="lazy"
            sizes="(min-width: 1056px) 960px, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-ink/0 to-ink/50" aria-hidden="true" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-ink shadow-[0_4px_14px_rgba(22,33,61,0.25)] transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none md:h-20 md:w-20">
            <Play className="ml-1 h-7 w-7 fill-current md:h-8 md:w-8" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-1.5 text-[14px] font-medium text-ink md:bottom-5 md:left-5">
            {gecVideo.badge}
          </span>
        </button>
      )}
    </div>
  );
}
