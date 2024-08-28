import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { Weather_Data } from "@/utils/Weather_Data";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API;

async function getWeatherData(localityId: string) {
  const data = await fetch(
    `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
    {
      headers: {
        "X-Zomato-Api-Key": API_KEY,
      },
    }
  ).then((res) => res.json());
  return data;
}

export default async function GetWeatherData({
  params,
}: {
  params: { localityId: string };
}) {
  const data = await getWeatherData(params.localityId);
  console.log("data weather ", data);

  const { localityName } = Weather_Data.find(
    (locality) => locality.localityId === params.localityId // or another condition
  );

  const {
    temperature,
    humidity,
    wind_speed,
    wind_direction,
    rain_intensity,
    rain_accumulation,
  } = data.locality_weather_data || {};

  const safeTemperature = temperature ?? "N/A";
  const safeHumidity = humidity ?? "N/A";
  const safeWindSpeed = wind_speed ?? "N/A";
  const safeWindDirection = wind_direction ?? "N/A";
  const safeRainIntensity = rain_intensity ?? "N/A";
  const safeRainAccumulation = rain_accumulation ?? "N/A";

  const determineWeatherCondition = () => {
    const temp = safeTemperature !== "N/A" ? Number(safeTemperature) : null;
    const hum = safeHumidity !== "N/A" ? Number(safeHumidity) : null;
    const windSpeed = safeWindSpeed !== "N/A" ? Number(safeWindSpeed) : null;

    switch (true) {
      case temp !== null &&
        temp > 25 &&
        hum !== null &&
        hum < 50 &&
        windSpeed !== null &&
        windSpeed <= 15:
        return "Sunny";

      case hum !== null &&
        hum > 60 &&
        temp !== null &&
        temp >= 10 &&
        temp <= 30:
        return "Rainy";

      case windSpeed !== null &&
        windSpeed > 20 &&
        temp !== null &&
        temp > 10 &&
        temp <= 25:
        return "Windy";

      case temp !== null &&
        temp < 10 &&
        (windSpeed === null || windSpeed <= 15):
        return "Coldy";

      default:
        return "Cloudy";
    }
  };
  const condition = determineWeatherCondition();

  return (
    <div className="flex flex-col justify-center max-h-screen items-center">
      <SearchBar type="remove" />

      <WeatherCard
        condition={condition}
        temperature={safeTemperature}
        humidity={safeHumidity}
        windSpeed={safeWindSpeed}
        windDirection={safeWindDirection}
        rainIntensity={safeRainIntensity}
        rainAccumulation={safeRainAccumulation}
        localityName={localityName}
      />
    </div>
  );
}
