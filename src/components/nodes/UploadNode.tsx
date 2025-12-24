import PdfComp from "../PdfComp"

export const UploadNode = ({data} : {data : any}) => {

    const pdf = data?.pdf

    if(!pdf) return 

    const url = URL.createObjectURL(pdf)

    return(
      <>
      
      <PdfComp pdf={url}/>
      </>
        
    )
}