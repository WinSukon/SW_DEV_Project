'use client'
import {useState,useEffect} from 'react'
//components
import Form from "./Form";
import Image from 'next/image';
//redux
import { useAppSelector , AppDispatch} from "@/redux/store";
import {addBooking, cancelBooking ,resetBooking} from "@/redux/features/bookSlice";
import {useDispatch} from 'react-redux';
//interface
import { BookingItem } from '@/interface';
//libs
import deleteBooking from '@/libs/deleteBooking';
import getRestaurants from "@/libs/getRestaurants";
import getUserBookings from "@/libs/getBookings";
import getAllBookings from '@/libs/getAllBookings';
//mui
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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
        if(editingBook) {

            cancel(editingBook)
            //!cancel in db
            const restaurant=resJson.data.find((resItem:Object)=>{
                if(resItem._id==editingBook.restaurant._id) return resItem
            })
            const todelete= {
                id:editingBook._id,
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
        console.log(bookItems)
    },[bookItems])

    const [resJson,setRes] = useState(null);
    const [bookJson,setBook] = useState(null);
    const [resImg,setRS] = useState<Map<String,String>>(new Map<String,String>())


    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            
            const bookings =  await getAllBookings();
            console.log('pro',profile)
            console.log('sess',session.user)
            // if(profile.data.role==='user'){
            //     bookings= await getUserBookings(session.user.token)

            // }
            // else if(profile.data.role==='admin'){
            //     bookings= await getAllBookings()

            // }

            setRes(res)
            setBook(bookings)
            console.log(bookings)

            const m = new Map<String,String>()
            res.data.map((obj:Object)=>{
                m.set(obj._id,obj.picture)
            })
            setRS(m)
            console.log(resImg.size)
            
            //revalidate bookSlice state
            dispatch(resetBooking())
            bookings.data.map((obj:Object)=>{

                console.log(resImg.get(obj.restaurant?._id))
                const imgS:String=findImgSrc(res.data,obj.restaurant?._id)
                console.log('src form func',imgS)

                const bookItem:BookingItem={
                    _id:obj._id,//generated for use in redux
                    bookingDate: obj.bookingDate.toString(),
                    numOfGuests: obj.numOfGuests,
                    user: obj.user.name,
                    restaurant:{
                        _id:obj.restaurant?._id,
                        name:obj.restaurant?.name,
                        picture: imgS
                    }  
                }
                if(profile.data.role==='user' && obj.user._id===profile.data._id){
                    dispatch(addBooking(bookItem))
                }

                else if(profile.data.role==='admin' ){
                    dispatch(addBooking(bookItem))

                }
            })
        }
        fetchData()
        console.log('out',resImg.size)

    },[])
    if(!bookJson) return (<div >loading</div>)

    return (
        <div className="flex flex-col justify-center item-center ">
            {isEditing ? 
            <div className='z-40 fixed top-[0] left-[0] w-[100%] h-[100vh] bg-black bg-opacity-20 flex justify-center items-center flex-col'>
                <div className='flex flex-col relative p-[32px] bg-white rounded-lg'>
                    <Form user={profile.data} bookItemtoEdit={editingBook}></Form> 

                    <div className="left-[46%]  m-0">
                        <button className="bg-[#FFCE50] absolute top-[8px] right-[16px] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75" 
                                onClick={()=>{setEdit(false); setDisable(false)}}
                                ><CloseIcon></CloseIcon></button>
                    </div>
                </div>
            </div> : null}
            {isCanceling ? 
                <div className="z-40 fixed top-[0] left-[0] w-[100%] h-[100vh] bg-black bg-opacity-20 flex justify-center items-center flex-col">
                    <div className='flex relative p-[32px] bg-white rounded-lg'>
                        <div className="flex flex-col">
                            <div className='m-5 text-lg'>Are you sure you want to cancel?</div>
                            <div className="flex flex-row justify-around">
                                <button className='bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75'
                                onClick={cancelBookHandler}><CheckIcon></CheckIcon>Yes</button>
                                <button className='bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75'
                                onClick={()=>{setCancel(false);setDisable(false)}}><CloseIcon></CloseIcon>No</button>
                            </div>
                        </div>
                    </div>

                </div>
                
                :null

            }
            {bookItems.length===0?
                <div className='font-bold text-lg flex flex-col justify-center items-center m-4 '>No Reservation</div>
                :
                <div className='flex flex-col'>
                        {bookItems.map((bookItem:BookingItem)=>(
                            <div className="flex flex-row shadow bg-white rounded-md my-3 mx-4">
                                <Image src={bookItem.restaurant.picture}
                                                alt='Restaurant Information'
                                                width={0} height={0} sizes="100vw"
                                                className='rounded-lg w-[30%] bg-black'/>

                                <div className="flex flex-col px-10 py-[25px] mb-3 w-[100vh] relative content-start items-start">
                                    <div className="text-lg">Booked At : {bookItem.restaurant.name}</div>
                                    <div className="text-lg">Guests : {bookItem.numOfGuests.toString()}</div>
                                    <div className="text-lg">Date : {bookItem.bookingDate.slice(0, 10)}</div>
                                    <div className="text-lg">Name : {bookItem.user}</div>


                                    
                                </div>
                                <div className="flex flex-col justify-around md:flex-row">
                                    <div className="mx-2 my-0 ">
                                        <button className="bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75" 
                                                onClick={()=>{setEdit(true); setEditingBook(bookItem); setDisable(true)}}
                                                disabled={isDisable}
                                                ><EditIcon></EditIcon></button>
                                    </div>

                                    <div className=" mx-2 my-0">
                                        <button className="bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75" 
                                        onClick={()=>{setCancel(true); setEditingBook(bookItem); setDisable(true)}}
                                        disabled={isDisable}
                                        ><DeleteForeverIcon></DeleteForeverIcon></button>
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