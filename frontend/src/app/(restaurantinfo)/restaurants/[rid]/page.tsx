import Image from 'next/image';
import getRestaurant from '@/libs/getRestaurant';
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation"
import { dbConnect } from '@/db/dbConnect';
import Restaurant from "@/db/models/Restaurant"
import DeleteRestaurant from '@/components/DeleteRestaurantForm';
import UpdateRestaurantForm from '@/components/UpdateRestaurantForm';

export default async function RestaurantDetailPage({params}:{params:{rid:string}}){
    
    const session = await getServerSession(authOptions);
    const resDetail = await getRestaurant(params.rid);
    let isAdmin = false;

    if (session && session.user.token) {
        const profile = await getUserProfile(session.user.token);
        isAdmin = profile.data.role === "admin";
    }

    return (
        <main className="text-center p-5 h-[100%]">
            <div className="flex flex-row shadow bg-[#FFEDC0] rounded-md my-3 mx-4 ">
                <Image src={resDetail.data.picture} 
                alt="Hospital Picture"
                width={0} height={0} sizes="100vw"
                className='rounded-lg w-[30%] bg-black'/>
                <div className='flex flex-col px-10 py-[25px] mb-3 w-[100vh] relative content-start items-start'>
                    <div className='text-4xl font-bold text-left py-[10px]'>{resDetail.data.name}</div>
                    <div className='text-lg mx-5 text-left underline'>Description</div>
                    <div className='text-md mx-5 text-left'>Food Type: {resDetail.data.foodtype}</div>
                    <div className='text-md mx-5 text-left'>Address: {resDetail.data.address}</div>
                    <div className='text-md mx-5 text-left'>Province: {resDetail.data.province}</div>
                    <div className='text-md mx-5 text-left'>Postal Code:{resDetail.data.postalcode}</div>
                    <div className='text-md mx-5 text-left'>Tel: {resDetail.data.tel}</div>
                    
                    { isAdmin ? (
                        <div className='relative'>
                        <div className=''>
                                {/* <div className='text-md mx-5 text-left'>Restaurant Id: {resDetail.data.id}</div> */}
                                <DeleteRestaurant rid={resDetail.data.id}/>
                        </div>
                        </div>
                ):null}
                </div>
                
                    
            </div>
            { isAdmin ? (
                    <div className='flex flex-row justify-center items-center'>
                    <UpdateRestaurantForm rid={resDetail.data.id}/> 
                    </div>
                ):null}
            
            
        </main>
    )
}