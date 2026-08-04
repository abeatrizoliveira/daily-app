import { getWeatherApi } from "@features/home/home.service";
import { useState, useEffect } from "react";

function useWeather() {
  const [data, setData] = useState<any>();
  const [city, setCity] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [weekday, setWeekday] = useState<string>(() => {
    const weekdayNames = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sabádo",
    ];
    return weekdayNames[new Date().getDay()];
  });

  const [month, setMonth] = useState<string>(() => {
    const monthNames = [
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
    return monthNames[new Date().getMonth()];
  });
  
  const [hour, setHour] = useState<number>(() => new Date().getHours());
  const [day, setDay] = useState<number>(() => new Date().getDate());
  const [timeDay, setTimeDay] = useState<string>();

  useEffect(() => {
    async function getCurrentLocation() {
      
      //   if (Platform.OS === "android" && !Device.isDevice) {
      //     setErrorMsg(
      //       "Oops, this will not work on Snack in an Android Emulator. Try it on your device!",
      //     );
      //     return;
      //   }
      //   let { status } = await Location.requestForegroundPermissionsAsync();
      //   if (status !== "granted") {
      //     setErrorMsg("Permission to access location was denied");
      //     return;
      //   }
      //   // let coords = await Location.getCurrentPositionAsync({});

      //   let location = await Location.reverseGeocodeAsync({
      //     latitude: 40.741895,
      //     longitude: -73.989308
      //   });

      //   setCity(location[0].city);
      // }

      setCity("Finlândia");
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    async function loadDate() {
      const weekdayNames = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sabádo",
      ];
      const now = new Date();
      setWeekday(weekdayNames[now.getDay()]);
      setHour(now.getHours());
      setDay(now.getDate());

      const monthNames = [
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
      setMonth(monthNames[now.getMonth()]);
    }

    setTimeDay(hour < 12 ? "Bom dia" : hour <= 17 ? "Boa tarde" : "Boa noite");
  }, []);

  useEffect(() => {
    async function loadWeather() {
      if (city === null) return;
      const response = await getWeatherApi(city);
      setData(response);
    }
    loadWeather();
  }, [city]);

  return {
    desc: data?.weather?.[0]?.description,
    temp: Math.round(data?.main?.temp),
    weekday,
    hour,
    month,
    day,
    timeDay,
  };
}
export default useWeather;
