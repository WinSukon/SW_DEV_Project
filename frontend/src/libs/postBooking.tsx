"use server"

import { BookingItem } from "@/interface";
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import Booking from "@/db/models/Booking";

export async function postBooking(bookingInfo:BookingItem) {
    try {
        await dbConnect()
        const res = await Booking.create(bookingInfo)
    }
    catch(error){
        console.log(error)
    }

    revalidateTag("ress")
    redirect("/")
}