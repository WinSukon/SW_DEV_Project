import Image from 'next/image';
import getRestaurant from '@/libs/getRestaurant';

export default async function HospitalDetailPage({params}:{params:{rid:string}}){
    
    const resDetail = await getRestaurant(params.rid)

    return (
        <main className="text-center my-10">
            <div className="flex flex-row bg-slate-100 px-10 py-5">
                <Image src={resDetail.data.picture} 
                alt="Hospital Picture"
                width={0} height={0} sizes="100vw"
                className='rounded-lg w-[30%] bg-black'/>
            <div className='flex flex-col'>
                <div className='text-xl font-bold mx-5'>{resDetail.data.name}</div>
                <div className='text-lg mx-5 text-left'>Description</div>
                <div className='text-md mx-5 text-left'>Address: {resDetail.data.address}</div>
                {/* <div className='text-md mx-5 text-left'>District:{resDetail.data.district}</div> */}
                <div className='text-md mx-5 text-left'>Province: {resDetail.data.province}</div>
                <div className='text-md mx-5 text-left'>Postal Code:{resDetail.data.postalcode}</div>
                <div className='text-md mx-5 text-left'>Tel: {resDetail.data.tel}</div>
                </div>
            </div>
        </main>
    )
}