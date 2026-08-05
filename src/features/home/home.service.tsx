import { API_KEY } from "@env";

export async function getWeatherApi(city: string) {
  const apikey = API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=pt_br`;
  const response = await fetch(url);
  return response.json();
}
