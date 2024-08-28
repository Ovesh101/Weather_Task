import React from "react";
import Image from "next/image";
import { WeatherCardProps } from "@/utils/Types";

const weatherImages: Record<string, string> = {
  sunny: "/Images/Sunny.webp",
  rainy: "/Images/Rainy.webp",
  windy: "/Images/Windy.webp",
  cold: "/Images/Coldy.webp",
  cloudy: "/Images/Cloudy.webp",
};

export default function WeatherCard({
  condition,
  temperature,
  humidity,
  windSpeed,
  windDirection,
  rainIntensity,
  rainAccumulation,
  localityName,
}: WeatherCardProps) {
  const backgroundImage =
    weatherImages[condition.toLowerCase()] || weatherImages.cloudy;

  return (
    <div className="w-[400px] sm:w-[600px] md:w-[700px] lg:w-[900px] min-h-[400px] relative rounded-lg overflow-hidden">
      <Image
        className="absolute inset-0 w-full h-full object-cover"
        src={backgroundImage}
        width={500}
        height={500}
        alt={condition}
      />
      <div className="relative flex items-center h-64 p-4 text-white">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold">{condition}</h1>
          <p className="text-2xl">{temperature}°C</p>
          <h2 className="text-xl font-medium">{localityName}</h2>
        </div>
      </div>
      <div className="relative p-6 bg-transparent text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: "💧", label: "Humidity", value: `${humidity}%` },
            { icon: "💨", label: "Wind Speed", value: `${windSpeed} km/h` },
            { icon: "🧭", label: "Wind Direction", value: `${windDirection}°` },
            {
              icon: "🌧️",
              label: "Rain Intensity",
              value: `${rainIntensity} mm/h`,
            },
            {
              icon: "🌊",
              label: "Rain Accumulation",
              value: `${rainAccumulation} mm`,
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2">{item.icon}</span>
              <p className="text-lg">
                <strong>{item.label}:</strong> {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
