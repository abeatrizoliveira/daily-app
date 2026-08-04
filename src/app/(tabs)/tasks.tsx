import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Pressable,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import Task from "@features/tasks/task";
import {
  Plus,
  Filter,
  Calendar as CalendarIcon,
  Check,
} from "lucide-react-native";
import { useTheme } from "../../context/themeContext";
import { supabase } from "@utils/supabase";
import GlobalStyle from "@themes/global-style";
import { deleteTask } from "@features/tasks/task.repository";
import Toast from "react-native-toast-message";
import useWeather from "@features/home/home.hooks";

interface Tarefa {
  id_tarefa: number;
  titulo: string;
  data_tarefa: Date | string | null;
  descricao?: string | null;
  created_at?: string; // Garantindo campo de data de criação se disponível
}

// Tipos de ordenação
type SortType = "data_tarefa" | "data_criacao";

export default function Tasks() {
  const [loading, setLoading] = useState(true);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Tarefa[]>([]);

  // Estado para controlar a ordenação (padrão: criação)
  const [sortType, setSortType] = useState<SortType>("data_criacao");

  const { theme } = useTheme();
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);
  const { hour } = useWeather();
  const tasktime =
    hour < 12 ? "seu dia" : hour <= 17 ? "sua tarde" : "sua noite";

  const loadData = useCallback(async () => {
    setLoading(true);
    const { data: userData, error } = await supabase.auth.getUser();

    if (error || !userData.user) {
      setLoading(false);
      return;
    }

    setUserId(userData.user.id);

    const { data: tarefas, error: taskError } = await supabase
      .from("tarefa")
      .select("*")
      .eq("id_usuario", userData.user.id);

    if (!taskError && tarefas) {
      setTasks(tarefas);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Alterna o tipo de ordenação ao clicar no botão do calendário
  const toggleDateSort = () => {
    setSortType((prev) =>
      prev === "data_criacao" ? "data_tarefa" : "data_criacao",
    );

    Toast.show({
      type: "info",
      text1:
        sortType === "data_criacao"
          ? "Ordenado por data da tarefa"
          : "Ordenado por ordem de criação",
      position: "bottom",
      visibilityTime: 1500,
    });
  };

  // Memoiza a lista ordenada para evitar re-computações pesadas na renderização
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortType === "data_tarefa") {
        // Tarefas sem data ficam por último
        if (!a.data_tarefa) return 1;
        if (!b.data_tarefa) return -1;

        const dateA = new Date(a.data_tarefa).getTime();
        const dateB = new Date(b.data_tarefa).getTime();

        return dateA - dateB; // Ordem crescente
      }

      // Padrão: Ordem por id/criação (decrescente - mais recentes no topo)
      return b.id_tarefa - a.id_tarefa;
    });
  }, [tasks, sortType]);

  const handleOpenNewTask = () => {
    setSelectedTaskId(null);
    setOpenTaskModal(true);
  };

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

  return (
    <View style={style.container}>
      {/* Barra de Ações Superior */}
      <View style={style.buttons}>
        <Pressable
          onPress={handleOpenNewTask}
          style={({ pressed }) => [
            global.pressable,
            style.button,
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
              width: 45,
              height: 45,
            },
          ]}
        >
          <Plus color={theme.colors.background} />
        </Pressable>

        <View style={style.minorButtons}>
          {/* Botão de Calendário com Alternância de Ordenação */}
          <Pressable
            onPress={toggleDateSort}
            style={({ pressed }) => [
              style.button,
              {
                // Destaca o botão visualmente quando a ordenação por data está ativa
                opacity: sortType === "data_tarefa" ? 0.8 : 1,
                borderWidth: sortType === "data_tarefa" ? 1.5 : 0,
                borderColor: theme.colors.background,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <CalendarIcon color={theme.colors.background} size={20} />
          </Pressable>
        </View>
      </View>
      {loading ? (
        <View style={style.container}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <>
          {/* Lista de Tasks Ordenada */}
          <FlatList
            style={{ width: "100%" }}
            data={sortedTasks}
            keyExtractor={(item: Tarefa) => item.id_tarefa.toString()}
            renderItem={({ item }: { item: Tarefa }) => (
              <Pressable
                onPress={() => handleOpenExistingTask(item.id_tarefa)}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.98 : 1 }] },
                ]}
              >
                <View style={style.TaskContainer}>
                  <View style={style.text}>
                    <Text style={style.titulo}>{item.titulo || "Sem título"}</Text>
                    <Text style={style.data}>{formatDate(item.data_tarefa)}</Text>
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
                  {" "}
                  Você não tem tarefas pendentes! :)
                </Text>

                <Text style={style.infoTextTask}> Aproveite {tasktime}.</Text>
              </View>
            }
          />

          {/* Modal de Detalhes / Criação */}
          {openTaskModal && (
            <Modal
              animationType="slide"
              transparent
              onRequestClose={() => setOpenTaskModal(false)}
            >
              <Task
                id={selectedTaskId}
                userId={userId}
                onCloseTask={() => setOpenTaskModal(false)}
                onTaskCreated={handleTaskCreated}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            </Modal>
          )}
        </>
      )}
    </View>
  );
}
const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 25,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: 10,
    },
    minorButtons: {
      flexDirection: "row",
      gap: 15,
    },
    button: {
      width: 40,
      height: 40,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary,
    },
    TaskContainer: {
      width: "100%",
      padding: 15,
      backgroundColor: theme.colors.backgroundAlt,
      marginTop: 15,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      gap: 10,
    },
    text: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    tagButton: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    titulo: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "500",
    },
    data: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: "500",
    },
    completeButton: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      borderRadius: 50,
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
    },
    viewInfoTextTask: {
      marginTop: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    infoTextTask: {
      fontSize: 16,
      color: theme.colors.text,
    },
  });
