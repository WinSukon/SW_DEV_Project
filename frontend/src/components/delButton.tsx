import { dbConnect } from "@/db/dbConnect"
import Restaurant from '@/db/models/Restaurant';
import {redirect} from "next/navigation"


export default function DelButton({rid}:{rid:string}){

    const deleteRestaurant = async () => {
        "use server"
        try{
            await dbConnect()
            // const resT = await Restaurant.findById(rid)
            const resT = await Restaurant.deleteOne({ _id: rid})
            // await db.collection('your-collection-name').deleteOne({ _id: rid});
            if(!resT){
                console.log("wtf")
            }
        }
        catch(error){
            console.log(error)
        }

        redirect("/restaurants")
    } 
    return(
        <button onClick={deleteRestaurant} className='border-5 bg-slate-100 p-5 m-5'>Delete</button>
    )
}