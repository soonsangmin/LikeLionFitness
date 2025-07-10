import { useState } from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import "./index.css"; 

export default function App() {
  const [page, setPage] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      {page === "login" ? (
        <SignInForm goToSignUp={() => setPage("register")} />
      ) : (
        <SignUpForm goToLogin={() => setPage("login")} />
      )}
    </div>
  );
}
