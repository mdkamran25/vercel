import FormHeader from "@/components/formHeader/formHeader";
import Signup from "@/components/signup/signup";
import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup",
};

const SignupPage = async () => {
  const session: Session | null = await getServerSession();

  if (session) {
    redirect("/");
  }
  return (
    <>
      <FormHeader
        heading="Create new account"
        paragraph="Already have an account? "
        linkActions={[{ title: "Login", url: "/login" }]}
      />
      <Signup />
    </>
  );
};

export default SignupPage;
