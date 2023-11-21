"use server"

import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import Booking from "@/db/models/Booking";

export async function updateBooking(id:String,date:Date,numGuest:Number,user:Object,res:Object) {

    try {
        await dbConnect()
        const book = await Booking.findByIdAndUpdate({_id:id},{
            "bookingDate": date ,
            "numOfGuests": numGuest,
            "user": user ,
            "restaurant": res,
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