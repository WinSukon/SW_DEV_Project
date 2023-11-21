'use client'
import {useState} from 'react'
import Form from "@/components/Form";

import { cancelBooking } from "@/redux/features/bookSlice";
import { useAppSelector } from "@/redux/store";
import {useDispatch} from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "@/interface";
import Image from "next/image";


const ReservationInfo = ({profile}:{profile:Object}) => {
    const [isEditing,setEdit] = useState<Boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const bookItems = useAppSelector((state)=>state.bookSlice.bookItems)

    //remove in redux
    const cancel=(bookItem:BookingItem)=>{
        dispatch(cancelBooking(bookItem))
    }
    return ( 
        <div className="flex flex-col">
            {isEditing ? <Form user={profile.data} isEditing={true}></Form> : null}

            {bookItems.length===0 ?
                <div>No Vaccine Booking</div>
                :
                <div className='flex flex-col'>
                    {bookItems.map((bookItem:BookingItem)=>(
                        //!add key in the div below
                        <div className="flex flex-row bg-slate-200 rounded px-5 mx-5 py-2 my-2">
                            {/* <div className='w-full h-[80%] relative rounded-t-lg'>
                                <Image src={imgsrc}
                                    alt='Restaurant Information'
                                    fill={true}
                                    className='object-cover rounded-t-lg'/>
                            </div> */}
                            <div className="flex flex-col">
                                <div className="text-lg">{bookItem.restaurant}</div>
                                <div className="text-lg">{bookItem.numOfGuests.toString()}</div>
                                <div className="text-lg">{bookItem.bookingDate}</div>
                                <div className="text-lg">{bookItem.user}</div>
                                <div className="left-[46%]  m-0">
                                    <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600" 
                                    onClick={()=>{setEdit(true)}}>Edit Booking</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
            
     );
}
 
export default ReservationInfo;