'use client'
import { useAppSelector } from "@/redux/store";
import {useDispatch} from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { cancelBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "@/interface";
import Image from "next/image";

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
                        //!add key in the div below
                        <div className="flex flex-row bg-slate-200 rounded px-5 mx-5 py-2 my-2" >
                            <div className='w-full h-[80%] relative rounded-t-lg'>
                                {/* <Image src={imgsrc}
                                    alt='Restaurant Information'
                                    fill={true}
                                    className='object-cover rounded-t-lg'/> */}
                            </div>
                            <div className="flex flex-col">
                                <div className="text-lg">{bookItem.restaurant}</div>
                                <div className="text-lg">{bookItem.numOfGuests.toString()}</div>
                                <div className="text-lg">{bookItem.bookingDate}</div>
                                <div className="text-lg">{bookItem.user}</div>
                                <div className="left-[46%]  m-0">
                                    <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600" 
                                    onClick={()=>{cancel(bookItem)}}>Cancel Booking</button>
                                </div>
                            </div>
                            
                        </div>        

                    ))}
                </div>
            }
        </main>
  
    );
}