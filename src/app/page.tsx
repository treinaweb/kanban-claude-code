import Link from "next/link";

const LEVEL_1_SHADOW =
  "0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04)";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
    title: "Quadro visual",
    description: "Visualize todas as suas tarefas organizadas em colunas — A fazer, Em andamento e Concluído.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Tarefas detalhadas",
    description: "Adicione título e descrição em cada tarefa. Edite e exclua quando precisar, sem complicação.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5 9 2 12 5 15" />
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <polyline points="19 9 22 12 19 15" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
    title: "Drag & Drop",
    description: "Mova tarefas entre colunas arrastando e soltando. Reordene dentro da mesma coluna com facilidade.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">

      {/* Hero band — secondary, used once per page */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-24"
        style={{ background: "var(--secondary)" }}
      >
        {/* Badge pill */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{
            background: "var(--canvas)",
            color: "var(--primary)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.125px",
            borderRadius: "9999px",
            padding: "4px 12px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "9999px",
              background: "var(--primary)",
              display: "inline-block",
            }}
          />
          Simples, rápido e gratuito
        </div>

        <h1
          className="max-w-3xl"
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-2.125px",
            color: "#ffffff",
          }}
        >
          Organize suas tarefas com clareza total
        </h1>

        <p
          className="mt-6 max-w-xl"
          style={{ fontSize: "16px", lineHeight: 1.5, color: "rgba(255,255,255,0.75)" }}
        >
          Um quadro Kanban minimalista para você acompanhar o que precisa fazer,
          o que está em andamento e o que já foi concluído — tudo em um só lugar.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/login"
            className="transition-all active:scale-90"
            style={{
              background: "var(--primary)",
              color: "var(--on-primary)",
              fontSize: "16px",
              fontWeight: 500,
              borderRadius: "9999px",
              padding: "12px 28px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Começar agora — é grátis
          </Link>
          <Link
            href="/login"
            className="transition-all active:scale-90"
            style={{
              background: "var(--canvas)",
              color: "var(--ink)",
              fontSize: "16px",
              fontWeight: 500,
              borderRadius: "9999px",
              padding: "12px 28px",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: LEVEL_1_SHADOW,
            }}
          >
            Já tenho uma conta
          </Link>
        </div>

        {/* Board preview */}
        <div
          className="mt-16 w-full max-w-3xl overflow-hidden"
          style={{
            background: "var(--canvas)",
            border: "1px solid var(--hairline)",
            borderRadius: "16px",
            boxShadow: LEVEL_1_SHADOW,
          }}
        >
          <div
            className="flex items-center gap-1.5 px-4 py-3"
            style={{ borderBottom: "1px solid var(--hairline)", background: "var(--canvas-soft)" }}
          >
            <span style={{ width: "10px", height: "10px", borderRadius: "9999px", background: "var(--hairline)" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "9999px", background: "var(--hairline)" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "9999px", background: "var(--hairline)" }} />
          </div>
          <div className="grid grid-cols-3 gap-3 p-4" style={{ background: "var(--canvas-soft)" }}>
            {["A fazer", "Em andamento", "Concluído"].map((col, i) => (
              <div
                key={col}
                className="space-y-2 p-3"
                style={{ background: "var(--canvas)", borderRadius: "12px", border: "1px solid var(--hairline)" }}
              >
                <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.125px" }}>
                  {col}
                </p>
                {Array.from({ length: i === 0 ? 3 : i === 1 ? 2 : 1 }).map((_, j) => (
                  <div
                    key={j}
                    style={{
                      height: "36px",
                      borderRadius: "8px",
                      background: "var(--canvas-soft)",
                      border: "1px solid var(--hairline)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20" style={{ background: "var(--canvas)" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center mb-12"
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.625px",
              color: "var(--ink)",
            }}
          >
            Tudo que você precisa, nada que você não precisa
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 p-6"
                style={{
                  background: "var(--canvas)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    background: "var(--canvas-soft)",
                    color: "var(--primary)",
                    display: "inline-flex",
                    width: "fit-content",
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.125px", color: "var(--ink)" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.5, color: "var(--ink-muted)" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="px-6 py-20 text-center" style={{ background: "var(--canvas-soft)" }}>
        <h2
          className="mb-4"
          style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "-0.625px", color: "var(--ink)" }}
        >
          Pronto para organizar seu dia?
        </h2>
        <p className="mb-8 max-w-sm mx-auto" style={{ fontSize: "16px", color: "var(--ink-muted)" }}>
          Crie sua conta gratuita e comece a usar agora mesmo.
        </p>
        <Link
          href="/login?mode=signup"
          className="inline-block transition-all active:scale-90"
          style={{
            background: "var(--primary)",
            color: "var(--on-primary)",
            fontSize: "16px",
            fontWeight: 500,
            borderRadius: "9999px",
            padding: "12px 32px",
            textDecoration: "none",
          }}
        >
          Criar conta gratuita
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="py-6 text-center"
        style={{
          background: "var(--canvas-soft)",
          borderTop: "1px solid var(--hairline)",
          fontSize: "14px",
          color: "var(--ink-secondary)",
        }}
      >
        © {new Date().getFullYear()} Kanban — Feito com Next.js
      </footer>
    </div>
  );
}
