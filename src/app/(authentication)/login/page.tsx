import FormHeader from "@/components/formHeader/formHeader";
import Login from "@/components/login/login";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = async () => {
  const session: Session | null = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <FormHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkActions={[{ title: "Signup", url: "/signup" }]}
      />
      <Login />
    </>
  );
};

export default LoginPage;
