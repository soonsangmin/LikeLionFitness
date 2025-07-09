import React, { useState } from "react";

const inputCls =
  "w-full px-3 py-2 border-b border-gray-400 focus:outline-none text-right";
const btnCls =
  "w-full py-3 text-white bg-blue-600 rounded-md active:brightness-110";

const SimpleRandom: React.FC = () => {
  /* STATE */
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);
  const [result, setResult] = useState<number | null>(null);

  
  const generate = () => {
    const a = Number(min);
    const b = Number(max);
    if (isNaN(a) || isNaN(b) || a > b) {
      alert("Min phải nhỏ hơn hoặc bằng Max và cả hai phải là số!");
      return;
    }
    // Math.random() * (b - a + 1) + a 
    const rnd = Math.floor(Math.random() * (b - a + 1)) + a;
    setResult(rnd);
  };

  
  return (
    <div className="flex flex-col gap-6 w-72 mx-auto">
      
      <div className="text-6xl font-semibold text-center h-20 flex items-center justify-center">
        {result === null ? "—" : result}
      </div>

      
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <label className="text-sm text-gray-500">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value))}
            className={inputCls}
          />
        </div>
        <div className="flex justify-between items-end">
          <label className="text-sm text-gray-500">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value))}
            className={inputCls}
          />
        </div>
      </div>

      <button className={btnCls} onClick={generate}>
        GENERATE
      </button>
    </div>
  );
};

export default SimpleRandom;
