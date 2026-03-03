"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    <Button className="shadow-glow" disabled={loading} onClick={handleMockLogin}>
      {loading ? "Entrando..." : "Continuar com Email (mock)"}
    </Button>
  );
}
