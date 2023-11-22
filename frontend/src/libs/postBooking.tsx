"use server"

import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import Booking from "@/db/models/Booking";

export async function postBooking(date:Date,numGuest:Number,user:Object,res:string) {

    try {
        await dbConnect()
        const book = await Booking.create({
            "bookingDate": date ,
            "numOfGuests": numGuest,
            "user": user ,
            "restaurant": res,
        })
    }
    catch(error){
        console.log(error)
    }

    // revalidateTag("ress")
    redirect("/mybooking")
}