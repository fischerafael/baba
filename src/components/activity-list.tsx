const items = [
  { time: "08:00", title: "Check-in", by: "Baba Ana" },
  { time: "09:10", title: "Brincar", by: "Baba Ana" },
  { time: "10:30", title: "Ler", by: "Baba Ana" }
];

export function ActivityList() {
  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Atividades do dia</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {items.map((item) => (
          <li key={`${item.time}-${item.title}`} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 10 }}>
            <strong>{item.time} · {item.title}</strong>
            <div className="muted" style={{ fontSize: 13 }}>{item.by}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
