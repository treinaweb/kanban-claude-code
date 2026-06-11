export type ColumnId = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: ColumnId;
  order: number;
}

export interface Column {
  id: ColumnId;
  title: string;
}

export const COLUMNS: Column[] = [
  { id: "todo", title: "A Fazer" },
  { id: "doing", title: "Em Progresso" },
  { id: "done", title: "Concluído" },
];
