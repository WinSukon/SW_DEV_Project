import Restaurant from "@/db/models/Restaurant"
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import getRestaurants from "@/libs/getRestaurants"
import { MenuItem, Select } from "@mui/material"

export default async function UpdateRestaurantForm(){
    const updateRestaurant = async (addResForm:FormData) => {
        "use server"
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
        redirect("/restaurants")
    }

    const resList = await getRestaurants();
    
    return (
        <form action={updateRestaurant} className="px-20 py-[30px] shadow bg-[#FFEDC0] rounded-md flex flex-col gap-2 justify-center items-center my-5">
            <div className="font-bold text-4xl">Update Restaurant</div>
            <div className="relative mt-5">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="resId">
                    Restaurant Id</label>
                <div className="flex items-stretch">
                <input type="text" required id="resId" name="resId" placeholder="Restaurant's Id"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
                {/* <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="resId">
                    Restaurant Name</label>
                <Select variant="standard" label="choose hospital" className="w-[230px]" required id="resId" name="resId" placeholder="Restaurant's Id">
                    {resList.data.map((resItem:Object)=>(
                        <MenuItem value={resItem._id}>{resItem.name}</MenuItem>
                    ))}
                </Select> */}
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="resName">
                    Restaurant Name</label>
                <div className="flex items-stretch">
                <input type="text" required id="resName" name="resName" placeholder="Restaurant's Name"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="ftype">
                    Food Type</label>
                <div className="flex items-stretch">
                <input type="text" id="ftype" name="ftype" placeholder="Food Type"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="addr">
                    Address</label>
                <div className="flex items-stretch">
                <input type="text" id="addr" name="addr" placeholder="Restaurant's Address"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="province">
                    Province</label>
                <div className="flex items-stretch">
                <input type="text" id="province" name="province" placeholder="Restaurant's Province"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="posCode">
                    Postal Code</label>
                <div className="flex items-stretch">
                <input type="text" id="posCode" name="posCode" placeholder="Postal Code"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
            </div>

            <div className="relative">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="tel">
                    Telephone Number</label>
                <div className="flex items-stretch">
                <input type="text" id="tel" name="tel" placeholder="Telephone Number"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
            </div>

            <div className="relative mb-5">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="picture">
                    Picture</label>
                <div className="flex items-stretch">
                <input type="text" id="picture" name="picture" placeholder="Picture's URL"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
            </div>

            <button type="submit" className="bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75">Update Restaurant</button>
        </form>
    )
}