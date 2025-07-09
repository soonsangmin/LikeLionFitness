import React, { useState } from "react";

const labelCls = "text-lg font-semibold text-center";
const inputCls =
  "w-24 text-center py-2 border rounded-md text-xl focus:outline-none";

const TemperatureConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<number | "">("");

  
  const toF = (c: number) => (c * 9) / 5 + 32;
  const toK = (c: number) => c + 273.15;

  
  const handleCelsius = (v: string) => setCelsius(v === "" ? "" : Number(v));
  const handleFahrenheit = (v: string) => {
    if (v === "") return setCelsius("");
    setCelsius(((Number(v) - 32) * 5) / 9);
  };
  const handleKelvin = (v: string) => {
    if (v === "") return setCelsius("");
    setCelsius(Number(v) - 273.15);
  };

  
  const cVal = celsius === "" ? "" : Math.round(celsius).toString();
  const fVal = celsius === "" ? "" : Math.round(toF(celsius)).toString();
  const kVal = celsius === "" ? "" : Math.round(toK(celsius)).toString();

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold mt-4">Temperature Converter</h1>

      <div className="flex justify-between w-full">
        {/*C*/}
        <div className="flex flex-col items-center gap-3 flex-1">
          <span className={labelCls}>Celsius</span>
          <input
            type="number"
            className={inputCls}
            value={cVal}
            onChange={(e) => handleCelsius(e.target.value)}
          />
        </div>

        <div className="w-4" />

        {/*F*/}
        <div className="flex flex-col items-center gap-3 flex-1">
          <span className={labelCls}>Fahrenheit</span>
          <input
            type="number"
            className={inputCls}
            value={fVal}
            onChange={(e) => handleFahrenheit(e.target.value)}
          />
        </div>

        <div className="w-4" />

        {/*K*/}
        <div className="flex flex-col items-center gap-3 flex-1">
          <span className={labelCls}>Kelvin</span>
          <input
            type="number"
            className={inputCls}
            value={kVal}
            onChange={(e) => handleKelvin(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
