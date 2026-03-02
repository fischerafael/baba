import { FamilySwitcher } from "@/components/family-switcher";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container" style={{ paddingBottom: 80 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <FamilySwitcher />
        <span className="muted" style={{ fontSize: 13 }}>PT-BR / EN</span>
      </header>
      {children}
    </main>
  );
}
