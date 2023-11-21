'use client'
import {useState,useEffect} from 'react'
//components
import Form from "./Form";
import Image from 'next/image';
//redux
import { useAppSelector , AppDispatch} from "@/redux/store";
import { cancelBooking } from "@/redux/features/bookSlice";
import {useDispatch} from 'react-redux';
//interface
import { BookingItem } from '@/interface';
//libs
import deleteBooking from '@/libs/deleteBooking';
import getRestaurants from "@/libs/getRestaurants";

const Reservations = ({profile}:{profile:Object}) => {
    //setup Hooks
    const [isEditing,setEdit] = useState<boolean>(false)
    const [editingBook,setEditingBook] = useState<BookingItem>()//set when click on edit and cancel only
    const [isCanceling,setCancel] = useState<boolean>(false)
    const [isDisable,setDisable]= useState<boolean>(false)
    //get current bookItems
    const bookItems = useAppSelector((state)=>state.bookSlice.bookItems)

    const dispatch = useDispatch<AppDispatch>();
    //remove in redux
    const cancel=(bookItem:BookingItem)=>{
        dispatch(cancelBooking(bookItem))
    }

    const cancelBookHandler = ()=>{
        setCancel(false)
        if(editingBook) {
            cancel(editingBook)
            //!cancel in db
            const restaurant=resJson.data.find((resItem:Object)=>{
                if(resItem._id==editingBook.restaurant._id) return resItem
            })
            const todelete= {
                date: new Date(editingBook.bookingDate),
                numGuest:editingBook.numOfGuests,
                user:profile.data,
                res:restaurant
            }
            deleteBooking(todelete)
        }
        
    }
    //when finish updating change isEditing to false
    useEffect(()=>{
        setEdit(false)
    },[bookItems])

    const [resJson,setRes] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            setRes(res)
        }
        fetchData()
    },[])

    return (
        <div className="flex flex-col">
            {isEditing ? <Form user={profile.data} bookItemtoEdit={editingBook}></Form> : null}
            {isCanceling ? 
                <div className="flex">
                    Are you sure you want to cancel?
                    <button onClick={cancelBookHandler}>Yes</button>
                    <button onClick={()=>setCancel(false)}>No</button>
                </div>
                :null

            }
            {bookItems.length===0 ?
                <div>No Vaccine Booking</div>
                :
                <div className='flex flex-col'>
                    {bookItems.map((bookItem:BookingItem)=>(
                        //!add key in the div below
                            //!come back and style this!!!!!!

                        <div className="flex flex-row w-[80%] h-[30%]">
                            <div className='w-[30%] h-[80%] relative rounded-t-lg border-solid border-2 border-sky-500 '>
                                <Image src={bookItem.restaurant.pic}
                                    alt='Restaurant Information'
                                    fill={true}
                                    className='object-cover rounded-t-lg'/>
                            </div> 
                            <div className="flex flex-col">
                                <div className="text-lg">{bookItem.restaurant.name}</div>
                                <div className="text-lg">{bookItem.numOfGuests.toString()}</div>
                                <div className="text-lg">{bookItem.bookingDate}</div>
                                <div className="text-lg">{bookItem.user}</div>

                                <div className="left-[46%]  m-0">
                                    <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600" 
                                            onClick={()=>{setEdit(true); setEditingBook(bookItem); setDisable(true)}}
                                            disabled={isDisable}
                                            >Edit Booking</button>
                                </div>

                                <div className="left-[46%]  m-0">
                                    <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600" 
                                    onClick={()=>{setCancel(true); setEditingBook(bookItem); setDisable(true)}}
                                    disabled={isDisable}
                                    >cancel Booking</button>
                                </div>
                            </div>
                        </div>
                        
                    ))}
                </div>
            }
        </div>

    );
}
 
export default Reservations;