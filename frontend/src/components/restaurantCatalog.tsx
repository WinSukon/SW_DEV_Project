"use client"
import Link from "next/link";
import RestaurantCard from "./restaurantCard";
import { useEffect, useState } from "react";
import getRestaurants from "@/libs/getRestaurants";
import DeleteRestaurant from "./DeleteRestaurantForm";

export default function RestaurantCatalog(){

    const [resJsonReady,setRes] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            setRes(res)
        }
        fetchData()
    },[])

    if(!resJsonReady) return (<div>loading</div>)
    return (
        <>
        <div className="ml-20 mr-20 mt-10 flex flex-row content-around justify-around flex-wrap">
                {resJsonReady.data.map((resItem:Object)=>(
                <Link href={`/restaurants/${resItem.id}`} 
                className="w-[100%] sm:w-[50%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8 m-[20]">
                    
                <RestaurantCard name={resItem.name} imgsrc={resItem.picture}/>
                </Link>
                ))}
                
        </div>
        </>
    )
}