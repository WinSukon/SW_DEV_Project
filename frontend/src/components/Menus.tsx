import Link from "next/link";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BookIcon from '@mui/icons-material/Book';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Menus = () => {
    return (  
        <div className="flex w-[5%] flex-col">
          
            <Link href="/restaurants" className="flex flex-row">
                <RestaurantMenuIcon></RestaurantMenuIcon>
                <div className="flex">Restaurants</div>
            </Link>

            <Link href="/mybooking" className="flex flex-row">
                <BookIcon></BookIcon>
                <div className="flex">Reservation</div>
            </Link>

            <Link href="/Booking" className="flex flex-row">
                <AddBoxIcon></AddBoxIcon>
                <div className="flex">Booking</div>
            </Link>


        </div>
    );
}
 
export default Menus;