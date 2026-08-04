export async function getWeatherApi(city:string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=api_key&units=metric&lang=pt_br`;
  const response = await fetch(url);
  return response.json();
}
