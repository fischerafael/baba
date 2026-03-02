import { LoginActions } from "@/components/login-actions";

export default function LoginPage() {
  return (
    <main className="container" style={{ display: "grid", placeItems: "center" }}>
      <section className="card" style={{ width: "100%", maxWidth: 420 }}>
        <h1 style={{ marginTop: 0 }}>Baba App</h1>
        <p className="muted">Login com Firebase SSO (email) será conectado na próxima etapa.</p>
        <div style={{ display: "grid", gap: 10 }}>
          <LoginActions />
          
        </div>
      </section>
    </main>
  );
}
