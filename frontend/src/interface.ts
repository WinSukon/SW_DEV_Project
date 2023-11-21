export interface BookingItem{
    _id:String,
    bookingDate: string,
    numOfGuests: number,
    user: String,
    restaurant:{
        _id:string,
        name:string,
        pic:string
    }
}