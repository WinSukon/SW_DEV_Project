import Image from 'next/image'

const Banner = () => {
    return ( 
        <div className="p-1.5 m-0 w-screen h-[70vh] font-bold relative">
            <Image src="/img/banner1.jpg"
            fill={true}
            alt="banner"
            className='object-cover'/>
            <div className="relative left-10 top-[68%] z-20 text-[100px] text-white ">
                <h1>
                    Find Your Best Dinner
                 </h1>
            </div>
        </div>
    );
}
 
export default Banner;