"use client";

import { useEffect, useState } from "react";
import type { ColumnId, Task } from "@/types/kanban";
import { loadTasks, insertTask, updateTask, deleteTask, upsertTasks } from "@/lib/storage";

function genId() {
  return crypto.randomUUID();
}

export function useKanban() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadTasks()
      .then((loaded) => {
        setTasks(loaded);
        setHydrated(true);
      })
      .catch(console.error);
  }, []);

  function addTask(columnId: ColumnId, data: { title: string; description?: string }) {
    const colTasks = tasks.filter((t) => t.columnId === columnId);
    const order = colTasks.length > 0 ? Math.max(...colTasks.map((t) => t.order)) + 1 : 0;
    const task: Task = { id: genId(), columnId, order, ...data };
    setTasks((prev) => [...prev, task]);
    insertTask(task).catch(console.error);
  }

  function updateTaskData(id: string, patch: Partial<Pick<Task, "title" | "description">>) {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, ...patch } : t));
      const task = updated.find((t) => t.id === id);
      if (task) updateTask(task).catch(console.error);
      return updated;
    });
  }

  function deleteTaskById(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    deleteTask(id).catch(console.error);
  }

  function moveTask(id: string, toColumn: ColumnId, toIndex: number) {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task) return prev;

      const others = prev.filter((t) => t.id !== id);
      const colTasks = others
        .filter((t) => t.columnId === toColumn)
        .sort((a, b) => a.order - b.order);

      colTasks.splice(toIndex, 0, { ...task, columnId: toColumn });

      const reordered = colTasks.map((t, i) => ({ ...t, order: i }));
      const untouched = others.filter((t) => t.columnId !== toColumn);
      const next = [...untouched, ...reordered];

      upsertTasks(reordered).catch(console.error);

      return next;
    });
  }

  function tasksForColumn(columnId: ColumnId): Task[] {
    return tasks
      .filter((t) => t.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  }

  return {
    tasks,
    hydrated,
    addTask,
    updateTask: updateTaskData,
    deleteTask: deleteTaskById,
    moveTask,
    tasksForColumn,
  };
}
