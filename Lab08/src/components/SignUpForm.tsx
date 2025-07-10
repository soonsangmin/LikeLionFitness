import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../schemas/AuthSchema";
import type { SignUpValues } from "../types/Form";
import PasswordInput from "./PasswordInput";
import AuthCard from "./Card";

interface Props {
  goToLogin: () => void;
}

export default function SignUpForm({ goToLogin }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpValues) => {
    console.log("REGISTER DATA", data);
  };

  return (
    <AuthCard>
      <h1 className="mb-8 text-center text-3xl font-bold">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <input
            placeholder="Name"
            className={
              "w-full rounded-lg border px-4 py-3 outline-none " +
              (errors.name ? "border-red-500" : "border-gray-300")
            }
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

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

        {/* Phone */}
        <div className="mb-4">
          <input
            placeholder="Phone"
            className={
              "w-full rounded-lg border px-4 py-3 outline-none " +
              (errors.phone ? "border-red-500" : "border-gray-300")
            }
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Password & Confirm */}
        <PasswordInput
          label="Password"
          register={register("password")}
          error={errors.password}
        />
        <PasswordInput
          label="Confirm Password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={goToLogin}
            className="flex-1 rounded-lg border bg-gray-100 py-3 font-medium hover:bg-gray-200"
          >
            Login
          </button>
        </div>
      </form>
    </AuthCard>
  );
}
