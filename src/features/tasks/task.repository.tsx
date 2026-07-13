import { supabase } from "@utils/supabase";

export async function getTask(id: number) {
  return await supabase
    .from("tarefa")
    .select("titulo,descricao, data_tarefa")
    .eq("id_tarefa", id)
    .single();
}

export async function saveTask(
  title: string,
  desc: string | null,
  date: Date | null,
  userId: string,
) {
  return await supabase
    .from("tarefa")
    .insert({
      titulo: title,
      descricao: desc,
      data_tarefa: date,
      id_usuario: userId,
    })
    .select()
    .single();
}

export async function deleteTask(id: number) {
  return await supabase
    .from("tarefa")
    .delete()
    .eq("id_tarefa", id);
}