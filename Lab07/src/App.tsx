import { useState } from "react";
import { SelectBox } from "./components/SelectBox";
import { CountdownTimer } from "./components/CountDownTimer";
import { Clock } from "./components/Clock";

const cars = ["Mercedes S600", "BMW M5", "Audi A8"];
const colors = ["Black", "White", "Red", "Blue"];

export default function App() {
  /* ---------- 1. State “nháp” (draft) dùng cho combobox ---------- */
  const [draftCar, setDraftCar] = useState(cars[0]);
  const [draftColor, setDraftColor] = useState(colors[0]);

  /* ---------- 2. State “chính thức” (confirmed) hiển thị ---------- */
  const [car, setCar] = useState(cars[0]);
  const [color, setColor] = useState(colors[0]);


  /* ---------- 3. Khi ấn nút Confirm → copy draft vào confirmed --- */
  const handleConfirm = () => {
    setCar(draftCar);
    setColor(draftColor);
  };

  return (
    <main className="p-10 font-sans">
      <h1 className="text-5xl font-bold mb-12">Select your car</h1>

      {/* Combobox xe (thao tác trên bản nháp) */}
      <SelectBox
        label="Select a car"
        options={cars}
        value={draftCar}
        onChange={setDraftCar}
      />

      {/* Combobox màu */}
      <SelectBox
        label="Select a color"
        options={colors}
        value={draftColor}
        onChange={setDraftColor}
      />

      {/* Nút xác nhận */}
      <button
        onClick={handleConfirm}
        className="mt-4 bg-blue-600 text-white font-medium px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Confirm
      </button>

      {/* Câu hiển thị lấy từ state đã xác nhận */}
      <h2 className="mt-14 text-2xl font-semibold">
        You selected a {color} – {car}
      </h2>

      <CountdownTimer from={10} />

      <Clock/>

      
    </main>
  );
}
