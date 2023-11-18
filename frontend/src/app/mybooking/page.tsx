'use client'
import { useAppSelector } from "@/redux/store";
import {useDispatch} from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { cancelBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "@/interface";


export default function mybooking(){
    const bookItems = useAppSelector((state)=>state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>();

    const cancel=(bookItem:BookingItem)=>{
        dispatch(cancelBooking(bookItem))
    }
    return(
        <main className='p-5 my-10'>
            <h1 className="text-4xl text-center font-bold w-[100%]">Reservations</h1>
            <hr className="mt-10 border-black"></hr>

            {bookItems.length===0 ?
                <div>No Vaccine Booking</div>
                :
                <div>
                    {bookItems.map((bookItem:BookingItem)=>(
                        <div className="flex flex-col bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookItem.id}>
                            <div className="text-2xl">{bookItem.name} {bookItem.surname}</div>
                            <div className="text-lg">{bookItem.id}</div>
                            <div className="text-lg">{bookItem.restaurant}</div>
                            <div className="text-lg">{bookItem.date}</div>
                            <div className="left-[46%]  m-0">
                                <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600" 
                                onClick={()=>{cancel(bookItem)}}>Cancel Booking</button>
                            </div>
                        </div>        

                    ))}
                </div>
            }
        </main>
  
    );
}