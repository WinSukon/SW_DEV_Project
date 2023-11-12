import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <div className='block ' >
        <Image src="/img/banner1.jpg"
        alt='cover' 
        fill={true} 
        objectFit="cover"></Image>
        <div className='relative top-[100px] z-[20] text-center text-6xl text-white bg-slate-600'>
          Find Your Best Dinner
        </div>
      </div>
    </main>
  )
}
