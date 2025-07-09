import React, { useState, useRef, useEffect } from "react";


const btn = "flex-1 px-6 py-3 rounded-md font-semibold text-center";
const startBtn = `${btn} bg-blue-600 text-white active:brightness-110`;
const resetBtn = `${btn} bg-white text-blue-600 border border-blue-600`;


interface Props {
  initialMinutes?: number; 
}

const CountdownTimer: React.FC<Props> = ({ initialMinutes = 5 }) => {
  
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  /* 2. ref giữ id interval để clear() dễ dàng, không gây re-render */
  const intervalRef = useRef<number | null>(null);

  /* 3. Hàm tick() – GIẢM 1 giây và xử lý khi về 0  */
  const tick = () => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clear(); // tự dừng khi hết giờ
        alert("Hết giờ!");
        return 0;
      }
      return prev - 1;
    });
  };

  /* 4. Khởi tạo interval */
  const start = () => {
    if (isRunning) return; // tránh chạy chồng
    setIsRunning(true);

    /* tạo interval gọi tick() mỗi 1000 ms */
    intervalRef.current = window.setInterval(tick, 1_000);
  };

  /* 5. Dừng và đưa về trạng thái ban đầu */
  const reset = () => {
    clear();
    setSecondsLeft(initialMinutes * 60);
  };

  /* 6. Hàm clear() dùng chung */
  const clear = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  /* 7. Cleanup khi component unmount */
  useEffect(() => {
    return () => clear();
  }, []);

  /* 8. Formatting phút & giây  */
  const mins = Math.floor(secondsLeft / 60);
  const secs = (secondsLeft % 60).toString().padStart(2, "0");

  /* 9. RENDER */
  return (
    <div className="flex flex-col items-center gap-8 w-64 mx-auto">
      {/* dòng thời gian */}
      <div className="text-6xl font-light flex items-end">
        <span className="text-7xl">{mins}</span>
        <span className="text-2xl pl-1">m</span>
        <span className="w-4" />
        <span className="text-7xl">{secs}</span>
        <span className="text-2xl pl-1">s</span>
      </div>

      {/* nút điều khiển */}
      <div className="flex w-full gap-4">
        <button className={startBtn} onClick={start} disabled={isRunning}>
          START
        </button>
        <button className={resetBtn} onClick={reset}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
