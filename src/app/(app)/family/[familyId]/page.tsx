import Link from "next/link";
import { ActivityList } from "@/components/activity-list";
import { DayNavigator } from "@/components/day-navigator";

export default function FamilyPage({ params }: { params: { familyId: string } }) {
  return (
    <section style={{ display: "grid", gap: 14 }}>
      <div className="card" style={{ display: "grid", gap: 10 }}>
        <h2 style={{ margin: 0 }}>Família: {params.familyId}</h2>
        <DayNavigator />
      </div>

      <ActivityList />

      <Link href={`/family/${params.familyId}/settings`} className="btn btn-ghost" style={{ textAlign: "center" }}>
        Ir para settings
      </Link>

      <button className="fab" aria-label="Adicionar atividade">+</button>
    </section>
  );
}
