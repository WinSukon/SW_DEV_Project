import styles from './topmenu.module.css'
import Link from 'next/link';

export default function TopMenuItem({title,pageRef}:{title:string, pageRef:string}){
    return (
        <Link className="w-[150px] text-center h-[50px] relative center my-auto font-sans text-xl 
        text-black pt-[9px] font-bold rounded-md px-2 mx-10 hover:bg-amber-400" href={pageRef}>
            {title}
        </Link>
    );
}