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
import { useState, useEffect } from "react";
import { Plus, Filter, Calendar } from "lucide-react-native";
import { useTheme } from "../../context/themeContext";
import { supabase } from "@utils/supabase";
import GlobalStyle from "@themes/global-style";

export default function tasks() {
  const [loading, setLoading] = useState(true);
  const [openTask, isOpenTask] = useState(false);
  const [idTask, isIdTask] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [dataTask, setDataTask] = useState<Tarefa[]>([]);

  interface Tarefa {
    id_tarefa: number;
    titulo: string;
    data_tarefa: Date | string | null;
  }

  const { theme } = useTheme();

  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);

  function handleTask() {
    isOpenTask(true);
    isIdTask(null);
  }

  function handleOpenTask(id: number) {
    isOpenTask(true);
    isIdTask(id);
  }

  function handleNewTask(task: Tarefa) {
    setDataTask((prev) => [task, ...prev]);
  }

  function handleDeleteTask(id: number) {
    setDataTask((prev) => prev.filter((task) => task.id_tarefa !== id));
  }

  function closeTask() {
    isOpenTask(false);
  }

  async function loadData() {
    setLoading(true);

    const { data: userData, error } = await supabase.auth.getUser();

    if (error || !userData.user) {
      setLoading(false);
      return;
    }

    const id = userData.user.id;

    setUserId(id);

    const { data: tarefas, error: taskError } = await supabase
      .from("tarefa")
      .select("*")
      .eq("id_usuario", id);

    if (taskError) {
      console.log(taskError);
    } else {
      setDataTask(tarefas ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function formatDate(value: Date | string | null | undefined) {
    if (!value) return "Sem data";

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) return "Sem data";

    const month = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const day = date.getDate().toString().padStart(2, "0");
    return `${day} ${month[date.getMonth()]}`;
  }

  if (loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator
          size="large"
          color={
            theme.colors.background == "#fff"
              ? theme.colors.secundary
              : theme.colors.primary
          }
        />
      </View>
    );
  }
  return (
    <View style={style.container}>
      <View style={style.buttons}>
        <Pressable
          onPress={handleTask}
          style={({ pressed }) => [
            global.pressable,
            style.button,
            {
              backgroundColor: pressed
                ? theme.colors.background == "#fff"
                  ? theme.colors.secundaryAlt
                  : theme.colors.primaryAlt
                : theme.colors.background == "#fff"
                  ? theme.colors.secundary
                  : theme.colors.primary,
              transform: [{ scale: pressed ? 0.95 : 1 }],
              width: 45,
              height: 45,
            },
          ]}
        >
          <Plus color={theme.colors.background} />
        </Pressable>
        <View style={style.minorButtons}>
          <Pressable
            onPress={handleTask}
            style={({ pressed }) => [
              global.pressable,
              style.button,
              {
                backgroundColor: pressed
                  ? theme.colors.background == "#fff"
                    ? theme.colors.secundaryAlt
                    : theme.colors.primaryAlt
                  : theme.colors.background == "#fff"
                    ? theme.colors.secundary
                    : theme.colors.primary,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <Calendar color={theme.colors.background} />
          </Pressable>
          <Pressable
            onPress={handleTask}
            style={({ pressed }) => [
              global.pressable,
              style.button,
              {
                backgroundColor: pressed
                  ? theme.colors.background == "#fff"
                    ? theme.colors.secundaryAlt
                    : theme.colors.primaryAlt
                  : theme.colors.background == "#fff"
                    ? theme.colors.secundary
                    : theme.colors.primary,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <Filter color={theme.colors.background} />
          </Pressable>
        </View>
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={dataTask}
        keyExtractor={(item) => item.id_tarefa.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleOpenTask(item.id_tarefa)}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.95 : 1 }],
                height: "auto"
              },
            ]}
          >
            <View style={style.TaskContainer}>
              <View style={style.text}>
                <Text style={style.titulo}>{item.titulo}</Text>
                <Text style={style.data}>{formatDate(item.data_tarefa)}</Text>
              </View>
              <View style={style.tagButton}>
                <Pressable style={[global.pressable, style.completeButton]} />
              </View>
            </View>
          </Pressable>
        )}
      />
      {openTask && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={closeTask}
        >
          <Task
            id={idTask}
            userId={userId}
            onCloseTask={closeTask}
            onTaskCreated={handleNewTask}
            onTaskDeleted={handleDeleteTask}
          />
        </Modal>
      )}
    </View>
  );
}

const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        theme.colors.background == "#fff"
          ? theme.colors.background
          : theme.colors.background,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      padding: 25,
    },
    taskContainer: {
      width: "80%",
      height: 20,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    minorButtons: {
      flexDirection: "row",
      gap: 15,
    },
    button: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor:
        theme.colors.background == "#fff"
          ? theme.colors.secundary
          : theme.colors.primary,
    },
    TaskContainer: {
      width: "100%",
      height: "auto",
      padding: 15,
      backgroundColor: theme.colors.backgroundAlt,
      marginTop: 30,
      borderRadius: 30,
      borderWidth: 1.5,
      borderColor:
        theme.colors.background == "#fff"
          ? theme.colors.secundary
          : theme.colors.primary,
      boxShadow: [
        {
          offsetX: 0,
          offsetY: 4,
          blurRadius: 10,
          spreadDistance: 0,
          color:
            theme.colors.background == "#fff"
              ? theme.colors.bgSecundary
              : theme.colors.bgPrimary,
          inset: false,
        },
      ],
      gap: 5,
    },
    text: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    tagButton: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-end",
    },
    titulo: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: 500,
    },
    data: {
      color:
        theme.colors.background == "#fff"
          ? theme.colors.secundary
          : theme.colors.primary,
      fontSize: 15,
      fontWeight: 500,
    },
    completeButton: {
      borderWidth: 1.5,
      borderColor:
        theme.colors.background == "#fff"
          ? theme.colors.secundary
          : theme.colors.primary,
      borderRadius: 50,
      width: 24,
      height: 24,
    },
  });
