import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
const Menus = () => {
    return (  
        // <div className="flex w-[15%] flex-col p-5 bg-[#FFCE50] decoration-transparent">
        //     <div className="bottom">
        //         <Link href="/restaurants" className="flex flex-row">
        //             <RestaurantMenuIcon></RestaurantMenuIcon>
        //             <div>Restaurants</div>
        //         </Link>

        //         <Link href="/booking" className="flex flex-row">
        //             <BookIcon></BookIcon>
        //             <div>Reservation</div>
        //         </Link>

        //         <Link href="/Booking" className="flex flex-row">
        //             <AddBoxIcon></AddBoxIcon>
        //             <div>Booking</div>
        //         </Link>
        //     </div>
        

        //     <div className="bottom-0">
        //         <Link href="" className="flex flex-row">
        //             <LoginIcon></LoginIcon>
        //             <div>Login</div>
        //         </Link>

        //         <Link href="" className="flex flex-row">
        //             <LogoutIcon></LogoutIcon>
        //             <div>Logout</div>
        //         </Link>
        //     </div>
        // </div>
        <div className="h-16 bg-[#FFCE50] fixed z-50 inset-x-0 top-0 flex flex-row justify-center shadow-lg">
            <TopMenuItem title='Booking' pageRef='/booking'/>
            <div className="border border-black my-2"></div>
            <TopMenuItem title='Restaurants' pageRef='/restaurants'/>
            <div className="border border-black my-2"></div>
            <TopMenuItem title='Reservation' pageRef='/mybooking'/>
            
        </div>
    );
}
 
export default Menus;