import getRestaurants from "@/libs/getRestaurants";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import RestaurantCatalog from "@/components/restaurantCatalog";
import Menus from "@/components/Menus";

export default function RestaurantList(){

    return(
        <main className="text-center p-5 my-10">
            <h1 className="text-4xl font-bold w-[100%]">Restaurant List</h1>
            <hr className="mt-10 border-black"></hr>
            <RestaurantCatalog/>           
        </main>
    )
}