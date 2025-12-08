import { useState } from "react"
import { TitleNodeHandles } from "./TitlePageNode"

export const ImagePageNode = ({id , data } : {id : string , data :any}) => {

    const src = data?.data
  

    if(!src) return

    const [ hover ,onHover] = useState<boolean>(false)

    return (
        <div className="realtive" 
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            <img
                id='the-iframe'
                src={src}   
                className="rounded-sm "
            />

            <TitleNodeHandles hover={hover} onHover={onHover}/>
        </div>
    )
}