'use client'
import {useState,useEffect} from 'react';
import { BookingItem } from "@/interface";
//redux
import {useDispatch} from 'react-redux';
import { AppDispatch,useAppSelector } from "@/redux/store";
import { addBooking,updateBooking} from "@/redux/features/bookSlice";
//libs
import { postBooking } from '@/libs/postBooking';
import getRestaurants from "@/libs/getRestaurants";
import genid from '@/libs/genIdforObject';
import { updateBookingDB } from '@/libs/updateBookingDB';
import getAllBookings from '@/libs/getAllBookings';

//mui
import dayjs, {Dayjs} from 'dayjs';
import { Select , MenuItem , SelectChangeEvent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const Form = ({user,bookItemtoEdit}:{user:Object,bookItemtoEdit?:BookingItem}) => {
    //all values for booking interface
    const [date,setDate]=useState<Dayjs|null>(null);
    const [numOfGuests,setNum] =useState<number>(0);
    const [selectedResId,setSelected] = useState<string>('')
    
    const [myBookingsAmount,setMybookAmount] =useState<number>(0)

    //create booking in redux and db
    const dispatch = useDispatch<AppDispatch>();
    const currentBookings = useAppSelector((state)=>state.bookSlice.bookItems)
    console.log(currentBookings)
    const createBooking = () =>{
        if(numOfGuests>=0 && date && selectedResId && user.name ){
            if(myBookingsAmount>=3){
                alert("Can't book more than 3 reservations. Please remove a reservation before booking!")
            }
            else{
                if(date.toDate().getTime()<=Date.now()){
                    alert("Date is invalid (can't book in the past)")

                }
                else{
                    const duplicate = findDupeBooking()
                    const restaurant=resJson.data.find((resItem:Object)=>{
                            if(resItem._id==selectedResId) return resItem
                        }
                    )
                    console.log('res',restaurant)

                    if(!duplicate){
                        const item:BookingItem={
                            _id:genid(),
                            numOfGuests:numOfGuests,
                            bookingDate:dayjs(date).format("YYYY/MM/DD"),
                            user : user.name,
                            restaurant:{
                                _id:selectedResId,
                                name:restaurant.name,
                                picture:restaurant.picture
                            }
                        }
                        //post new booking to db
                        postBooking(date.toDate(),numOfGuests,user,restaurant._id)

                        dispatch(addBooking(item));
                        setMybookAmount(myBookingsAmount+1)

                    }
                    else{
                        alert("Can't book a duplicate reservation. You booked it already!")
                    }
                }
                
            }
        }
        else{
            alert('Please Fill all the fields before submitting!')
        }
    }

    const editBooking=()=>{
        if (bookItemtoEdit){
            if(numOfGuests>=0 && date && selectedResId && user.name ){
                const duplicate = findDupeBooking()
                const restaurant=resJson.data.find((resItem:Object)=>{
                    if(resItem._id==selectedResId) return resItem
                })

        
                if(!duplicate){
                    const item:BookingItem={
                        _id:bookItemtoEdit._id,
                        numOfGuests:numOfGuests,
                        bookingDate:dayjs(date).format("YYYY/MM/DD"),
                        user : bookItemtoEdit.user,
                        restaurant:{
                            _id:selectedResId,
                            name:restaurant.name,
                            picture:restaurant.picture
                        }
                    }
                    //update data in redux
                    dispatch(updateBooking(item));
                    //!update data in db
                    const restoFind=resJson.data.find((resItem:Object)=>{
                        if(resItem._id==bookItemtoEdit.restaurant._id) return resItem
                    })
        
                    const id=bookItemtoEdit._id
                    const after={
                        
                        date:date.toDate(),
                        numGuest:numOfGuests,
                        res:restaurant}

                    updateBookingDB(id,after)
                }
                else{
                    alert("Can't book a duplicate reservation. You booked it already!")
                }
            }
            else{
                alert('Please Fill all the fields before submitting!')
            }
        }
    }

    //handle form 
    const findDupeBooking = ()=>{
        return currentBookings.find(obj=>{
            return !(
                (obj.bookingDate!==dayjs(date).format("YYYY/MM/DD")) ||
                (obj.numOfGuests!==numOfGuests) ||
                (obj.restaurant._id!==selectedResId) 
            )})
    }

    const handleResChange=(event: SelectChangeEvent)=>{
        setSelected(event.target.value);
    }

    const [resJson,setRes] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            setRes(res)

            const bookings =  await getAllBookings();
            let count:number=0;
            bookings.data.map((obj:Object)=>{
                if(obj.user._id===user._id){
                    count+=1
                }
            })
            setMybookAmount(count)
        }
        fetchData()
        //setup val if going to edit
        if(bookItemtoEdit){
            setDate(dayjs(bookItemtoEdit.bookingDate))
            setNum(bookItemtoEdit.numOfGuests)
            setSelected(bookItemtoEdit.restaurant._id)
        }

    },[])

    const handleSubmit = (bookItemtoEdit:any)=>{
        bookItemtoEdit ? editBooking() : createBooking()
    }

    if(!resJson) return (<div>loading</div>)

    return (  
        <form className="flex flex-col" action={()=>{handleSubmit(bookItemtoEdit)}}>
            <div className="p-3 mt-4 text-gray-600  mb-2 text-sm lg:text-base xl:text-lg">Select Date</div>
            <div className="p-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={date} onChange={(newDate)=>{setDate(newDate)}}></DatePicker>
                </LocalizationProvider>
            </div>

            <div className=" p-3 text-gray-600  mb-2  text-sm lg:text-base xl:text-lg">Select Restaurant</div>
            <div className="p-3 mb-4">
                <Select variant="standard" label="choose hospital" className="w-[280px]" value={selectedResId} onChange={handleResChange}>
                    {resJson.data.map((resItem:Object)=>(
                        <MenuItem value={resItem._id} selected={selectedResId===resItem._id}>{resItem.name}</MenuItem>
                    ))}
                </Select>
            </div>
     
            <div className="p-3  text-gray-600  mb-2  text-sm lg:text-base xl:text-lg">Number of guests</div>
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
           {bookItemtoEdit ?
          
                <button className="bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75"
                            type="submit"
                >Confirm Edit</button>
          
           :
           
                <button className="bg-[#FFCE50] hover:bg-[#FFCE50] my-4 font-bold text-black py-2 px-4 rounded-md shadow shadow-violet-600/25 hover:shadow-violet-600/75"
                         type="submit"
                >Confirm Booking</button>
            }
            
        </form>
    );
}
 
export default Form;