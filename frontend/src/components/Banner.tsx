import Image from 'next/image'

const Banner = () => {
    return ( 
        <div className='flex w-[95%] flex-col relative' >
            <Image src="/img/banner1.jpg"
                    fill={true}
                    alt="banner"></Image>
            <div className='z-[20] text-center'>
                <h1 className='text-6xl '>
                    Find Your Best Dinner
                </h1>
            </div>
      </div>
    );
}
 
export default Banner;