"use client";
import { useState } from "react";
import FormAction from "../formAction/formAction";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const InputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

interface LoginState {
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required"),
  })
  .required();

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    status: "",
    message: "",
  });

  const onSubmit: SubmitHandler<LoginState> = async (data) => {
    try {
      setLoading(true);
      const res: SignInResponse | undefined = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        setLoading(false);
        setApiResponse({ message: res.error, status: res.ok });
        return null;
      } else {
        setApiResponse({ message: "", status: res?.ok! });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error("something went wrong: ", error.message);
      }

      return null;
    }
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 px-4 sm:px-8 pb-5">
      <div className="-space-y-px space-y-6 text-black">
        <div className="my-5">
          <label htmlFor="email" className="pb-1">
            Email address
          </label>
          <input className={InputClass} {...register("email")} />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div className="my-5">
          <label htmlFor="password" className="pb-1 ">
            Password
          </label>
          <input type="password" className={InputClass} {...register("password")} />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
      </div>
      <FormAction
        apiResponse={apiResponse}
        text="Login"
        loading={loading}
      />
    </form>
  );
}
