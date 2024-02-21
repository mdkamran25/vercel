"use client";
import React, { useState } from "react";
import FormAction from "../formAction/formAction";
import { signup } from "@/constants/apiUrl";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const InputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

interface SignupState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Name is required")
      .max(30, "Not more than 30 letters")
      .min(4, "Not less than 4 letters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .max(30, "Not more than 30 letters")
      .min(4, "Not less than 4 letters"),
    password: yup
      .string()
      .required("Password is required")
      .max(10, "Not more than 10 letters")
      .min(4, "Not less than 4 letters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    status: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupState>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupState> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok) {
        setApiResponse(resData);
        router.push("/login");
        setLoading(false);
      } else {
        setApiResponse(resData);
        setLoading(false);
        throw new Error("Failed to create account");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoading(false);
        console.error("Error creating account:", error?.message);
      }
    }
  };

  return (
    <form className="mt-8 px-4 sm:px-8 pb-5" onSubmit={handleSubmit(onSubmit)}>
      <div className=" space-y-6 text-black">
      <div className="my-5">
          <label htmlFor="name" className="pb-1">
            Name
          </label>
          <input className={InputClass} {...register("name")} />
          <p className="text-red-600">{errors.name?.message}</p>
        </div>
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
          <input
            type="password"
            className={InputClass}
            {...register("password")}
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <div className="my-5">
          <label htmlFor="confirmPassword" className="pb-1 ">
           Confirm Password
          </label>
          <input
            type="password"
            className={InputClass}
            {...register("confirmPassword")}
          />
          <p className="text-red-600">{errors.confirmPassword?.message}</p>
        </div>
      </div>
      <FormAction apiResponse={apiResponse} text="Signup" loading={loading} />
    </form>
  );
};

export default Signup;
