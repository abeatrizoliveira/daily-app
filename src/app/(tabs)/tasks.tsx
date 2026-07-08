import { StyleSheet, Modal, View, Pressable } from "react-native";
import Task from "@features/tasks/task";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react-native";
import { useTheme } from "../../context/themeContext";
import { supabase } from "@utils/supabase";

export default function tasks() {
  const [openTask, isOpenTask] = useState<boolean>(false);
  const [idTask, isIdTask] = useState<number | null>();
  const [userId, setUserId] = useState<any>();
  const { theme } = useTheme();

  const style = CreateStyle(theme);

  function handleTask() {
    isOpenTask(true);
    // isIdTask(null);
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
  }, [openTask]);

  useEffect(() => {
    async function getTarefa() {
      if (userId) {
        const { data, error } = await supabase
          .from("tarefa")
          .select("*")
          .eq("id_usuario", userId)
        if (error) console.log(error);
        else {
          if (data && data.length > 0) {
            isIdTask(data[0].id_tarefa);
          }
        }
      }
    }
    getTarefa();
  }, [userId]);

  console.log(idTask)

  return (
    <View style={style.container}>
      <Pressable onPress={handleTask}>
        <Plus></Plus>
      </Pressable>
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
    },
    content: {
      padding: 25,
    },
    taskContainer: {
      width: "80%",
      height: 20,
    },
  });
