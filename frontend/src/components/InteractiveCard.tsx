'use client'

export default function InteractiveCard({children} : {children:React.ReactNode}){


    function OnMouseAction(event:React.SyntheticEvent){
        if(event.type=='mouseover'){
            event.currentTarget.classList.remove('shadow-lg')
            event.currentTarget.classList.add('shadow-2xl')

            event.currentTarget.classList.remove('bg-white')
            event.currentTarget.classList.add('bg-neutral-200')
        } else {
            event.currentTarget.classList.remove('shadow-2xl')
            event.currentTarget.classList.add('shadow-lg')

            event.currentTarget.classList.remove('bg-neutral-200')
            event.currentTarget.classList.add('bg-white')
        }
    }
    return(
        <div className='w-[350px] h-[300px] rounded-lg shadow-lg bg-white flex items-center justify-center flex-col' 
         onMouseOver={(e)=>OnMouseAction(e)} 
        onMouseOut={(e)=>OnMouseAction(e)}>
            {children}
        </div>
        
    );
}