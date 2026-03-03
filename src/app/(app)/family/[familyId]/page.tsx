import Link from "next/link";
import { ActivityList } from "@/components/activity-list";
import { DayNavigator } from "@/components/day-navigator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FamilyPage({ params }: { params: { familyId: string } }) {
  return (
    <section className="grid gap-4">
      <Card className="grid gap-3 p-4">
        <h2 className="m-0 text-5xl font-black">Família: {params.familyId}</h2>
        <DayNavigator />
      </Card>

      <ActivityList />

      <Link className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 font-semibold hover:bg-surface2" href={`/family/${params.familyId}/settings`}>
        Ir para settings
      </Link>

      <Button aria-label="Adicionar atividade" className="fixed bottom-5 right-5 h-14 w-14 rounded-full p-0 text-3xl shadow-glow">
        +
      </Button>
    </section>
  );
}
