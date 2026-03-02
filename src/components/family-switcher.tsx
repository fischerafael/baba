import Link from "next/link";

const families = [
  { id: "demo-family", name: "Família Demo" },
  { id: "casa-lima", name: "Casa Lima" }
];

export function FamilySwitcher() {
  return (
    <div className="card" style={{ padding: "8px 10px", borderRadius: 12 }}>
      <label style={{ fontSize: 12 }} className="muted">Família</label>
      <select
        defaultValue={families[0].id}
        style={{ background: "transparent", color: "white", border: 0, display: "block", marginTop: 4 }}
        onChange={(event) => {
          window.location.href = `/family/${event.target.value}`;
        }}
      >
        {families.map((family) => (
          <option key={family.id} value={family.id} style={{ color: "black" }}>
            {family.name}
          </option>
        ))}
      </select>
      <div style={{ marginTop: 6 }}>
        <Link className="muted" style={{ fontSize: 12 }} href="/family/demo-family/settings">
          Gerenciar
        </Link>
      </div>
    </div>
  );
}
