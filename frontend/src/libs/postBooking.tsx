"use server"

import { BookingItem } from "@/interface";
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import Booking from "@/db/models/Booking";

export async function postBooking(date:Date,numGuest:Number,user:Object,res:Object) {
    console.log('success??????')

    try {
        await dbConnect()
        const book = await Booking.create({
            "bookingDate": date ,
            "numOfGuests": numGuest,
            "user": user ,
            "restaurant": res,
        })
        console.log('success?')
    }
    catch(error){
        console.log('fail?')
        console.log(error)
    }

    // revalidateTag("ress")
    redirect("/mybooking")
}