import Link from "next/link";
import { Card } from "@/components/ui/card";

export function UserMenu() {
  return (
    <details className="relative">
      <summary className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface2 px-3 py-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-xs font-bold">AL</span>
        <span className="text-left">
          <span className="block text-sm font-semibold leading-none">Ana Lima</span>
          <span className="text-xs text-muted">ana@baba.app</span>
        </span>
      </summary>
      <Card className="absolute right-0 z-10 mt-2 grid min-w-[220px] gap-1 p-2">
        <Link className="rounded-lg px-3 py-2 text-sm hover:bg-surface2" href="/app">
          Tarefas de hoje
        </Link>
        <Link className="rounded-lg px-3 py-2 text-sm hover:bg-surface2" href="/family/demo-family/settings">
          Settings
        </Link>
        <Link className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface2" href="/login">
          Sair
        </Link>
      </Card>
    </details>
  );
}
