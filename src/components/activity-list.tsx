import { Card } from "@/components/ui/card";

const items = [
  { time: "08:00", title: "Check-in", by: "Baba Ana" },
  { time: "09:10", title: "Brincar", by: "Baba Ana" },
  { time: "10:30", title: "Ler", by: "Baba Ana" }
];

export function ActivityList() {
  return (
    <Card className="space-y-3 p-4">
      <h3 className="text-2xl font-bold">Atividades do dia</h3>
      <ul className="grid gap-2 p-0">
        {items.map((item) => (
          <li key={`${item.time}-${item.title}`} className="rounded-xl border border-border bg-secondary/40 p-3">
            <strong className="text-xl">
              {item.time} · {item.title}
            </strong>
            <div className="text-sm text-muted">{item.by}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
