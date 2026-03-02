export function DayNavigator() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <button className="btn btn-ghost" aria-label="Dia anterior">←</button>
      <strong>Hoje</strong>
      <button className="btn btn-ghost" aria-label="Dia seguinte">→</button>
    </div>
  );
}
