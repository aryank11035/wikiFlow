import { X } from "lucide-react"

export const CloseBar = () => {
    return (
        <div className="w-full bg-neutral-300 h-fit rounded-t-xs border border-neutral-400 flex justify-between items-center inset-shadow-sm  inset-shadow-neutral-200/50">
            <p className="text-white pl-2 text-xs font-bold text-shadow-lg">en.wikipedia.org</p>
            <div className="text-white p-2 text-center flex items-center justify-center hover:text-neutral-500 duration-300 h-full cursor-pointer">
                <X size={15}/>
            </div>
        </div>
    )
}