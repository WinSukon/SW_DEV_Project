"use server"

import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import Booking from "@/db/models/Booking";

export async function updateBookingDB(id:string,after:{date:Date,numGuest:Number,res:Object}) {

    try {
        await dbConnect()
        const book = await Booking.findByIdAndUpdate(
        {
            _id:id
        },
        {
            $set: {
                "bookingDate": after.date ,
                "numOfGuests": after.numGuest,
                "restaurant": after.res,
            }
        }
       ,
        {
            new: true,
            runValidators: true,
        })
        console.log('up')
    }
    catch(error){
        console.log(error)
    }

    // revalidateTag("ress")
    // redirect("/mybooking")
}