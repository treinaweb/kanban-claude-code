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

  return (
    <div className="flex items-center gap-3">
      <span className="hidden sm:block truncate max-w-[180px]" style={{ fontSize: "15px", color: "var(--ink-muted)" }}>
        {email}
      </span>
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
