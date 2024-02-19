"use client";
import { signupFields } from "@/constants/formFields";
import React, { useState } from "react";
import FormAction from "../formAction/formAction";
import Input from "../input/input";
import { signup } from "@/constants/apiUrl";
import { useRouter } from "next/navigation";

const fields: LoginFields[] = signupFields;
let fieldsState: Record<string, string> = {};
fields.forEach((field) => (fieldsState[field.name] = ""));

const Signup = () => {
  const router = useRouter();
  const [signupState, setSignupState] = useState(fieldsState);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    status: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSignupState({ ...signupState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupState),
      });
      const data = await res.json();
      if (res.ok) {
        setApiResponse(data);
        setSignupState(fieldsState);
        router.push("/login")
        setLoading(false);
      } else {
        setApiResponse(data);
        setLoading(false);
        throw new Error("Failed to create account");
      }
    } catch (error:unknown) {
      if(error instanceof Error){
        setLoading(false);
        console.error("Error creating account:", error?.message);
      }
    }
  };

  return (
    <form className="mt-8 px-4 sm:px-8 pb-5" onSubmit={handleSubmit}>
      <div className=" space-y-6">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.name]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormAction apiResponse={apiResponse} handleSubmit={handleSubmit} text="Signup" loading={loading} />    
    </form>
  );
};

export default Signup;
