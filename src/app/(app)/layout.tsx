import { FamilySwitcher } from "@/components/family-switcher";
import { UserMenu } from "@/components/ui/user-menu";
import { Card } from "@/components/ui/card";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-[min(1120px,calc(100vw-2rem))] py-4">
      <header className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-surface p-4">
        <FamilySwitcher />
        <UserMenu />
      </header>

      <Card className="grid gap-4 p-4">
        <p className="text-sm text-muted">Área útil</p>
        {children}
      </Card>
    </main>
  );
}
