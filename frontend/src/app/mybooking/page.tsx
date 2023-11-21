import getUserProfile from "@/libs/getUserProfile";
import ReservationInfo from '@/components/ReservationInfo';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function mybooking(){
   
    // const {data:session} = useSession()
    const session =await getServerSession(authOptions)

    const profile = await getUserProfile(session.user.token)
 
    return(
        <main className='p-5 my-10'>
            <h1 className="text-4xl text-center font-bold w-[100%]">Reservations</h1>
            <hr className="mt-10 border-black"></hr>
            {session && profile ?
            <ReservationInfo profile={profile}></ReservationInfo>
                :
                <div>Loading</div>
            }
        </main>
  
    );
}