"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Copies a discount code; the label says "Copied" for two seconds (announced to screen readers).
export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard unavailable (e.g. an insecure context): select-and-copy fallback.
      const field = document.createElement("textarea");
      field.value = code;
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-ink/25 bg-white px-4 text-[14px] font-medium text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
    >
      {copied ? (
        <Check className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Copied" : `Copy ${code}`}</span>
    </button>
  );
}
