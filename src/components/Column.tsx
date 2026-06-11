"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import type { Column as ColumnType, Task } from "@/types/kanban";
import { TaskCard } from "./TaskCard";
import { TaskModal } from "./TaskModal";

interface Props {
  column: ColumnType;
  tasks: Task[];
  onAdd: (data: { title: string; description?: string }) => void;
  onUpdate: (id: string, data: { title: string; description?: string }) => void;
  onDelete: (id: string) => void;
}

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  todo:  { bg: "var(--badge-todo-bg)", color: "var(--badge-todo-fg)" },
  doing: { bg: "var(--badge-doing-bg)", color: "var(--badge-doing-fg)" },
  done:  { bg: "var(--badge-done-bg)", color: "var(--badge-done-fg)" },
};

export function Column({ column, tasks, onAdd, onUpdate, onDelete }: Props) {
  const [adding, setAdding] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const badge = BADGE_COLORS[column.id] ?? BADGE_COLORS.todo;

  return (
    <>
      <div
        style={{
          background: "var(--canvas)",
          border: isOver ? "1px solid var(--primary)" : "1px solid var(--hairline)",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          boxShadow: isOver ? "0 0 0 3px rgba(0,117,222,0.15)" : undefined,
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      >
        {/* Column header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "0",
            }}
          >
            {column.title}
          </h2>
          <span
            style={{
              background: badge.bg,
              color: badge.color,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.125px",
              borderRadius: "9999px",
              padding: "2px 8px",
            }}
          >
            {tasks.length}
          </span>
        </div>

        {/* Tasks */}
        <div
          ref={setNodeRef}
          className="flex flex-col gap-2 px-3 pb-3"
          style={{ flex: 1, minHeight: "120px" }}
        >
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </SortableContext>
        </div>

        {/* Add button */}
        <div className="px-3 pb-3">
          <button
            onClick={() => setAdding(true)}
            className="w-full flex items-center gap-1.5 transition-colors"
            style={{
              fontSize: "15px",
              color: "var(--ink-faint)",
              background: "transparent",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
              justifyContent: "flex-start",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--primary)";
              e.currentTarget.style.background = "var(--canvas-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--ink-faint)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Adicionar tarefa
          </button>
        </div>
      </div>

      {adding && (
        <TaskModal onSave={onAdd} onClose={() => setAdding(false)} />
      )}
    </>
  );
}
