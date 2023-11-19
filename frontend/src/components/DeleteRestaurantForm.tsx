import Restaurant from "@/db/models/Restaurant"
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"

export default function DeleteRestaurant(){
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

    return(
        <form action={delRes} className="w-[100%] flex flex-col bold items-center space-y-4 mt-[50px] bg-slate-100 
        rounded-lg space-x-5 px-10 py-5 justify center mx-auto">
            <div className="text-xl text-blue-700">Delete Restaurant</div>
            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor="resName">
                    Restaurant Id</label>
                <input type="text" required id="resId" name="resId" placeholder="Restaurant's Id"
                className="bg-white border-2 border-gray-200 rounded w-full p-2
                text-gray-700 focus:outline-none focus:border-blue-400"/>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700
            text-white p-2 rounded">Delete Restaurant</button>
        </form>
    )

}