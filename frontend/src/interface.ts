export interface BookingItem{
    _id:string,//generated for use in redux
    bookingDate: string,
    numOfGuests: number,
    user: String,
    restaurant:{
        _id:string,
        name:string,
        pic:string
    }
}