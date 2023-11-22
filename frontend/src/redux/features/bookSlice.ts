import {createSlice , PayloadAction} from '@reduxjs/toolkit';
import { BookingItem } from '@/interface';

type BookState = {
    bookItems:BookingItem[]
}

const initialState:BookState = {
    bookItems:[]
}

export const bookslice = createSlice({
    name : 'book',
    initialState,
    reducers:{
        resetBooking: (state)=>{
            const newBooking:BookingItem[] = []
            state.bookItems=newBooking
        },
        addBooking: (state,action:PayloadAction<BookingItem>)=>{
            state.bookItems.push(action.payload)
        },
        cancelBooking: (state,action:PayloadAction<BookingItem>)=>{
            const remainItem = state.bookItems.filter(obj=>{
                return (
                    (obj.bookingDate!==action.payload.bookingDate) ||
                    (obj.numOfGuests!==action.payload.numOfGuests) ||
                    (obj.restaurant._id!==action.payload.restaurant._id) 
                )
            })
            state.bookItems=remainItem
        },
        updateBooking: (state,action:PayloadAction<BookingItem>)=>{
            const newBooking:BookingItem[] = []
            state.bookItems.forEach(bookItem=>{
                if(bookItem._id===action.payload._id){
                    newBooking.push(action.payload)
                }
                else{
                    newBooking.push(bookItem)
                }
            })
            state.bookItems=newBooking
        }
    }
})

export const {addBooking,cancelBooking,updateBooking,resetBooking} = bookslice.actions

export default bookslice.reducer