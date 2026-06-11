import type { Task } from "@/types/kanban";
import { supabase } from "@/lib/supabase";

interface TaskRow {
  id: string;
  title: string;
  description: string | null;
  column_id: string;
  order: number;
}

const SEED: Omit<TaskRow, "id">[] = [
  { title: "Criar wireframes", description: "Esboçar o layout das telas principais.", column_id: "todo", order: 0 },
  { title: "Configurar repositório", description: null, column_id: "todo", order: 1 },
  { title: "Implementar autenticação", description: "OAuth com Google.", column_id: "doing", order: 0 },
  { title: "Setup do projeto", description: "Next.js + Tailwind + TypeScript.", column_id: "done", order: 0 },
];

function toTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    columnId: row.column_id as Task["columnId"],
    order: row.order,
  };
}

function toRow(task: Task): TaskRow {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? null,
    column_id: task.columnId,
    order: task.order,
  };
}

export async function loadTasks(): Promise<Task[]> {
  // Ensure JWT is loaded in client before making DB requests
  await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("order");

  if (error) throw error;

  if (data.length === 0) {
    const { data: seeded, error: seedError } = await supabase
      .from("tasks")
      .insert(SEED)
      .select();
    if (seedError) throw seedError;
    return (seeded as TaskRow[]).map(toTask);
  }

  return (data as TaskRow[]).map(toTask);
}

export async function insertTask(task: Task): Promise<void> {
  const { error } = await supabase.from("tasks").insert(toRow(task));
  if (error) throw error;
}

export async function updateTask(task: Task): Promise<void> {
  const { error } = await supabase
    .from("tasks")
    .update({ title: task.title, description: task.description ?? null })
    .eq("id", task.id);
  if (error) throw error;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertTasks(tasks: Task[]): Promise<void> {
  const { error } = await supabase.from("tasks").upsert(tasks.map(toRow));
  if (error) throw error;
}
