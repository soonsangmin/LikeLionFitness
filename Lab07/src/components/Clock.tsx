import { useClock } from "../hooks/useClock";

export const Clock = () => {
  const time = useClock();

  return (
    <div className="mx-auto mt-16 w-max rounded-xl bg-indigo-800 px-16 py-8">
      <p className="text-4xl font-extrabold tracking-wider text-white">
        {time}
      </p>
    </div>
  );
};
