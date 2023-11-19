import Restaurant from "@/db/models/Restaurant"
import { dbConnect } from "@/db/dbConnect"
import {revalidateTag} from "next/cache"
import {redirect} from "next/navigation"

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

        revalidateTag("ress")
        redirect("/")
    }
    return (
        <form action={addRestaurant} className="w-[100%] flex flex-col bold items-center space-y-4 mt-[50px] bg-slate-100 
        rounded-lg space-x-5 px-10 py-5 justify center mx-auto">
            <div className="text-xl text-blue-700">Add Restaurant</div>
            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor="resName">
                    Restaurant Name</label>
                <input type="text" required id="resName" name="resName" placeholder="Restaurant's Name"
                className="bg-white border-2 border-gray-200 rounded w-full p-2
                text-gray-700 focus:outline-none focus:border-blue-400"/>
            </div>

            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor="ftype">
                    Food Type</label>
                <input type="text" required id="ftype" name="ftype" placeholder="Food Type"
                className="bg-white border-2 border-gray-200 rounded w-full p-2
                text-gray-700 focus:outline-none focus:border-blue-400"/>
            </div>

            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor="addr">
                    Address</label>
                <input type="text" required id="addr" name="addr" placeholder="Restaurant's Address"
                className="bg-white border-2 border-gray-200 rounded w-full p-2
                text-gray-700 focus:outline-none focus:border-blue-400"/>
            </div>

            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor="province">
                    Province</label>
                <input type="text" required id="province" name="province" placeholder="Restaurant's Province"
                className="bg-white border-2 border-gray-200 rounded w-full p-2
                text-gray-700 focus:outline-none focus:border-blue-400"/>
            </div>

            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor="posCode">
                    Postal Code</label>
                <input type="text" required id="posCode" name="posCode" placeholder="Postal Code"
                className="bg-white border-2 border-gray-200 rounded w-full p-2
                text-gray-700 focus:outline-none focus:border-blue-400"/>
            </div>

            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">
                    Telephone Number</label>
                <input type="text" required id="tel" name="tel" placeholder="Telephone Number"
                className="bg-white border-2 border-gray-200 rounded w-full p-2
                text-gray-700 focus:outline-none focus:border-blue-400"/>
            </div>

            <div className="flex items-center w-1/2 my-2">
                <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">
                    Picture</label>
                <input type="text" required id="picture" name="picture" placeholder="Picture's URL"
                className="bg-white border-2 border-gray-200 rounded w-full p-2
                text-gray-700 focus:outline-none focus:border-blue-400"/>
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700
            text-white p-2 rounded">Add New Restaurant</button>
        </form>
    )
}