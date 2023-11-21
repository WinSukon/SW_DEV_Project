import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddRestaurantForm from "@/components/AddRestaurantForm";
import RestaurantCatalog from "@/components/restaurantCatalog";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import DeleteRestaurant from '@/components/DeleteRestaurantForm';
import UpdateRestaurantForm from "@/components/UpdateRestaurantForm";
import Link from "next/link";


export default async function RestaurantList(){
    const session = await getServerSession(authOptions);
    let isAdmin = false;

    if (session && session.user.token) {
        const profile = await getUserProfile(session.user.token);
        isAdmin = profile.data.role === "admin";
    }
    return(
        <main className="text-center p-5 my-10">
          <div className="px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md">
            <hr className="mt-10 border-black bg"></hr>
            <h1 className="text-4xl font-bold w-[100%] mt-10">Restaurant List</h1>
            <RestaurantCatalog/>
            <hr className="mt-10 border-black bg"></hr>
            {isAdmin ? (
              <div>
              <h1 className="text-4xl font-bold w-[100%] mt-10 ">Manage Restaurant</h1>
              <div className="flex flex-row justify-center items-center mt-5">
                <hr className="mt-10 border-black"></hr>
                <Link href="/manage/restaurant/add" className="mx-5 bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75">Add Restaurant</Link>
                <Link href="/manage/restaurant/update" className="mx-5 bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75">Update Restaurant</Link>
                <Link href="/manage/restaurant/delete" className="mx-5 bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75">Delete Restaurant</Link>
              </div>
              <hr className="my-10 border-black bg"></hr>
              </div>
            ) : null}  
            </div>
        </main>
    )
}