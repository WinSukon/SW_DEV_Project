import RegisterUser from "@/components/RegisterForm";
import TextBox from "@/components/TextBox";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";

const AddErrorPage = () => {

  return (
    <div className={"flex flex-col justify-center items-center h-screen bg-[url('/img/bg2.jpg')] bg-no-repeat bg-fixed"}>
      <div className="px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md flex flex-col gap-2 justify-center items-center">
        <div className="font-bold text-4xl">This Restaurant Name Is Already In Use</div>
        <Link href="/restaurants" className="bg-[#FFCE50] hover:bg-[#FFCE50] font-bold text-black py-2 px-4 
        rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75 text-black mt-[40px] ">Back To Restaurant Page</Link>
      </div>
    </div>
  );
};

export default AddErrorPage;