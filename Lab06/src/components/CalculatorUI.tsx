import React, { useState } from "react";

const base =
  "flex-1 flex items-center justify-center text-white text-xl font-medium border border-gray-700 active:brightness-110";
const darkBtn = `${base} bg-gray-600`;
const orangeBtn = `${base} bg-orange-500`;

const keypad: string[][] = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];


const toOp: Record<string, "+" | "-" | "*" | "/" | "%"> = {
  "÷": "/",
  "×": "*",
  "−": "-",
  "+": "+",
  "%": "%", 
};

const CalculatorUI: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirst] = useState<number | null>(null);
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/" | "%" | null>(
    null
  );
  const [waitingSecond, setWaiting] = useState(false);


  const inputDigit = (d: string) => {
    if (waitingSecond) {
      setDisplay(d);
      setWaiting(false);
    } else setDisplay((prev) => (prev === "0" ? d : prev + d));
  };

  
  const inputDecimal = () => {
    if (waitingSecond) {
      setDisplay("0.");
      setWaiting(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  /* ---- choose operator (kể cả %) ---- */
  const chooseOperator = (symbol: string) => {
    const op = toOp[symbol];
    if (operator && !waitingSecond) {
      // có phép cũ, tính gộp
      const result = compute(firstOperand ?? 0, parseFloat(display), operator);
      setDisplay(String(result));
      setFirst(result);
    } else {
      setFirst(parseFloat(display));
    }
    setOperator(op);
    setWaiting(true);
  };

  /* ---- equal ---- */
  const performCalculation = () => {
    if (operator == null || firstOperand == null) return;
    const result = compute(firstOperand, parseFloat(display), operator);
    setDisplay(String(result));
    setFirst(null);
    setOperator(null);
    setWaiting(true);
  };


  const resetAll = () => {
    setDisplay("0");
    setFirst(null);
    setOperator(null);
    setWaiting(false);
  };

  const toggleSign = () => setDisplay(String(-parseFloat(display)));


  const compute = (
    a: number,
    b: number,
    op: "+" | "-" | "*" | "/" | "%"
  ): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? NaN : a / b;
      case "%":
        return b === 0 ? NaN : a % b; 
    }
  };

  const handleClick = (label: string) => {
    if (/^[0-9]$/.test(label)) return inputDigit(label);
    if (label === ".") return inputDecimal();
    if (label === "AC") return resetAll();
    if (label === "+/-") return toggleSign();
    if (label === "=") return performCalculation();
  
    return chooseOperator(label);
  };

  return (
    <div className="flex flex-col w-64 rounded-xl overflow-hidden shadow-2xl mx-auto">
      <div className="bg-gray-800 flex flex-col">
        <div className="flex gap-2 px-3 py-2">
          <span className="w-3 h-3 bg-red-400 rounded-full" />
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="w-3 h-3 bg-green-400 rounded-full" />
        </div>
        <div className="flex justify-end items-end px-3 pb-4">
          <span className="text-5xl text-white select-none truncate">
            {display}
          </span>
        </div>
      </div>

      {keypad.map((row, i) => (
        <div key={i} className="flex">
          {row.map((label, j) => {
            const isOrange = j === row.length - 1;
            return (
              <button
                key={label}
                className={isOrange ? orangeBtn : darkBtn}
                onClick={() => handleClick(label)}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalculatorUI;
