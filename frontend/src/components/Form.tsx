'use client'

import { Select , MenuItem , SelectChangeEvent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "./TextField";
import {useState,useEffect} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import getRestaurants from "@/libs/getRestaurants";

import {useDispatch} from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "@/interface";
import { addBooking} from "@/redux/features/bookSlice";

const Form = () => {
    const [resJsonReady,setRes] = useState(null);

    //all values
    const [name,setName] = useState<string>('');
    const [surname,setSurname] = useState<string>('');
    const [id,setId] = useState<string>('');
    const [selectedRes,setSelected] = useState<string>('')
    const [date,setDate]=useState<Dayjs|null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const createBooking = () =>{
        if(name && surname && id && selectedRes && date){
            const item:BookingItem={
                name:name,
                surname:surname,
                id:id,
                restaurant:selectedRes,
                date:dayjs(date).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item));
        }
    }

    const handleResChange=(event: SelectChangeEvent)=>{
        setSelected(event.target.value);
    }
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            setRes(res)
        }
        fetchData()
    },[])

    if(!resJsonReady) return (<div>loading</div>)

    return (  
        <div >
            <div className="flex flex-row m-3">
                <div className="flex flex-col m-4">
                        
                    <TextField title="First Name" onValChange={(value:string)=>{setName(value)}}></TextField>
                    <TextField title="Last Name" onValChange={(value:string)=>{setSurname(value)}}></TextField>
                    <TextField title="Id" onValChange={(value:string)=>{setId(value)}}></TextField>

                </div>

                <div className="flex flex-col m-4">
                
                    <div className="text-base p-3">Select Hospital</div>
                    <div className="p-3 mb-4">
                        <Select variant="standard" label="choose hospital" className="w-[280px]" value={selectedRes} onChange={handleResChange}>
                            {resJsonReady.data.map((resItem:Object)=>(
                                <MenuItem value={resItem.name}>{resItem.name}</MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="p-3 mt-4">Select Date</div>
                    <div className="p-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={date} onChange={(newDate)=>{setDate(newDate)}}></DatePicker>
                        </LocalizationProvider>
                    </div>
                </div>

            </div>
            <div className="left-[46%] absolute m-0">
                <button className="rounded-md bg-sky-600 text-white px-3 py-2  shadow-sm hover:bg-indigo-600"
                    onClick={createBooking}
                >Confirm Booking</button>

            </div>

           
        </div>
    );
}
 
export default Form;