import Image from 'next/image'

const Banner = () => {
    return ( 
        <div className='flex w-[95%]  relative bg-[#FFEDC0]' >
            <div className="flex w-[100%] h-[76%] absolute">
                <Image src="/img/banner1.jpg"
                        fill={true}
                        alt="banner"></Image>
            </div>
           
            <div className='left-6 top-[58%] z-[20] text-center  relative'>
                <h1 className=" text-[96px] leading-normal text-white font-[400] font-['Allerta-Stencil']">
                    Find Your Best Dinner
                </h1>
            </div>
      </div>
    );
}
 
export default Banner;