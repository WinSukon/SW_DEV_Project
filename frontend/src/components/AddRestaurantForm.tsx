import Restaurant from "@/db/models/Restaurant"
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import {useEffect,useState} from 'react'

export default function AddRestaurantForm(){
    const addRestaurant = async (addResForm:FormData) => {
        "use server"
        const name = addResForm.get("resName")
        const foodType = addResForm.get("ftype")
        const address = addResForm.get("addr")
        const province = addResForm.get("province")
        const postalcode = addResForm.get("posCode")
        const tel = addResForm.get("tel")
        const picture = addResForm.get("picture")

        try {
            await dbConnect()
            const res = await Restaurant.create({
            "name" :name,
            "foodtype":foodType,
            "address" : address,
            "province" : province,
            "postalcode" : postalcode,
            "tel": tel,
            "picture": picture
            })
        }
        catch(error){
            console.log(error)
        }

        redirect("/restaurants")
    }

    return (
        <form action={addRestaurant} className="px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md flex flex-col gap-2 justify-center items-center my-5 ">
            <div className="font-bold text-4xl">Add Restaurant</div>
            <div className="relative mt-5">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="resName">
                    Restaurant Name</label>
                <input type="text" required id="resName" name="resName" placeholder="Restaurant's Name"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="ftype">
                    Food Type</label>
                <input type="text" required id="ftype" name="ftype" placeholder="Food Type"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="addr">
                    Address</label>
                <input type="text" required id="addr" name="addr" placeholder="Restaurant's Address"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="province">
                    Province</label>
                <input type="text" required id="province" name="province" placeholder="Restaurant's Province"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="posCode">
                    Postal Code</label>
                <input type="text" minLength={5} maxLength={5} pattern="[0-9]{5}" required id="posCode" name="posCode" placeholder="Postal Code"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="tel">
                    Telephone Number</label>
                <input type="tel" minLength={10} maxLength={10} pattern="[0-9]{10}" required id="tel" name="tel" placeholder="Telephone Number"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <div className="relative mb-5">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="picture">
                    Picture</label>
                <input type="text" required id="picture" name="picture" placeholder="Picture's URL"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
            </div>

            <button type="submit" className="bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75">Add New Restaurant</button>
        </form>
    )
}