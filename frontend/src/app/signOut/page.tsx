"use client"
import { signOut} from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";

const SignOutPage = () => {

  return (
    <div className={"flex flex-col justify-center items-center h-screen bg-[url('/img/bg2.jpg')] bg-no-repeat bg-fixed"}>
      <div className="px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md flex flex-col gap-2 justify-center items-center">
        <div className="font-bold text-4xl">You Want To Sign Out?</div>
            <button onClick={()=>{signOut({ callbackUrl: 'http://localhost:3000/' })}} 
            className="bg-[#FFCE50] hover:bg-[#FFCE50] font-bold text-black py-2 px-4 
            rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75 text-black mt-[40px]">Sign Out</button>
      </div>
    </div>
  );
};

export default SignOutPage;