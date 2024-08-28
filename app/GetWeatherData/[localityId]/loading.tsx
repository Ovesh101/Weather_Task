import Script from 'next/script';


export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Load the ldrs library */}
      <Script 
        type="module" 
        src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/waveform.js" 
        strategy="afterInteractive"
      />
      {/* Loader Element */}
      <l-waveform size="35" stroke="3.5" speed="1" color="black"></l-waveform>
    </div>
  );
}
