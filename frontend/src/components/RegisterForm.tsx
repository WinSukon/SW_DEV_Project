import { genSalt, hash } from "bcrypt-ts";
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import User from "@/db/models/User"

export default function RegisterUser(){
    const regUse = async (regForm:FormData) => {
        "use server"
        const name = regForm.get("userName")
        const email = regForm.get("email")
        const tel = regForm.get("tel")
        let password = regForm.get("password")

        const salt = await genSalt(10);
        password = await hash(password, salt);
        try{
            await dbConnect()
            const user = await User.create({
                "name": name,
                "email": email,
                "tel": tel,
                "role": "user",
                "password": password,
            })
        }
        catch(error){
            console.log(error)
        }
        // redirect("/")
    }

    return(
        <form action={regUse} className="px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md flex flex-col gap-2 justify-center items-center">
            <div className="font-bold text-4xl">Register</div>
            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="userName">
                    Name</label>
                <div className="flex items-stretch">
                    <input type="text" required id="userName" name="userName" placeholder="Your Name"
                    className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="email">
                    Email</label>
                <input type="text" required id="email" name="email" placeholder="Email"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="tel">
                    Telephone No.</label>
                <input type="text" required id="tel" name="tel" placeholder="Telephone No."
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="password">
                    Password</label>
                <input type="text" required id="password" name="password" placeholder="Password"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <button type="submit" className='bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75'>Register</button>
        </form>
    )

}