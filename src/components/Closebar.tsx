
import { X } from "lucide-react"
import { useDeleteNode } from "../helpers/delete-node"

export const CloseBar = ({id } : {id :string}) => {

   const deleteNode = useDeleteNode()

    return (
        <div className="w-full bg-neutral-300 h-fit rounded-t-xs border border-neutral-400 flex justify-between items-center inset-shadow-sm  inset-shadow-neutral-200/50">
            <p className="text-white pl-1 text-xs font-bold text-shadow-lg">en.wikipedia.org</p>
            <button onClick={() => deleteNode(id)} className="text-white p-1 text-center flex items-center justify-center hover:text-neutral-500 duration-300 h-full cursor-pointer">
                <X size={15}/>
            </button>
        </div>
    )
}