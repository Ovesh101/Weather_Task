"use client";
import { useEffect, useState } from "react";
import { Weather_Data } from "@/utils/Weather_Data";
import { Weather_Data_Type } from "@/utils/Weather_Data";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/Hooks";
import {
  setQuery,
  setSuggestions,
  setActiveIndex,
  setError,
  setLoading,
  resetSuggestions,
  setType,
} from "@/lib/store/features/WeatherSlice";
import { weatherStateType } from "@/lib/store/features/WeatherSlice";

import Image from "next/image";
import SuggestionList from "./SuggestionList";

const SearchBar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { query, type, suggestion, activeIndex, loading } = useAppSelector(
    (state) => state.weather
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeIndex === -1 && query.length > 0) {
      const data = getSuggestion(query);
      if (data && data.length > 0) {
        router.push(`/GetWeatherData/${data[0].localityId}`);
      } else {
        dispatch(setError("Please enter a valid location"));
      }
    } else if (activeIndex >= 0 && activeIndex < suggestion.length) {
      dispatch(setQuery(""));
      router.push(`/GetWeatherData/${suggestion[activeIndex].localityId}`);
      dispatch(resetSuggestions());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
    dispatch(setActiveIndex(-1));
    console.log("Updated input value:", e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestion.length === 0) return;

    let newIndex = activeIndex;
    let actualIndex = activeIndex; // This is the index in the full list
    const maxVisibleSuggestions = 10;

    if (e.key === "ArrowDown") {
      actualIndex = (activeIndex + 1) % suggestion.length;
      newIndex = actualIndex % maxVisibleSuggestions;
    } else if (e.key === "ArrowUp") {
      actualIndex = (activeIndex - 1 + suggestion.length) % suggestion.length;
      newIndex = actualIndex % maxVisibleSuggestions;
    }

    dispatch(setActiveIndex(newIndex));
    // Optionally, update visible suggestions based on actualIndex
  };

  const handleBlur = () => {
    setTimeout(() => {
      dispatch(setType("remove"));
      dispatch(resetSuggestions());
    }, 200);
  };

  const handleFocus = () => {
    dispatch(setType(""));
    if (query.length > 0) getSuggestion(query);
  };

  const handleSuggestionClick = (index: number) => {


    dispatch(setQuery(""));
  

    router.push(`/GetWeatherData/${suggestion[index].localityId}`);
    dispatch(resetSuggestions());
  };

  const getSuggestion = (query: string) => {
    dispatch(setLoading(true)); // Start loading

    const result = Weather_Data.filter((weather) =>
      weather.localityName.toLowerCase().includes(query.toLowerCase())
    ).sort(
      (a, b) =>
        a.localityName.toLowerCase().indexOf(query.toLowerCase()) -
        b.localityName.toLowerCase().indexOf(query.toLowerCase())
    );

    dispatch(setSuggestions(result));
    dispatch(setLoading(false)); // Stop loading
    return result;
  };

  useEffect(() => {
    if (query.length > 0) {
      getSuggestion(query);
    } else {
      // Debugging log
      dispatch(resetSuggestions());
    }
  }, [query]);

  const handleCrossIcon = () => {
    dispatch(setQuery(""));
    dispatch(resetSuggestions());
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="flex justify-center mt-6 relative"
      >
        <div className="relative xl:w-full">
          <Image
            src="/Images/search_icon.png"
            alt="search icon"
            width={20}
            height={20}
            className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            value={query}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="lg:w-[730px] md:w-[600px] sm:w-[500px] w-[340px] h-[55px] pl-[45px] border border-gray-300 rounded-full drop-shadow-xl focus:outline-none"
            placeholder="Search for Locality Names"
            maxLength={70}
          />
          <Image
            src="/Images/cross.png"
            height={16}
            width={16}
            alt="cross icon"
            onClick={handleCrossIcon}
            className="absolute right-10 mr-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          />
          <Image
            src="/Images/mic_logo.png"
            alt="mic icon"
            width={18}
            height={26}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer mr-3`}
          />
        </div>
      </form>

      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <SuggestionList
          type={type}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
    </>
  );
};

export default SearchBar;
