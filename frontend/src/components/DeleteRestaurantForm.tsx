import Restaurant from "@/db/models/Restaurant"
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"
import getRestaurants from "@/libs/getRestaurants"
import { MenuItem, Select } from "@mui/material"

export default async function DeleteRestaurant(){
    const delRes = async (delForm:FormData) => {
        "use server"
        const id = delForm.get("resId")

        try{
            const db = await dbConnect()
            const del = await Restaurant.deleteOne({_id:id})
        }
        catch(error){
            console.log(error)
        }
        redirect("/restaurants")
    }

    const resList = await getRestaurants();

    return(
        <form action={delRes} className="my-5 px-20 py-[50px] shadow bg-[#FFEDC0] rounded-md flex flex-col gap-2 justify-center items-center">
            <div className="font-bold text-4xl">Delete Restaurant</div>
            <div className="relative my-5">
                <label className="block text-gray-600  mb-2 text-xs lg:text-sm xl:text-base" htmlFor="resName">
                    Restaurant Id</label>
                <div className="flex items-stretch">
                <input type="text" required id="resId" name="resId" placeholder="Restaurant's Id"
                className="rounded-md border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500"/>
                </div>
                {/* <Select variant="standard" label="choose hospital" className="w-[280px]" required id="resId" name="resId" placeholder="Restaurant's Id">
                    {resList.data.map((resItem:Object)=>(
                        <MenuItem value={resItem._id}>{resItem.name}</MenuItem>
                    ))}
                </Select> */}
            </div>
            <button type="submit" className="bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75">Delete Restaurant</button>
        </form>
    )

}