import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Reservations from "@/components/Reservations";

export default async function mybooking(){
   
    const session =await getServerSession(authOptions)

    const profile = await getUserProfile(session.user.token)
 
    return(
        <main className='px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md my-3 mx-4'>
            <h1 className="text-4xl text-center font-bold w-[100%]">Reservations</h1>
            <hr className="mt-10 border-black"></hr>
            {session && profile ?
                <Reservations profile={profile}></Reservations>
                :
                <div>Loading</div>
            }
        </main>
  
    );
}