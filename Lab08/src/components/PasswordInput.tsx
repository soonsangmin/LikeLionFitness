import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export default function PasswordInput({ label, error, register }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
       
        className={
          "w-full rounded-lg border px-4 py-3 outline-none " +
          (error ? "border-red-500" : "border-gray-300")
        }
        {...register}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
      >
        {show ? "Hide" : "Show"}
      </button>

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
