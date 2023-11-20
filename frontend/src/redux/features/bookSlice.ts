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
        addBooking: (state,action:PayloadAction<BookingItem>)=>{
            state.bookItems.push(action.payload)
        },
        cancelBooking: (state,action:PayloadAction<BookingItem>)=>{
            const remainItem = state.bookItems.filter(obj=>{
                return (
                    (obj.bookingDate!==action.payload.bookingDate) ||
                    (obj.numOfGuests!==action.payload.numOfGuests) ||
                    (obj.restaurant!==action.payload.restaurant) 
                )
            })
            state.bookItems=remainItem
        }
    }
})

export const {addBooking,cancelBooking} = bookslice.actions

export default bookslice.reducer