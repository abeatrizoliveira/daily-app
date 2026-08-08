import { supabase } from "@utils/supabase";

export async function SignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw error;
  }
  return data;
}
