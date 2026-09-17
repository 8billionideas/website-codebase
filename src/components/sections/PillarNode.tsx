import { Pillar } from "@/content/pillars";

function NodeMarker({ pillar, interactive }: { pillar: Pillar; interactive: boolean }) {
  return (
    <span
      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-paper text-body-lg font-semibold transition-colors duration-200 ${
        interactive
          ? "border-ink/15 text-ink group-hover:border-accent group-hover:text-accent"
          : "border-ink/15 text-muted"
      }`}
    >
      {pillar.name.charAt(0)}
    </span>
  );
}

// Fixed height + bottom-aligned content so the marker below it always
// starts at the same Y regardless of whether the name wraps to one line
// or two, or whether a badge is present — keeping every marker centered
// on the horizontal thread at the same offset.
function NodeTop({ pillar }: { pillar: Pillar }) {
  return (
    <div className="min-w-0 md:flex md:h-14 md:flex-col md:items-center md:justify-end">
      <h3 className="break-words text-caption font-semibold text-ink md:text-center">
        {pillar.name}
      </h3>
      {pillar.badge && (
        <span className="mt-1 inline-block rounded-full bg-ink/10 px-2 py-0.5 text-caption text-muted">
          {pillar.badge}
        </span>
      )}
    </div>
  );
}

export default function PillarNode({
  pillar,
  onOpen,
}: {
  pillar: Pillar;
  onOpen: () => void;
}) {
  if (pillar.interaction === "none") {
    return (
      <div className="flex items-start gap-4 md:flex-col-reverse md:items-center">
        <NodeMarker pillar={pillar} interactive={false} />
        <NodeTop pillar={pillar} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full cursor-pointer items-start gap-4 rounded-lg p-2 text-left transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-accent focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none md:flex-col-reverse md:items-center"
    >
      <NodeMarker pillar={pillar} interactive={true} />
      <NodeTop pillar={pillar} />
    </button>
  );
}
