export interface BookingItem{
    _id:string,//generated for use in redux
    bookingDate: string,
    numOfGuests: number,
    user: string,
    restaurant:{
        _id:string,
        name:string,
        picture:string
    }
}

