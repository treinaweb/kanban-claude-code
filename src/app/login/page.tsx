"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Mode = "signin" | "signup";

const LEVEL_2_SHADOW =
  "0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04), 0 23px 52px rgba(0,0,0,.05)";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode: Mode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signUpDone, setSignUpDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/board");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setSignUpDone(true);
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--canvas-soft)" }}>
      <div
        className="w-full max-w-sm p-8"
        style={{
          background: "var(--canvas)",
          borderRadius: "16px",
          boxShadow: LEVEL_2_SHADOW,
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}>
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: "20px", letterSpacing: "-0.125px", color: "var(--ink)" }}>
            Kanban
          </span>
        </div>

        {/* Mode toggle */}
        <div
          className="flex p-1 mb-6"
          style={{ background: "var(--canvas-soft)", borderRadius: "8px" }}
        >
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(null); setSignUpDone(false); }}
              className="flex-1 transition-all"
              style={{
                padding: "6px 0",
                fontSize: "15px",
                fontWeight: 500,
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                background: mode === m ? "var(--canvas)" : "transparent",
                color: mode === m ? "var(--ink)" : "var(--ink-faint)",
                boxShadow: mode === m
                  ? "0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04)"
                  : "none",
              }}
            >
              {m === "signin" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        {signUpDone ? (
          <div
            className="text-center"
            style={{
              fontSize: "15px",
              color: "var(--success)",
              background: "var(--success-bg)",
              border: "1px solid var(--success-border)",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            Conta criada! Verifique seu e-mail para confirmar o cadastro.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                className="block mb-1"
                style={{ fontSize: "15px", fontWeight: 500, color: "var(--ink-muted)" }}
              >
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full outline-none transition-shadow"
                style={{
                  background: "var(--canvas)",
                  color: "var(--ink)",
                  fontSize: "15px",
                  border: "1px solid var(--input-border)",
                  borderRadius: "4px",
                  padding: "6px 8px",
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
            </div>

            <div>
              <label
                className="block mb-1"
                style={{ fontSize: "15px", fontWeight: 500, color: "var(--ink-muted)" }}
              >
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="mínimo 6 caracteres"
                className="w-full outline-none transition-shadow"
                style={{
                  background: "var(--canvas)",
                  color: "var(--ink)",
                  fontSize: "15px",
                  border: "1px solid var(--input-border)",
                  borderRadius: "4px",
                  padding: "6px 8px",
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
            </div>

            {error && (
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--danger)",
                  background: "var(--danger-bg)",
                  border: "1px solid var(--danger-border)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full transition-all active:scale-90"
              style={{
                marginTop: "4px",
                background: loading ? "var(--ink-faint)" : "var(--primary)",
                color: "var(--on-primary)",
                fontSize: "16px",
                fontWeight: 500,
                borderRadius: "9999px",
                border: "none",
                padding: "10px 0",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--primary-active)"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "var(--primary)"; }}
            >
              {loading ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar conta"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
