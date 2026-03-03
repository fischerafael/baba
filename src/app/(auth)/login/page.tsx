import Link from "next/link";
import { LoginActions } from "@/components/login-actions";
import { Card } from "@/components/ui/card";

const benefits = [
  "Rotina diária clara para toda família",
  "Checklist rápido para babás",
  "Histórico de atividades por criança"
];

const features = [
  { title: "Agenda inteligente", text: "Visualização diária com status de execução e navegação simples." },
  { title: "Acessos por perfil", text: "Owner, member e babysitter com permissões por papel." },
  { title: "Convites e gestão", text: "Convide membros e mantenha tudo centralizado em uma só tela." }
];

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-screen w-[min(1120px,calc(100vw-2rem))] gap-8 py-8">
      <header className="flex items-center justify-between rounded-2xl border border-border bg-surface/90 p-4">
        <span className="text-lg font-black">Baba App</span>
        <span className="text-sm text-muted">PT-BR / EN</span>
      </header>

      <Card className="grid gap-4 p-8">
        <h1 className="max-w-4xl text-5xl font-black leading-tight">
          Organize a rotina da família com o visual limpo e moderno da OpenAI.
        </h1>
        <p className="max-w-3xl text-muted">
          Landing com hierarquia clara e design system pronto para escalar todo o produto.
        </p>
        <div className="flex flex-wrap gap-2">
          <LoginActions />
          <Link className="inline-flex items-center rounded-xl border border-border px-4 py-2 text-sm hover:bg-surface2" href="#features">
            Ver features
          </Link>
        </div>
      </Card>

      <section className="grid gap-3">
        <h2 className="text-3xl font-bold">Benefícios</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card className="p-4" key={benefit}>
              {benefit}
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-3" id="features">
        <h2 className="text-3xl font-bold">Features</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {features.map((feature) => (
            <Card className="p-4" key={feature.title}>
              <h3 className="m-0 text-xl">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border pt-4 text-sm text-muted">
        © {new Date().getFullYear()} Baba App · Famílias e babás em sincronia
      </footer>
    </main>
  );
}
