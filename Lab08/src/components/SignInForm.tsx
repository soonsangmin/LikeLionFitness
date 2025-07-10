import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../schemas/AuthSchema";
import type { SignInValues } from "../types/Form";
import PasswordInput from "./PasswordInput";
import AuthCard from "./Card";

interface Props {
  goToSignUp: () => void;
}

export default function SignInForm({ goToSignUp }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: SignInValues) => {
    console.log("LOGIN DATA", data);
  };

  return (
    <AuthCard>
      <h1 className="mb-8 text-center text-3xl font-bold">Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4">
          <input
            placeholder="Email"
            className={
              "w-full rounded-lg border px-4 py-3 outline-none " +
              (errors.email ? "border-red-500" : "border-gray-300")
            }
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <PasswordInput
          label="Password"
          register={register("password")}
          error={errors.password}
        />

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
          <button
            type="button"
            onClick={goToSignUp}
            className="flex-1 rounded-lg border bg-gray-100 py-3 font-medium hover:bg-gray-200"
          >
            Sign Up
          </button>
        </div>
      </form>
    </AuthCard>
  );
}
