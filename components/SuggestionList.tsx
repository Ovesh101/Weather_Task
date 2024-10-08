"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/Hooks";
import { SuggestionListProps } from "@/utils/Types";
import { setActiveIndex } from "@/lib/store/features/WeatherSlice";

const SuggestionList = ({ handleSuggestionClick }: SuggestionListProps) => {
  const dispatch = useAppDispatch();
  const { type, query, suggestion, activeIndex } = useAppSelector(
    (state) => state.weather
  );

  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const highlightText = (text: string, query: string) =>
    text.split(new RegExp(`(${query})`, "gi")).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-blue-200">
          {part}
        </span>
      ) : (
        part
      )
    );

  useEffect(() => {
    if (activeIndex >= 0) {
      suggestionRefs.current[activeIndex]?.scrollIntoView({
        behavior: "instant",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const handleItemClick = (index: number) => {
    handleSuggestionClick(index);
    dispatch(setActiveIndex(index));
  };

  return (
    <div className="relative mt-2 lg:w-[730px] md:w-[600px] sm:w-[500px] w-[340px]">
      <ul
        className={`absolute top-full left-0 right-0 max-h-[320px] overflow-y-auto bg-white  border-gray-300 rounded-lg shadow-lg z-10 ${
          type ? "hidden" : "block"
        }`}
      >
        {suggestion.length ? (
          suggestion.slice(0, 10).map((weather, index) => (
            <li
              key={weather.localityId}
              ref={(el) => {(suggestionRefs.current[index] = el)}}
              className={`p-4 cursor-pointer transition-colors duration-300 ${
                index === activeIndex
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleItemClick(index)}
            >
              <p className="text-lg">{highlightText(weather.localityName, query)}</p>
            </li>
          ))
        ) : (
          !type && query && (
            <li className="p-4 text-gray-500">No suggestions found.</li>
          )
        )}
      </ul>
    </div>
  );
};

export default SuggestionList;
