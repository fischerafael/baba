"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const families = [
  { id: "demo-family", name: "Família Demo" },
  { id: "casa-lima", name: "Casa Lima" }
];

export function FamilySwitcher() {
  const router = useRouter();

  return (
    <div className="grid gap-1">
      <label className="text-xs text-muted" htmlFor="family-select">
        Família
      </label>
      <select
        id="family-select"
        className="rounded-lg border border-border bg-secondary px-2 py-1 text-sm"
        defaultValue={families[0].id}
        onChange={(event) => router.push(`/family/${event.target.value}`)}
      >
        {families.map((family) => (
          <option key={family.id} value={family.id}>
            {family.name}
          </option>
        ))}
      </select>
      <Link className="text-xs text-muted hover:text-white" href="/family/demo-family/settings">
        Gerenciar
      </Link>
    </div>
  );
}
