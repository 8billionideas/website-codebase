// "For teachers" / "For students" boxes for the navy platform bands (see PlatformBand):
// white-outlined boxes, side by side from md, stacked below. Shared so the bands always match.
export interface AudienceBox {
  title: string;
  text: string;
}

export default function AudienceBoxes({ items, className = "" }: { items: AudienceBox[]; className?: string }) {
  return (
    <ul className={`grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <li key={item.title} className="rounded-[10px] border border-white/40 p-6">
          <h3 className="text-[18px] font-medium leading-[1.35] text-white">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-[1.6] text-white/80">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
