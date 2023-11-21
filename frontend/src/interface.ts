export interface BookingItem{
    _id:string,
    bookingDate: string,
    numOfGuests: number,
    user: String,
    restaurant:{
        _id:string,
        name:string,
        pic:string
    }
}