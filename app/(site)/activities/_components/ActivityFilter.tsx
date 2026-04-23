"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "@/components/domain/ActivityCard";
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

  return (
    <>
      <fieldset className="flex flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">Filter activities by type</legend>
        <FilterChip
          label={`All (${activities.length})`}
          selected={selection === ALL}
          onSelect={() => setSelection(ALL)}
        />
        {availableTags.map((tag) => (
          <FilterChip
            key={tag}
            label={ACTIVITY_TAG_LABELS[tag]}
            selected={selection === tag}
            onSelect={() => setSelection(tag)}
          />
        ))}
      </fieldset>
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

type FilterChipProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

function FilterChip({ label, selected, onSelect }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`inline-flex items-center gap-1 border border-hairline px-4 py-2 text-body-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        selected ? "bg-accent text-white" : "bg-ground text-ink-2 hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}
