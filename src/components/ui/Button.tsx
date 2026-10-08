import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

// The one style for every button-style CTA on the site: green with ink text,
// turning white (with a thin border and soft shadow) on hover. Inline text
// links are not buttons and don't use this.

type Size = "default" | "form";

interface CommonProps {
  children: ReactNode;
  className?: string;
  // Thin ArrowRight on the right, nudging 2px on hover.
  arrow?: boolean;
  // "default" is 48px tall; "form" is the 56px full-width form submit. Min heights,
  // so a long label can wrap on narrow screens instead of overflowing.
  size?: Size;
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    // Shows a spinner before the (caller-supplied) loading text, e.g. "Sending…".
    loading?: boolean;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const SIZE_CLASSES: Record<Size, string> = {
  default: "min-h-12",
  form: "min-h-14 w-full",
};

export function buttonClasses(size: Size = "default", className = "") {
  return [
    "group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent bg-accent px-5 py-2 text-center sm:px-7 text-body font-medium text-ink",
    "transition-[background-color,border-color,box-shadow] duration-150 motion-reduce:transition-none",
    "not-disabled:hover:border-ink/15 not-disabled:hover:bg-white not-disabled:hover:shadow-[0_4px_14px_rgba(22,33,61,0.10)]",
    "not-disabled:active:bg-white/90",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    SIZE_CLASSES[size],
    className,
  ].join(" ");
}

function Arrow() {
  return (
    <ArrowRight
      className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-disabled:translate-x-0 motion-reduce:transition-none"
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { children, className, arrow = false, size, href, ...rest } = props;
    const classes = buttonClasses(size, className);
    // Plain <a> for downloads, external and non-page links; next/link for site pages.
    const usePlainAnchor = rest.download !== undefined || /^(https?:|mailto:|tel:|#)/.test(href);
    const content = (
      <>
        {children}
        {arrow && <Arrow />}
      </>
    );
    return usePlainAnchor ? (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { children, className, arrow = false, size, loading = false, type = "button", ...rest } = props;
  return (
    <button type={type} aria-busy={loading || undefined} className={buttonClasses(size, className)} {...rest}>
      {loading && (
        <Loader2 className="h-5 w-5 shrink-0 animate-spin motion-reduce:animate-none" strokeWidth={1.5} aria-hidden="true" />
      )}
      {children}
      {arrow && !loading && <Arrow />}
    </button>
  );
}
