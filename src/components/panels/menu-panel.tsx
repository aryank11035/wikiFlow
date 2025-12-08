import { FaWikipediaW } from "react-icons/fa";

export const MenuPanel = () => {
    return (
        <div className='h-80 w-15 border border-neutral-300 rounded-sm inset-shadow-sm  inset-shadow-neutral-300/80 backdrop-blur-2xl flex flex-col items-center p-2 gap-4'>
            <div className="w-full  flex items-center justify-center">
                <img src="/Logo.svg" alt="logo" className="w-full h-full"/>
            </div>
            <div className="w-full flex items-center jusifty-center ">
                <FaWikipediaW className="size-7 w-full"/>
            </div>
        </div>
    )
}