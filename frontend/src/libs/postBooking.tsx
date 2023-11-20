"use server"

import { BookingItem } from "@/interface";
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"

export async function postBooking(bookingInfo:BookingItem) {
    const id = addResForm.get("resId")
    const name = addResForm.get("resName")
    const foodType = addResForm.get("ftype")
    const address = addResForm.get("addr")
    const province = addResForm.get("province")
    const postalcode = addResForm.get("posCode")
        const tel = addResForm.get("tel")
        const picture = addResForm.get("picture")

        try {
            await dbConnect()
            const res = await Restaurant.findByIdAndUpdate({_id:id},
            {
                "name" :name,
                "foodtype":foodType,
                "address" : address,
                "province" : province,
                "postalcode" : postalcode,
                "tel": tel,
                "picture": picture
            },
            {
                new: true,
                runValidators: true,
            })
        }
        catch(error){
            console.log(error)
        }

        revalidateTag("ress")
        redirect("/")
}