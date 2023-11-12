import Image from 'next/image'

const Banner = () => {
    return ( 
        <div className='flex w-[80%] h-[100%]' >
            {/* <Image src="/img/banner1.jpg"
            alt='cover' 
            fill={true} 
            objectFit="cover"></Image> */}
            <div className='z-[20] text-center'>
                <h1 className='text-6xl'>
                    Find Your Best Dinner
                </h1>
            </div>
      </div>
    );
}
 
export default Banner;