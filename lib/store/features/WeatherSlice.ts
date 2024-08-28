import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Weather_Data_Type } from '@/utils/Weather_Data';




export interface weatherStateType{
  type?:string
  query: string;
  suggestion: Weather_Data_Type[];
  activeIndex: number;
  error: string;
  loading: boolean;
}
const initialState: weatherStateType = {
  type:"",
  query: '',
  suggestion: [],
  activeIndex: -1,
  error: '',
  loading: false,
}

export const WeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<Weather_Data_Type[]>) => {
      state.suggestion = action.payload;
    },
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetSuggestions: (state) => {
     
      state.suggestion = [];
      state.activeIndex = -1;
    },
  }
})

export const {
  setQuery,
  setSuggestions,
  setActiveIndex,
  setError,
  setLoading,
  resetSuggestions,
} = WeatherSlice.actions;

export default WeatherSlice.reducer;