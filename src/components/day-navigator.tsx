import Link from "next/link";
import { formatDayLabel, shiftDayKey } from "@/lib/timezone";

interface DayNavigatorProps {
  familyId: string;
  day: string;
}

export function DayNavigator({ familyId, day }: DayNavigatorProps) {
  const previousDay = shiftDayKey(day, -1);
  const nextDay = shiftDayKey(day, 1);

  return (
    <div className="flex items-center justify-between">
      <Link
        aria-label="Dia anterior"
        className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:bg-surface2"
        href={`/family/${familyId}?day=${previousDay}`}
      >
        ←
      </Link>
      <strong className="text-2xl">{formatDayLabel(day)}</strong>
      <Link
        aria-label="Dia seguinte"
        className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:bg-surface2"
        href={`/family/${familyId}?day=${nextDay}`}
      >
        →
      </Link>
    </div>
  );
}
