"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { Task } from "@/types/kanban";
import { TaskModal } from "./TaskModal";

interface Props {
  task: Task;
  onUpdate: (id: string, data: { title: string; description?: string }) => void;
  onDelete: (id: string) => void;
  overlay?: boolean;
}

const LEVEL_1_SHADOW =
  "0 0.175px 1.041px rgba(0,0,0,.01), 0 0.8px 2.925px rgba(0,0,0,.02), 0 2.025px 7.847px rgba(0,0,0,.027), 0 4px 18px rgba(0,0,0,.04)";

export function TaskCard({ task, onUpdate, onDelete, overlay }: Props) {
  const [editing, setEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={
          overlay
            ? {
                background: "var(--canvas)",
                border: "1px solid var(--hairline)",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: LEVEL_1_SHADOW,
                transform: "rotate(1.5deg) scale(1.03)",
                cursor: "grabbing",
                position: "relative",
              }
            : {
                ...style,
                background: "var(--canvas)",
                border: "1px solid var(--hairline)",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: hovered ? LEVEL_1_SHADOW : undefined,
                cursor: "grab",
                position: "relative",
                transition: "box-shadow 0.15s",
              }
        }
        {...attributes}
        {...listeners}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p
          className="break-words"
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--ink)",
            paddingRight: overlay ? 0 : "52px",
          }}
        >
          {task.title}
        </p>
        {task.description && (
          <p
            className="mt-1 line-clamp-2"
            style={{ fontSize: "14px", color: "var(--ink-muted)" }}
          >
            {task.description}
          </p>
        )}

        {!overlay && (
          <div
            className="absolute top-2 right-2 flex gap-1"
            style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.15s" }}
          >
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); setEditing(true); }}
              aria-label="Editar"
              className="flex items-center justify-center transition-colors"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "9999px",
                background: "var(--overlay-soft)",
                border: "none",
                cursor: "pointer",
                color: "var(--ink-muted)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--badge-doing-bg)"; e.currentTarget.style.color = "var(--badge-doing-fg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--overlay-soft)"; e.currentTarget.style.color = "var(--ink-muted)"; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
              </svg>
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
              aria-label="Excluir"
              className="flex items-center justify-center transition-colors"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "9999px",
                background: "var(--overlay-soft)",
                border: "none",
                cursor: "pointer",
                color: "var(--ink-muted)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--danger-bg)"; e.currentTarget.style.color = "var(--danger)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--overlay-soft)"; e.currentTarget.style.color = "var(--ink-muted)"; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M8 6V4h8v2" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {editing && (
        <TaskModal
          task={task}
          onSave={(data) => onUpdate(task.id, data)}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
