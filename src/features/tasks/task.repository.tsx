import { supabase } from "@utils/supabase";

export interface TaskData {
  id_tarefa?: number;
  titulo: string;
  descricao: string | null;
  data_tarefa: Date | string | null;
}

export async function getTask(id: number) {
  return await supabase
    .from("tarefa")
    .select("id_tarefa, titulo, descricao, data_tarefa")
    .eq("id_tarefa", id)
    .single();
}

export async function saveTask(task: TaskData, userId: string) {
  const payload = {
    titulo: task.titulo,
    descricao: task.descricao,
    data_tarefa: task.data_tarefa
      ? new Date(task.data_tarefa).toISOString()
      : null,
    id_usuario: userId,
  };

  return await supabase.from("tarefa").insert(payload).select().single();
}

export async function updateTask(id: number, task: Partial<TaskData>) {
  const payload: Record<string, any> = {};

  if (task.titulo !== undefined) payload.titulo = task.titulo;
  if (task.descricao !== undefined) payload.descricao = task.descricao;
  if (task.data_tarefa !== undefined) {
    payload.data_tarefa = task.data_tarefa
      ? new Date(task.data_tarefa).toISOString()
      : null;
  }

  return await supabase
    .from("tarefa")
    .update(payload)
    .eq("id_tarefa", id)
    .select()
    .single();
}

export async function deleteTask(id: number) {
  return await supabase.from("tarefa").delete().eq("id_tarefa", id);
}