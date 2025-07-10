import type { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-14 w-[420px] rounded-2xl bg-white p-10 shadow-lg">
      {children}
    </div>
  );
}
