import React, { useState } from "react";
import CalculatorUI from "./components/CalculatorUI";
import CountdownTimer from "./components/CountdownTimer";
import NumberRandom from "./components/NumberRandom";
import TemperatureConverter from "./components/TemperatureConverter";
import TodoList from "./components/ToDoList";


const tabBase =
  "px-4 py-2 rounded-md border transition-colors active:brightness-110";
const activeTab = `${tabBase} bg-blue-600 text-white border-blue-600`;
const inactiveTab = `${tabBase} bg-white text-blue-600 border-blue-600`;


type FeatureKey = "calc" | "timer" | "random" | "temp" | "todo";

interface Feature {
  key: FeatureKey;
  label: string;
  component: React.FC;
}

const features: Feature[] = [
  { key: "calc", label: "Calculator", component: CalculatorUI },
  {
    key: "timer",
    label: "Timer",
    component: () => <CountdownTimer initialMinutes={5} />,
  },
  { key: "random", label: "Random", component: NumberRandom },
  { key: 'temp',  label: 'Temp Conv',  component: TemperatureConverter },
  { key: "todo", label: "Todo List", component: TodoList },
  
];

const App: React.FC = () => {
  const [active, setActive] = useState<FeatureKey>("calc");
  const ActiveComp = features.find((f) => f.key === active)!.component;

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 bg-slate-100">
      
      <div className="flex gap-4 mb-10">
        {features.map((f) => (
          <button
            key={f.key}
            className={active === f.key ? activeTab : inactiveTab}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ActiveComp />


    </div>
  );
};

export default App;
