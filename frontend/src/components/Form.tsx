'use client'
import {useState,useEffect} from 'react';
import { BookingItem } from "@/interface";
//redux
import {useDispatch} from 'react-redux';
import { AppDispatch,useAppSelector } from "@/redux/store";
import { addBooking} from "@/redux/features/bookSlice";
//libs
import { postBooking } from '@/libs/postBooking';
import getRestaurants from "@/libs/getRestaurants";

//mui
import dayjs, {Dayjs} from 'dayjs';
import { Select , MenuItem , SelectChangeEvent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const Form = ({user,isEditing}:{user:Object,isEditing:Boolean}) => {
    //all values for booking interface
    const [date,setDate]=useState<Dayjs|null>(null);
    const [numOfGuests,setNum] =useState<number>(0);
    const [selectedResId,setSelected] = useState<string>('')

    //create booking in redux and db
    const dispatch = useDispatch<AppDispatch>();
    const currentBookings = useAppSelector((state)=>state.bookSlice.bookItems)

    const createBooking = () =>{
        if(numOfGuests && date && selectedResId && user.name ){
            if(currentBookings.length===3){
                alert("Can't book more than 3 reservations. Please remove a reservation before booking!")
            }
            else{
                const duplicate = currentBookings.find(obj=>{
                    return !(
                        (obj.bookingDate!==dayjs(date).format("YYYY/MM/DD")) ||
                        (obj.numOfGuests!==numOfGuests) ||
                        (obj.restaurant!==selectedResId) 
                    )})
                const restaurant=resJson.data.find((resItem:Object)=>{
                        if(resItem._id==selectedResId) return resItem
                    }
                )
                if(!duplicate){
                    const item:BookingItem={
                        numOfGuests:numOfGuests,
                        restaurant:restaurant.name,
                        bookingDate:dayjs(date).format("YYYY/MM/DD"),
                        user : user.name
                    }
                    dispatch(addBooking(item));
                    console.log('dispatch done')
                    //post new booking to db
                    postBooking(date.toDate(),numOfGuests,user,restaurant)
                }
                else{
                    alert("Can't book a duplicate reservation. You booked it already!")
                }
            }
        }
        else{
            alert('Please Fill all the fields before submitting!')
        }
    }

    const editBooking=()=>{

    }
    //handle form state
    const handleResChange=(event: SelectChangeEvent)=>{
        setSelected(event.target.value);
    }

    const [resJson,setRes] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            setRes(res)
        }
        fetchData()
    },[])

    const handleSubmit = (isEditing:Boolean)=>{
        isEditing ? editBooking : createBooking
    }

    if(!resJson) return (<div>loading</div>)

    return (  
        <form className="flex flex-col" action={()=>{handleSubmit(isEditing)}}>
            <div className="p-3 mt-4">Select Date</div>
            <div className="p-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={date} onChange={(newDate)=>{setDate(newDate)}}></DatePicker>
                </LocalizationProvider>
            </div>

            <div className="text-base p-3">Select Restaurant</div>
            <div className="p-3 mb-4">
                <Select variant="standard" label="choose hospital" className="w-[280px]" value={selectedResId} onChange={handleResChange}>
                    {resJson.data.map((resItem:Object)=>(
                        <MenuItem value={resItem._id}>{resItem.name}</MenuItem>
                    ))}
                </Select>
            </div>

           
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
           {isEditing ?
           <div className="flex  m-0">
                <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600"
                            type="submit"
                >Edit Booking</button>
           </div> 
           :
           <div className="flex  m-0">
                <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600"
                         type="submit"
                >Confirm Booking</button>
            </div>}
            
        </form>
    );
}
 
export default Form;