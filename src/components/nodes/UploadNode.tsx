import { useState } from "react"
import PdfComp from "../PdfComp"

export const UploadNode = ({data} : {data : any}) => {

    const pdf = data?.pdf

    if(!pdf) return 


    return(
        <div className='relative bg-neutral-100  border border-neutral-300 rounded-b-xs  shadow-2xl '>
            <PdfComp pdf={pdf}/>
        </div>
    )
}