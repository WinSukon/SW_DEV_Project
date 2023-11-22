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
import getBookings from "@/libs/getBookings";

const Reservations = ({profile,session}:{profile:Object,session?:Object}) => {
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
        setDisable(false)
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
    const findImgSrc=(resData:Array<Object>,resId:string):String=>{
        let src:String=''
        resData.map((res:Object)=>{
            if(res._id===resId){
                src=res.picture
            }
        })
        console.log('img',src)
        return src
    }
    //when finish updating change isEditing to false
    useEffect(()=>{
        setEdit(false)
        setDisable(false)
    },[bookItems])

    const [resJson,setRes] = useState(null);
    const [bookJson,setBook] = useState(null);
    const [resImg,setRS] = useState<Map<String,String>>(new Map<String,String>())

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            const bookings= await getBookings(session.user.token)
            console.log('b',bookings)
            console.log('r',res)
            console.log('br',bookings.data[0].restaurant)

            setRes(res)
            setBook(bookings)

            const m = new Map<String,String>()
            res.data.map((obj:Object)=>{
                m.set(obj._id,obj.picture)
            })
            setRS(m)
        }
        fetchData()
    },[])
    if(!bookJson) return (<div>loading</div>)

    return (
        <div className="flex flex-col">
            {isEditing ? <Form user={profile.data} bookItemtoEdit={editingBook}></Form> : null}
            {isCanceling ? 
                <div className="flex">
                    Are you sure you want to cancel?
                    <button onClick={cancelBookHandler}>Yes</button>
                    <button onClick={()=>{setCancel(false);setDisable(false)}}>No</button>
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
                            {/* {resImg.get(bookItem.restaurant._id) ? 
                            <div className='w-[30%] h-[80%] relative rounded-t-lg border-solid border-2 border-sky-500 '>
                                <Image src={resImg.get(bookItem.restaurant._id)}
                                    alt='Restaurant Information'
                                    fill={true}
                                    className='object-cover rounded-t-lg'/>
                            </div> 
                            :
                            null
                            } */}
                            <div className="w-[350px] h-[300px] rounded-lg shadow-lg bg-white flex items-center justify-center flex-col">
                                <div className=' w-full h-[80%] h-[80%] relative rounded-t-lg border-solid border-2 border-sky-500 '>
                                    <Image src={resImg.get(bookItem.restaurant._id)}
                                            alt='Restaurant Information'
                                            fill={true}
                                            className='object-cover rounded-t-lg'/>
                                </div> 
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

            {/* <div className="flex">from database</div>
            {bookJson.data.length===0 ?
                <div>No Vaccine Booking</div>
                :
                <div className='flex flex-col'>
                    {bookJson.data.map((bookItem:Object)=>(
                        //!add key in the div below
                            //!come back and style this!!!!!!

                        <div className="flex flex-row w-[80%] h-[30%]">
                            <div className='w-[30%] h-[80%] relative rounded-t-lg border-solid border-2 border-sky-500 '>
                                <Image src={bookItem.restaurant.picture}
                                    alt='Restaurant Information'
                                    fill={true}
                                    className='object-cover rounded-t-lg'/>
                            </div> 
                            <div className="flex flex-col">
                                <div className="text-lg">{bookItem.restaurant.name}</div>
                                <div className="text-lg">{bookItem.numOfGuests.toString()}</div>
                                <div className="text-lg">{bookItem.bookingDate}</div>
                                <div className="text-lg">{bookItem.user.name}</div>

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
            } */}
        </div>

    );
}
 
export default Reservations;