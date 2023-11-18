import Form from '@/components/Form'
import { authOptions } from '../api/auth/[...nextauth]/route';
import {getServerSession} from 'next-auth';
import getUserProfile from '@/libs/getUserProfile';
export default async function booking() {

    const session = await getServerSession(authOptions);
   
    if(!session || !session.user.token){
        return (
            <main>
                <div className='flex flex-col items-center text-center p-5 my-10'>
                    <h1 className="text-4xl font-bold w-[100%]">Booking</h1>
                    <hr className="mt-10 border-black"></hr>
                    <Form></Form>
                </div>
            </main>
        ); 
    } 
    const profile = await getUserProfile(session.user.token)
    var createAt = new Date(profile.data.createdAt);

    return ( 
        <main>
            <div className='flex flex-col items-center text-center p-5 my-10 '>
                <div className="bg-slate-100 m-5 p-5">
                    <div className="text-2xl">
                        {profile.data.name}
                    </div> 
                    <table className='table-auto border-separate border-spacing-2'>
                        <tbody>
                            <tr><td>Email : </td><td>{profile.data.email}</td></tr>
                            <tr><td>Tel : </td><td>{profile.data.tel}</td></tr>
                            <tr><td>Member Since : </td><td>{createAt.toString()}</td></tr>

                        </tbody>
                    </table>
                </div>
                
                <h1 className="text-4xl font-bold w-[100%]">Booking</h1>
                <hr className="mt-10 border-black"></hr>
                <Form></Form>
            </div>
        </main>
    );
}
 
