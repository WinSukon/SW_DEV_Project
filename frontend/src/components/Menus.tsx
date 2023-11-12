import Link from "next/link";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BookIcon from '@mui/icons-material/Book';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
const Menus = () => {
    return (  
        <div className="flex w-[5%] flex-col justify-around bg-[#FFCE50]">
            <div className="flex flex-col">
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
        

            <div className="flex flex-col">
                <Link href="" className="flex flex-row">
                    <LoginIcon></LoginIcon>
                    <div className="flex">Login</div>
                </Link>

                <Link href="" className="flex flex-row">
                    <LogoutIcon></LogoutIcon>
                    <div className="flex">Logout</div>
                </Link>
            </div>
            



        </div>
    );
}
 
export default Menus;