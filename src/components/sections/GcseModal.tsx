"use client";

import { useEffect } from "react";
import { gcse } from "@/content/gcse";

export default function GcseModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 py-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gcse-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-xl bg-paper p-8 shadow-2xl sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h3 id="gcse-modal-title" className="text-h3 text-ink">
          {gcse.title}
        </h3>

        <div className="mt-6 space-y-6">
          {gcse.projects.map((project) => (
            <div key={project.year}>
              <p className="text-caption font-medium uppercase tracking-wide text-brand">
                {project.year}
              </p>
              <h4 className="mt-1 text-body-lg font-semibold text-ink">
                {project.title}
              </h4>
              <p className="mt-2 text-body-lg text-muted">
                {project.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-caption font-medium uppercase tracking-wide text-muted">
          {gcse.skillsLabel}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {gcse.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-accent/10 px-3 py-1 text-caption font-medium text-ink"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
