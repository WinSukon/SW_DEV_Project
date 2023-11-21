"use server"

import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import Booking from "@/db/models/Booking";

export async function updateBookingDB(before:{date:Date,numGuest:Number,user:Object,res:Object},after:{date:Date,numGuest:Number,user:Object,res:Object}) {

    try {
        await dbConnect()
        const book = await Booking.findOneAndUpdate(
        {
            "bookingDate": before.date ,
            "numOfGuests": before.numGuest,
            "user": before.user ,
            "restaurant": before.res
        },
        {
            "bookingDate": after.date ,
            "numOfGuests": after.numGuest,
            "user": after.user ,
            "restaurant": after.res,
        },
        {
            new: true,
            runValidators: true,
        })
    }
    catch(error){
        console.log(error)
    }

    // revalidateTag("ress")
    // redirect("/mybooking")
}