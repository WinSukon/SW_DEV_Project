'use client'
import {useState,useEffect} from 'react';
import getRestaurants from "@/libs/getRestaurants";

import {useDispatch} from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "@/interface";
import { addBooking} from "@/redux/features/bookSlice";

import getUserProfile from "@/libs/getUserProfile";
//next auth
import {useSession} from 'next-auth/react'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//mui
import dayjs, {Dayjs} from 'dayjs';
import { Select , MenuItem , SelectChangeEvent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const Form = () => {
    const {data:session}=useSession()
    //all values
    const [date,setDate]=useState<Dayjs|null>(null);
    const [numOfGuests,setNum] =useState<number>(0);
    const [selectedRes,setSelected] = useState<string>('')


    const dispatch = useDispatch<AppDispatch>();

    //create booking in redux
    const createBooking = () =>{
        if(numOfGuests && date && selectedRes ){
            const item:BookingItem={
                numOfGuests:numOfGuests,
                restaurant:selectedRes,
                bookingDate:dayjs(date).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item));
        }
        else{
            alert('Please Fill all the fields before submitting!')
        }
    }

    //handle form state
    const handleResChange=(event: SelectChangeEvent)=>{
        setSelected(event.target.value);
    }

    const [resJsonReady,setRes] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            setRes(res)
        }
        fetchData()
    },[])

    if(!resJsonReady) return (<div>loading</div>)

    return (  
        <form action={} className="flex flex-col">
            <div className="p-3 mt-4">Select Date</div>
            <div className="p-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={date} onChange={(newDate)=>{setDate(newDate)}}></DatePicker>
                </LocalizationProvider>
            </div>

            <div className="text-base p-3">Select Restaurant</div>
            <div className="p-3 mb-4">
                <Select variant="standard" label="choose hospital" className="w-[280px]" value={selectedRes} onChange={handleResChange}>
                    {resJsonReady.data.map((resItem:Object)=>(
                        <MenuItem value={resItem.name}>{resItem.name}</MenuItem>
                    ))}
                </Select>
            </div>

                     
            <div className="">
                <div className="p-3 text-base">Number of people</div>
                <div className="p-2">
                    <input className="p-1 rounded ring-1 ring-inset ring-gray-400 text-md leading-6 indent-2 placeholder:text-gray-400"
                    type="number" 
                    placeholder="Number of people"
                    name="Number of people"
                    value={numOfGuests}
                    onChange={(e)=>{
                        setNum(Number(e.target.value)); 
                    }}></input>
                </div>
            </div>

            <div className="left-[46%] absolute m-0">
                <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600"
                    onClick={createBooking}
                >Confirm Booking</button>

            </div>
        </form>
    );
}
 
export default Form;