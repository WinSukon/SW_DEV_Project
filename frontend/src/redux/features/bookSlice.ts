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

            const duplicate = state.bookItems.find(obj=>{
                return !(
                    (obj.date!==action.payload.date) ||
                    (obj.name!==action.payload.name) ||
                    (obj.id!==action.payload.id) ||
                    (obj.surname!==action.payload.surname)||
                    (obj.restaurant!==action.payload.restaurant)
                )})
            if(!duplicate){
                state.bookItems.push(action.payload)
            }

        },
        cancelBooking: (state,action:PayloadAction<BookingItem>)=>{
            //!fix this
            const remainItem = state.bookItems.filter(obj=>{
                return (
                    (obj.date!==action.payload.date) ||
                    (obj.name!==action.payload.name) ||
                    (obj.id!==action.payload.id) ||
                    (obj.surname!==action.payload.surname)||
                    (obj.restaurant!==action.payload.restaurant)
                )
            })
            state.bookItems=remainItem

        }
    }
})

export const {addBooking,cancelBooking} = bookslice.actions

export default bookslice.reducer