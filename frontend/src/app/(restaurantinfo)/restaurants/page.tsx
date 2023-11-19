import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddRestaurantForm from "@/components/AddRestaurantForm";
import RestaurantCatalog from "@/components/restaurantCatalog";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import DeleteRestaurant from '@/components/DeleteRestaurantForm';
import UpdateRestaurantForm from "@/components/UpdateRestaurantForm";


export default async function RestaurantList(){
    const session = await getServerSession(authOptions);
    let isAdmin = false;

    if (session && session.user.token) {
        const profile = await getUserProfile(session.user.token);
        isAdmin = profile.data.role === "admin";
    }
    return(
        <main className="text-center p-5 my-10">
            <h1 className="text-4xl font-bold w-[100%]">Restaurant List</h1>
            <hr className="mt-10 border-black"></hr>
            <RestaurantCatalog/>
            {isAdmin ? (
              <div className="my-1 items-center">
                <hr className="mt-10 border-black"></hr>
                <AddRestaurantForm></AddRestaurantForm>
                <UpdateRestaurantForm/>
                <DeleteRestaurant/>
              </div>
            ) : null}  
        </main>
    )
}