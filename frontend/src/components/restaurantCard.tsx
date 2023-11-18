import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function RestaurantCard({name,imgsrc}:{name:string,imgsrc:string}){
    
    return (
        <InteractiveCard>
            <div className='w-full h-[80%] relative rounded-t-lg'>
                <Image src={imgsrc}
                    alt='Restaurant Information'
                    fill={true}
                    className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[15%] p-[10px] text-black font-bold text-center my-2 relative'>{name}</div>
            {/* {
                dispatchRating? <div>
                <Rating className='mb-5 object-contain object-center' defaultValue={4} value={value} onClick={(e)=>{e.stopPropagation()}}onChange={(e,newValue)=> {setValue(newValue);
                e.stopPropagation;dispatchRating({type:'add', hosName:name,rating:newValue})}}/>
                </div> : ''
            } */}
        </InteractiveCard>
        
    );
}