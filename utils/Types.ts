

 export interface Weather_Data_Type {
    localityName:string;
    localityId:string;
    latitude:number;
    longitude:number;
    deviceType:string;

}
 export interface SuggestionListProps {

    handleSuggestionClick: (index: number) => void;
    
    type?:string
   
  }

 export  interface WeatherCardProps {
    condition: string;
    temperature: string;
    humidity: string;
    windSpeed: string;
    windDirection: string;
    rainIntensity: string;
    rainAccumulation: string;
    localityName: string;
  }