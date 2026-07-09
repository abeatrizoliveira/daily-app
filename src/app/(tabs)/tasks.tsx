import {
  StyleSheet,
  Modal,
  View,
  Pressable,
  FlatList,
  Text,
} from "react-native";
import Task from "@features/tasks/task";
import { useState, useEffect } from "react";
import { Plus, Filter, Calendar } from "lucide-react-native";
import { useTheme } from "../../context/themeContext";
import { supabase } from "@utils/supabase";
import GlobalStyle from "@themes/global-style";

export default function tasks() {
  const [openTask, isOpenTask] = useState<boolean>(false);
  const [idTask, isIdTask] = useState<number | null>();
  const [userId, setUserId] = useState<any>();

  interface Tarefa {
    id_tarefa: number;
    titulo: string;
    data_tarefa: Date;
  }

  const [dataTask, setDataTask] = useState<Tarefa[]>();
  const { theme } = useTheme();

  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);

  function handleTask() {
    isOpenTask(true);
    isIdTask(null);
  }
  function closeTask() {
    isOpenTask(false);
  }

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.log(error);
      else {
        setUserId(data.user.id);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getTarefa() {
      if (userId) {
        const { data, error } = await supabase
          .from("tarefa")
          .select("*")
          .eq("id_usuario", userId);
        if (error) console.log(error);
        else {
          if (data && data.length > 0) {
            isIdTask(data[0].id_tarefa);
            setDataTask(data);
          }
        }
      }
    }
    getTarefa();
  }, [userId]);

  console.log(idTask);

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
          <View style={style.TaskContainer}>
            <Text>{item.titulo}</Text>
            <Text>{item.data_tarefa}</Text>
          </View>
        )}
      />
      {openTask && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={closeTask}
        >
          <Task id={idTask} userId={userId} onCloseTask={closeTask} />
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
      borderWidth: 2,
      borderColor:
        theme.colors.background == "#fff"
          ? theme.colors.secundary
          : theme.colors.primary,
    },
  });
