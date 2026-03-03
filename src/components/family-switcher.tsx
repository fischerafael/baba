"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const families = [
  { id: "demo-family", name: "Família Demo" },
  { id: "casa-lima", name: "Casa Lima" }
];

export function FamilySwitcher() {
  const router = useRouter();

  return (
    <div className="card" style={{ padding: "8px 10px", borderRadius: 12 }}>
      <label style={{ fontSize: 12 }} className="muted">Família</label>
      <select
        defaultValue={families[0].id}
        style={{ background: "transparent", color: "white", border: 0, display: "block", marginTop: 4 }}
        onChange={(event) => {
          router.push(`/family/${event.target.value}`);
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
