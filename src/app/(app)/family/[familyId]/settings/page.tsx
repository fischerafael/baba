import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <section className="grid gap-3">
      <h2 className="m-0 text-3xl font-bold">Settings da família</h2>
      <Card className="grid gap-1 p-4">
        <h3 className="m-0 text-xl">Crianças</h3>
        <p className="m-0 text-sm text-muted">Adicionar nome e data de nascimento.</p>
      </Card>
      <Card className="grid gap-1 p-4">
        <h3 className="m-0 text-xl">Tipos de atividade</h3>
        <p className="m-0 text-sm text-muted">Brincar, Ler, Check-in, Check-out e outros customizados.</p>
      </Card>
      <Card className="grid gap-1 p-4">
        <h3 className="m-0 text-xl">Membros e convites</h3>
        <p className="m-0 text-sm text-muted">Disponível para owner/member. Babysitter não acessa esta tela.</p>
      </Card>
    </section>
  );
}
