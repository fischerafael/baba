"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import type { ActivityLog } from "@/types/domain";

interface ActivityListProps {
  familyId: string;
  day: string;
}

interface LogsResponse {
  data: ActivityLog[];
  day: string;
}

export function ActivityList({ familyId, day }: ActivityListProps) {
  const [items, setItems] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      const response = await fetch(`/api/families/${familyId}/logs?day=${day}`);
      const payload = (await response.json()) as LogsResponse;

      if (active) {
        setItems(payload.data);
        setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [familyId, day]);

  return (
    <Card className="space-y-3 p-4">
      <h3 className="text-2xl font-bold">Atividades do dia</h3>

      {loading ? (
        <p className="text-sm text-muted">Carregando atividades...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted">Nenhuma atividade registrada para este dia.</p>
      ) : (
        <ul className="grid gap-2 p-0">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border border-border bg-secondary/40 p-3">
              <strong className="text-xl">{item.titleSnapshot}</strong>
              <div className="text-sm text-muted">{item.createdByRole}</div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
