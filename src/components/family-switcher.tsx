"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const families = [
  { id: "demo-family", name: "Família Demo" },
  { id: "casa-lima", name: "Casa Lima" }
];

function getFamilyIdFromPath(pathname: string): string {
  const match = pathname.match(/\/family\/([^/]+)/);
  return match?.[1] ?? families[0].id;
}

export function FamilySwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const activeFamilyId = getFamilyIdFromPath(pathname);
  const activeFamily = families.find((family) => family.id === activeFamilyId) ?? families[0];

  return (
    <div className="grid gap-1">
      <span className="text-xs text-muted">Família</span>

      <details className="relative">
        <summary className="flex min-w-[220px] cursor-pointer list-none items-center justify-between rounded-xl border border-border bg-surface2 px-3 py-2 text-left">
          <span className="text-2xl font-semibold leading-none">{activeFamily.name}</span>
          <span aria-hidden>⌄</span>
        </summary>

        <Card className="absolute left-0 z-10 mt-2 grid min-w-[240px] gap-1 p-2">
          {families.map((family) => {
            const isActive = family.id === activeFamily.id;

            return (
              <button
                key={family.id}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-surface2"
                onClick={() => router.push(`/family/${family.id}`)}
                type="button"
              >
                <span>{family.name}</span>
                <span className="text-xs text-muted">{isActive ? "Atual" : ""}</span>
              </button>
            );
          })}
        </Card>
      </details>

      <Link className="text-xs text-muted hover:text-white" href={`/family/${activeFamily.id}/settings`}>
        Gerenciar
      </Link>
    </div>
  );
}
