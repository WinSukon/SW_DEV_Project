import RegisterUser from "@/components/RegisterForm";
import TextBox from "@/components/TextBox";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";

const RegisterPage = () => {

  return (
    <div className={"flex flex-col justify-center items-center bg-[url('/img/bg2.jpg')] h-screen"}>
      <RegisterUser/>
    </div>
  );
};

export default RegisterPage;