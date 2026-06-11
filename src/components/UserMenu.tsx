"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Props {
  email: string;
}

export function UserMenu({ email }: Props) {
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const initials = email.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div
        title={email}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "var(--primary)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: 600,
          flexShrink: 0,
          cursor: "default",
          userSelect: "none",
        }}
      >
        {initials}
      </div>
      <button
        onClick={handleSignOut}
        className="transition-colors"
        style={{
          background: "var(--canvas)",
          color: "var(--ink)",
          fontSize: "15px",
          fontWeight: 500,
          border: "1px solid var(--hairline)",
          borderRadius: "8px",
          padding: "4px 14px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--canvas-soft)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--canvas)")}
      >
        Sair
      </button>
    </div>
  );
}
