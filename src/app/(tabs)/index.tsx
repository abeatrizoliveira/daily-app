import Home from "@features/home/home";
import { supabase } from "@utils/supabase";

export default function App() {
  async function loginUsuario() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "eutanasia032.sia@gmail.com",
      password: "123456789",
    });

    if (error) {
      console.error("Erro ao fazer login:", error.message);
      return null;
    }

    console.log("Login bem-sucedido, usuário:", data.user.id);
    return data.user.id;
  }
  loginUsuario();

  return <Home></Home>;
}
