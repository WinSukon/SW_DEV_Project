'use server'
import { dbConnect } from "@/db/dbConnect"
import Booking from "@/db/models/Booking"

export default async function  deleteBooking(toDelete:{date:Date,numGuest:Number,user:Object,res:Object}) {

    try{
        await dbConnect()
        const book = await Booking.findOneAndDelete(
            {
                "bookingDate": toDelete.date ,
                "numOfGuests": toDelete.numGuest,
                "user": toDelete.user ,
                "restaurant": toDelete.res
            }
        )
        console.log('del')

    }
    catch(error){
        console.log(error)
    }
}