"use client";

import { useEffect, useRef, useState } from "react";
import type { Task } from "@/types/kanban";

interface Props {
  task?: Task;
  onSave: (data: { title: string; description?: string }) => void;
  onClose: () => void;
}

const LEVEL_2_SHADOW =
  "0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04), 0 23px 52px rgba(0,0,0,.05)";

const LEVEL_1_SHADOW =
  "0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04)";

export function TaskModal({ task, onSave, onClose }: Props) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave({ title: trimmed, description: description.trim() || undefined });
    onClose();
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
      onClick={handleBackdrop}
    >
      <div
        className="w-full max-w-md"
        style={{
          background: "var(--canvas)",
          borderRadius: "16px",
          boxShadow: LEVEL_2_SHADOW,
          padding: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.25px",
            color: "var(--ink)",
            marginBottom: "20px",
          }}
        >
          {task ? "Editar tarefa" : "Nova tarefa"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="block mb-1"
              style={{ fontSize: "15px", fontWeight: 500, color: "var(--ink-muted)" }}
            >
              Título <span style={{ color: "var(--danger)" }}>*</span>
            </label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Implementar login"
              className="w-full outline-none"
              style={{
                background: "var(--canvas)",
                color: "var(--ink)",
                fontSize: "15px",
                border: "1px solid var(--input-border)",
                borderRadius: "4px",
                padding: "6px 8px",
                boxShadow: titleFocused ? LEVEL_1_SHADOW : undefined,
                transition: "box-shadow 0.15s",
              }}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
            />
          </div>

          <div>
            <label
              className="block mb-1"
              style={{ fontSize: "15px", fontWeight: 500, color: "var(--ink-muted)" }}
            >
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes opcionais..."
              rows={3}
              className="w-full outline-none resize-none"
              style={{
                background: "var(--canvas)",
                color: "var(--ink)",
                fontSize: "15px",
                border: "1px solid var(--input-border)",
                borderRadius: "4px",
                padding: "6px 8px",
                boxShadow: descFocused ? LEVEL_1_SHADOW : undefined,
                transition: "box-shadow 0.15s",
              }}
              onFocus={() => setDescFocused(true)}
              onBlur={() => setDescFocused(false)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="transition-colors"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--ink-muted)",
                background: "transparent",
                border: "none",
                borderRadius: "8px",
                padding: "6px 14px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--canvas-soft)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="transition-all active:scale-90"
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--on-primary)",
                background: title.trim() ? "var(--primary)" : "var(--ink-faint)",
                border: "none",
                borderRadius: "9999px",
                padding: "6px 20px",
                cursor: title.trim() ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => { if (title.trim()) e.currentTarget.style.background = "var(--primary-active)"; }}
              onMouseLeave={(e) => { if (title.trim()) e.currentTarget.style.background = "var(--primary)"; }}
            >
              {task ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
