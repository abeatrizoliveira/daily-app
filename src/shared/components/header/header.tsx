import { View, Text, Pressable } from "react-native";
import { CreateStyle } from "./header.style";
import { useTheme } from "../../../context/themeContext";
import { usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, Settings } from "lucide-react-native";
import { router } from "expo-router";

const Header = () => {
  // Definição de variáveis: estilo, caminho, tema...
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const style = CreateStyle(theme);
  const path = usePathname();

  // Nome das telas que aparecerão no header
  const screens = {
    "/": "Home",
    "/tasks": "Tarefas",
    "/pomodoro": "Pomodoro",
    "/configuration": "Voltar",
    "/temas": "Voltar",
    "/usuario": "Voltar",
  };

  // Telas com o botão de voltar
  const showBackButton = ["/configuration", "/temas", "/usuario"].includes(path);

  // Telas com o botão de configuração
  const showConfigButton = ["/tasks", "/", "pomodoro"].includes(path);

  // Função para ir para tela de configuração
  const handleConfig = () => {
    router.navigate("/configuration");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[style.container, { paddingTop: insets.top }]}>
      <View style={style.content}>
        <View style={style.btnText}>
          {/* Botão de voltar */}
          {showBackButton && (
            <Pressable 
            onPress={handleBack}>
              <ChevronLeft color={theme.colors.text} />
            </Pressable>
          )}

          {/* Nome da página/ação */}
          <Text style={style.text}>
            {screens[path as keyof typeof screens]}
          </Text>
        </View>
      </View>

      {/* Botão de configuração */}
      {showConfigButton && (
        <Pressable onPress={handleConfig}>
          <Settings color={theme.colors.text} size={24} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
