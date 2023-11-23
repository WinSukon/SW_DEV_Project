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
        <div className="flex flex-col justify-center items-center h-screen bg-[url('/img/bg2.jpg')] bg-no-repeat bg-fixed">
            <div className='px-20 py-[50px] justify-center items-center w-[30%] shadow bg-[#FFEDC0] rounded-md flex flex-col gap-2 my-5  h-screen'>
            <h1 className="text-4xl text-center font-bold w-[100%]">Booking</h1>
            <hr className="mt-10 border-black"></hr>
            <div className='flex flex-col items-center justify-center  '>
                    <Form user={profile.data}></Form>     
                </div>
            </div>
            </div>
    );
}
 