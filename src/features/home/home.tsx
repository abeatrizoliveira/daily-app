import {
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../context/themeContext";
import useWeather from "@features/home/home.hooks";
import LottieView from "lottie-react-native";
import iconWeather from "@features/home/home.component";
import loadingAnimation from "@assets/animation/clear-day.json";
import { CreateStyle } from "@features/home/home.style";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { deleteTask } from "@features/tasks/task.repository";
import { supabase } from "@utils/supabase";
import { Check } from "lucide-react-native";
import GlobalStyle from "@themes/global-style";

export default function Home() {
  // Definição de variáveis: tema, estilo, informações e ícones.
  const { theme } = useTheme();
  const { desc, temp, weekday, month, day, timeDay, hour } = useWeather();
  const tasktime =
    hour < 12 ? "seu dia" : hour <= 17 ? "sua tarde" : "sua noite";

  const icon = iconWeather(desc);
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);

  const [loading, setLoading] = useState(true);
  const [dataTask, setDataTask] = useState<Tarefa[]>([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Tarefa[]>([]);

  interface Tarefa {
    id_tarefa: number;
    titulo: string;
    data_tarefa: Date | string | null;
  }

  function isSameDay(dateValue: Date | string | null) {
    if (!dateValue) return false;

    const taskDate =
      dateValue instanceof Date ? dateValue : new Date(dateValue);

    if (Number.isNaN(taskDate.getTime())) return false;

    const today = new Date();

    return (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    );
  }

  async function loadData() {
    setLoading(true);

    const { data: userData, error } = await supabase.auth.getUser();

    if (error || !userData.user) {
      setLoading(false);
      return;
    }

    const id = userData.user.id;

    const { data: tarefas, error: taskError } = await supabase
      .from("tarefa")
      .select("*")
      .eq("id_usuario", id);

    if (taskError) {
      console.log(taskError);
      setDataTask([]);
    } else {
      const todayTasks = (tarefas ?? []).filter((task) =>
        isSameDay(task.data_tarefa),
      );

      setDataTask(todayTasks);
      setTasks(todayTasks); // <- adicione esta linha
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenExistingTask = (id: number) => {
    setSelectedTaskId(id);
    setOpenTaskModal(true);
  };

  const handleTaskCreated = (newTask: Tarefa) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskUpdated = (updatedTask: Tarefa) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id_tarefa === updatedTask.id_tarefa ? updatedTask : t,
      ),
    );
  };

  const handleTaskDeleted = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id_tarefa !== id));
  };

  const handleQuickComplete = async (id: number) => {
    handleTaskDeleted(id);
    const { error } = await deleteTask(id);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao concluir tarefa.",
        position: "bottom",
      });
      loadData();
    } else {
      Toast.show({
        type: "success",
        text1: "Tarefa concluída!",
        position: "bottom",
      });
    }
  };

  function formatDate(value: Date | string | null | undefined) {
    if (!value) return "Sem data";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Sem data";

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  }

  if (loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.content}>
        {/* Texto primário da página */}
        <Text style={style.introText}>
          {timeDay}, <Text style={style.introTextUser}>Usuário.</Text>
        </Text>

        {/* Container introdutório: clima, data e info */}
        <View style={style.weatherContainer}>
          <LottieView
            source={icon ?? loadingAnimation}
            autoPlay
            loop
            style={{ width: 125, height: 125 }}
          ></LottieView>
          <View style={style.weatherInfo}>
            <Text style={style.dayText}>
              {weekday}, {day} de {month}.
            </Text>
            <Text style={style.tempText}>Está {temp}°C lá fora.</Text>
            <Text style={style.descText}>{desc}.</Text>
          </View>
        </View>
        <Text style={style.h3}>Suas tarefas de hoje:</Text>
        {loading ? (
          <Text style={style.descText}>Carregando tarefas...</Text>
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={tasks}
            keyExtractor={(item) => item.id_tarefa.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleOpenExistingTask(item.id_tarefa)}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.98 : 1 }] },
                ]}
              >
                <View style={style.TaskContainer}>
                  <View style={style.text}>
                    <Text style={style.titulo}>
                      {item.titulo || "Sem título"}
                    </Text>
                    <Text style={style.data}>
                      {formatDate(item.data_tarefa)}
                    </Text>
                  </View>

                  <View style={style.tagButton}>
                    <Pressable
                      onPress={() => handleQuickComplete(item.id_tarefa)}
                      style={[global.pressable, style.completeButton]}
                    >
                      <Check size={14} color={theme.colors.primary} />
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <View style={style.viewInfoTextTask}>
                <Text style={style.infoTextTask}>
                  Você não tem tarefas pendentes! :)
                </Text>
                <Text style={style.infoTextTask}>Aproveite {tasktime}.</Text>
              </View>
            }
          />
        )}
        
      </View>
    </View>
  );
}
