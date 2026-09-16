import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[75rem] px-6 md:px-12 ${className ?? ""}`}>
      {children}
    </div>
  );
}
