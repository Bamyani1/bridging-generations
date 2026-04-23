"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "@/components/domain/ActivityCard";
import { type FilterChipOption, FilterChips } from "@/components/ui/FilterChips";
import type { Activity } from "@/lib/content/activities";
import { ACTIVITY_TAG_LABELS, ACTIVITY_TAGS, type ActivityTag } from "@/lib/content/activityTags";

type ActivityFilterProps = {
  activities: Activity[];
};

const ALL = "all" as const;
type Selection = typeof ALL | ActivityTag;

export function ActivityFilter({ activities }: ActivityFilterProps) {
  const [selection, setSelection] = useState<Selection>(ALL);

  const availableTags = useMemo(() => {
    const present = new Set<ActivityTag>();
    for (const a of activities) present.add(a.tag);
    return ACTIVITY_TAGS.filter((t) => present.has(t));
  }, [activities]);

  const filtered = useMemo(() => {
    if (selection === ALL) return activities;
    return activities.filter((a) => a.tag === selection);
  }, [activities, selection]);

  const options: FilterChipOption<Selection>[] = useMemo(
    () => [
      { value: ALL, label: "All", count: activities.length },
      ...availableTags.map((tag) => ({ value: tag, label: ACTIVITY_TAG_LABELS[tag] })),
    ],
    [activities.length, availableTags],
  );

  return (
    <>
      <FilterChips
        options={options}
        value={selection}
        onChange={setSelection}
        ariaLabel="Filter activities by type"
      />
      {filtered.length === 0 ? (
        <p className="text-body text-ink-2">No activities match this filter yet.</p>
      ) : (
        <ul aria-live="polite" className="flex flex-col gap-10 lg:gap-14">
          {filtered.map((activity) => (
            <li key={activity.id}>
              <ActivityCard activity={activity} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
