import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
export default async function Menus(){

    const session = await getServerSession(authOptions)
    return (  
        <div className="h-16 bg-[#FFCE50] fixed z-50 inset-x-0 top-0 flex flex-row justify-center shadow-lg">
            <TopMenuItem title='Booking' pageRef='/booking'/>
            <div className="border border-black my-2"></div>
            <TopMenuItem title='Restaurants' pageRef='/restaurants'/>
            <div className="border border-black my-2"></div>
            <TopMenuItem title='Reservation' pageRef='/mybooking'/>
            {
                
                session? <Link href="/api/auth/signout">
                    <div className='w-30 h-[50px] center my-[6px] font-sans text-xl 
        text-black font-bold rounded-md hover:bg-amber-400 pt-[10px]  px-2 flex item-center absolute right-5'>
                    Sign-Out of {session.user?.name}
                    </div>
                    </Link>
                : <Link href="/api/auth/signin">
                    <div className='w-30 h-[50px] center my-[6px] font-sans text-xl 
        text-black font-bold rounded-md hover:bg-amber-400 pt-[10px]  px-4 flex item-center absolute right-5'>
                    Sign-In
                    </div>
                </Link>
            }
            <div>
            <Link className='w-30 h-[50px] center my-[6px] font-sans text-xl 
        text-black font-bold rounded-md hover:bg-amber-400 pt-[10px]  px-4 flex item-center absolute left-5' href='/'>
                Home
            </Link>
            </div>
        </div>
    );
}
 
