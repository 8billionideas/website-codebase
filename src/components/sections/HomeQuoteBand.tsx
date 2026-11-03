import QuoteBand from "@/components/shared/QuoteBand";

// The homepage quote band, below the pillar carousel. Set to false to hide the band entirely
// (the carousel section then closes up to the next section's standard spacing).
export const SHOW_HOME_QUOTE = true;

export default function HomeQuoteBand() {
  if (!SHOW_HOME_QUOTE) return null;
  return (
    <QuoteBand
      quote="There’s often a fear in schools that introducing more skills-based learning means taking something away from academic achievement. But developing these capabilities isn’t separate from academic success; it strengthens learning across the entire curriculum. Giving students opportunities to think critically, solve problems, collaborate and apply their knowledge helps them succeed in every subject, while preparing them for life beyond school. That’s why I believe the work 8billionideas is doing is so important."
      name="Tom Meakin"
      role="Principal, North Gate British School"
    />
  );
}
