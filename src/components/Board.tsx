"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import type { ColumnId, Task } from "@/types/kanban";
import { COLUMNS } from "@/types/kanban";
import { useKanban } from "@/hooks/useKanban";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";

export function Board() {
  const { hydrated, addTask, updateTask, deleteTask, moveTask, tasksForColumn } = useKanban();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragStart(event: DragStartEvent) {
    const allTasks = COLUMNS.flatMap((c) => tasksForColumn(c.id));
    const task = allTasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const allTasks = COLUMNS.flatMap((c) => tasksForColumn(c.id));
    const activeTask = allTasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overColumn = COLUMNS.find((c) => c.id === over.id);
    const overTask = allTasks.find((t) => t.id === over.id);
    const toColumn = (overColumn?.id ?? overTask?.columnId) as ColumnId | undefined;

    if (!toColumn || toColumn === activeTask.columnId) return;

    const colTasks = tasksForColumn(toColumn);
    const toIndex = overTask ? colTasks.findIndex((t) => t.id === over.id) : colTasks.length;
    moveTask(activeTask.id, toColumn, toIndex === -1 ? colTasks.length : toIndex);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over || active.id === over.id) return;

    const allTasks = COLUMNS.flatMap((c) => tasksForColumn(c.id));
    const activeTask = allTasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overTask = allTasks.find((t) => t.id === over.id);
    if (!overTask || overTask.columnId !== activeTask.columnId) return;

    const colTasks = tasksForColumn(activeTask.columnId);
    const toIndex = colTasks.findIndex((t) => t.id === over.id);
    if (toIndex !== -1) moveTask(activeTask.id, activeTask.columnId, toIndex);
  }

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center h-64" style={{ color: "var(--ink-faint)", fontSize: "15px" }}>
        Carregando...
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={tasksForColumn(col.id)}
            onAdd={(data) => addTask(col.id, data)}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <TaskCard
            task={activeTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
            overlay
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
