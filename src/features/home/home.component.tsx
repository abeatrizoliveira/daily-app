import loadDate from "@features/home/home.hooks";

export default function iconWeather(desc:string) {
  const { hour } = loadDate();
  const icons = {
    "céu limpo":
      hour <= 17
        ? require("@assets/animation/clear-day.json")
        : require("@assets/animation/clear-night.json"),
    nublado: require("@assets/animation/overcast.json"),
    "nuvens dispersas": require("@assets/animation/overcast.json"),
    "algumas nuvens": require("@assets/animation/cloudy.json"),
    "chuva leve": require("@assets/animation/drizzle.json"),
    "chuva moderada": require("@assets/animation/rain.json"),
    "chuva forte": require("@assets/animation/thunderstorms.json"),
    neve: require("@assets/animation/snow.json"),
    névoa: require("@assets/animation/mist.json"),
  };
  return icons[desc as keyof typeof icons];
}
