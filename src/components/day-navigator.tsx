import { Button } from "@/components/ui/button";

export function DayNavigator() {
  return (
    <div className="flex items-center justify-between">
      <Button aria-label="Dia anterior" variant="outline">
        ←
      </Button>
      <strong className="text-2xl">Hoje</strong>
      <Button aria-label="Dia seguinte" variant="outline">
        →
      </Button>
    </div>
  );
}
