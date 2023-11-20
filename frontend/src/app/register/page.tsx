"use client";
import TextBox from "@/components/TextBox";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className={"flex flex-col justify-center items-center bg-[url('/img/bg2.jpg')] h-screen"}>
      <div className="px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md flex flex-col gap-2 justify-center items-center">
        <div className="font-bold text-4xl">Login</div>
        <TextBox
          labelText="Email"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <TextBox
          labelText="Password"
          type={"password"}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <button className={'bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75'}onClick={onSubmit}>Login</button>
        <div className="my-2">No acoount yet? &nbsp;
            <Link href="/register" className="text-blue-500 underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;