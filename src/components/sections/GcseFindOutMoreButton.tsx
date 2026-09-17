"use client";

import { useState } from "react";
import GcseModal from "@/components/sections/GcseModal";

export default function GcseFindOutMoreButton({ label }: { label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mirrors PrimaryCTA's styling — a <button> here, not a <Link>, since it opens the modal instead of navigating. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-body font-medium text-ink transition-opacity hover:opacity-90"
      >
        {label}
      </button>
      <GcseModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
