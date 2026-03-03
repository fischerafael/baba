export default function SettingsPage() {
  return (
    <section style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Settings da família</h2>
      <article className="card">
        <h3 style={{ marginTop: 0 }}>Crianças</h3>
        <p className="muted">Adicionar nome e data de nascimento.</p>
      </article>
      <article className="card">
        <h3 style={{ marginTop: 0 }}>Tipos de atividade</h3>
        <p className="muted">Brincar, Ler, Check-in, Check-out e outros customizados.</p>
      </article>
      <article className="card">
        <h3 style={{ marginTop: 0 }}>Membros e convites</h3>
        <p className="muted">Disponível para owner/member. Babysitter não acessa esta tela.</p>
      </article>
    </section>
  );
}
