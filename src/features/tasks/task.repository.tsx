import { supabase } from "@utils/supabase";
import { Text } from "react-native";
import { useState } from "react";

export default function Rep() {
    const [value, useValue] = useState<any>();
  async function getData() {
    const { data, error } = await supabase.from("tarefa").select();
    if (error) {
      console.log(error);
      return;
    }else{
        useValue(data);
    }
  }
  return (
    <Text>{value}</Text>
  )
}
