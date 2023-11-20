"use server"

import { BookingItem } from "@/interface";
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import Booking from "@/db/models/Booking";

export async function postBooking(bookingInfo:BookingItem) {
    console.log('success??????')

    try {
        await dbConnect()
        const res = await Booking.create(bookingInfo)
        console.log('success?')
    }
    catch(error){
        console.log(error)
    }

    revalidateTag("ress")
    redirect("/mybooking")
}