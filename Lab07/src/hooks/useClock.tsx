import { useEffect, useState } from "react";



export const useClock = () => {
  const getNow = () => new Date().toLocaleTimeString("en-US", { hour12: true });

  const [time, setTime] = useState<string>(getNow);

  useEffect(() => {
    const id = setInterval(() => setTime(getNow()), 1000);
    return () => clearInterval(id); 
  }, []);

  return time;
};
