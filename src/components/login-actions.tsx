"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginActions() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleMockLogin() {
    setLoading(true);
    await fetch("/api/auth/session", { method: "POST" });
    router.push("/family/demo-family");
    router.refresh();
  }

  return (
    <button className="btn btn-primary" disabled={loading} onClick={handleMockLogin}>
      {loading ? "Entrando..." : "Continuar com Email (mock)"}
    </button>
  );
}
