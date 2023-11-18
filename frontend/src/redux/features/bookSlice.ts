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
        cancelBooking: (state)=>{
            //!fix this
            state.bookItems.shift();
        }
    }
})

export const {addBooking,cancelBooking} = bookslice.actions

export default bookslice.reducer