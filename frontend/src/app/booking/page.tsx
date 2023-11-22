import Form from '@/components/Form'
import { authOptions } from '../api/auth/[...nextauth]/route';
import {getServerSession} from 'next-auth';
import getUserProfile from '@/libs/getUserProfile';
export default async function booking() {

    const session = await getServerSession(authOptions);
   
    if(!session || !session.user.token){
        return (
            <main className='p-5 my-10'>
                <h1 className="text-4xl text-center font-bold w-[100%]">Booking</h1>
                <hr className="mt-10 border-black"></hr>

                <div className='flex flex-col items-center '>
                    <h1>Loading</h1>
                </div>
            </main>
        ); 
    } 
    const profile = await getUserProfile(session.user.token)
    var createAt = new Date(profile.data.createdAt);
    
    if(profile) console.log(profile.data)

    return ( 
        <main className=' px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md my-3 mx-4'>
            <h1 className="text-4xl text-center font-bold w-[100%]">Booking</h1>
            <hr className="mt-10 border-black"></hr>

            <div className='flex flex-col items-center  '>
                <Form user={profile.data}></Form>     
            </div>

        </main>
    );
}
 
