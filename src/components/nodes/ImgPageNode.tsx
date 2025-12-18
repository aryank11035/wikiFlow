import { useState } from "react"
import { TitleNodeHandles } from "./TitlePageNode"
import { X } from "lucide-react"
import { useDeleteNode } from "../../helpers/delete-node"

export const ImagePageNode = ({id , data } : {id : string , data :any}) => {

    const src = data?.data
  
    const deleteNode = useDeleteNode()

    if(!src) return

    const [ hover ,onHover] = useState<boolean>(false)

    return (
        <div className="realtive border border-neutral-100/10 rounded-sm" 
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            {
                hover && (
                    <button onClick={() => deleteNode(id)} className="absolute top-1 right-1 text-white p-1  hover:text-neutral-900 hover:bg-white duration-300  cursor-pointer size-20 bg-neutral-500/50 w-fit h-fit rounded-2xl">
                        <X size={20} />
                    </button>
                )
            }

            <img
                id='the-iframe'
                src={src}   
                className="rounded-sm "
            />

            <TitleNodeHandles hover={hover} onHover={onHover}/>
        </div>
    )
}