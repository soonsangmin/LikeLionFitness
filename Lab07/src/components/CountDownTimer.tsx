import { useEffect, useState } from "react";

type Props = {
  from?: number; // có thể truyền giá trị khác, mặc định 10
};

export const CountdownTimer = ({ from = 10 }: Props) => {
  const [seconds, setSeconds] = useState<number>(from);

  
  useEffect(() => {
    if (seconds === 0) {
      alert("Time's up");
      return;
    }

    const id = setTimeout(() => setSeconds((s) => s - 1), 1_000);
    return () => clearTimeout(id); 
  }, [seconds]);

  const handleReset = () => setSeconds(from);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-semibold mb-2">Count down from {from}</h2>
      <p className="text-4xl font-bold text-blue-600">{seconds}</p>
      <button
        onClick={handleReset}
        className="mt-4 bg-blue-600 text-white font-medium px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Reset
      </button>
    </div>
  );
};
