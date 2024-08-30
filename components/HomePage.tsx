
import SearchBar from "../components/SearchBar";
import Footer from "./Footer";
import Image from "next/image";

export default function HomePage() {


  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-gray-100">
      {/* Google Logo */}
      <div className="mb-[280px] flex flex-col items-center">

      
      <Image
        src="/Images/logo.png" // Replace with the path to your logo
        alt="Google Logo"
        width={400}
        height={200}
        className=" mb-8"
      />

      {/* Search Bar */}
      <SearchBar  />
      </div>
    
    </div>
  );
}
