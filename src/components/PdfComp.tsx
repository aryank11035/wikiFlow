import * as pdfjsLib from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

export default function PdfComp({pdf} : {pdf : any}) {
 
  const [totalPages , setTotalPages] = useState(0)
  const [pdfDimension ,setPdfDimension] = useState({width : 0 , height : 0})
  const canvasLayer = useRef<HTMLCanvasElement | null>(null)
  const textLayer = useRef<HTMLDivElement | null>(null)
  const annotationLayer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    processingLoadTask(pdf)
  },[])


  const processingLoadTask = (source : string ) => {
    const loadingTask = pdfjsLib.getDocument(source)
    loadingTask.promise.then(
      (docProxy : pdfjsLib.PDFDocumentProxy) => {
        setTotalPages(docProxy.numPages)
        
        return docProxy.getPage(1)  
      }
    ).then(
      (page : pdfjsLib.PDFPageProxy) => {
        renderCanvasLayer(page)
        renderTextLayer(page)
 
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  const renderCanvasLayer = (page : pdfjsLib.PDFPageProxy) => {
     const viewport = page.getViewport({scale : 1.34})
        const { width , height  } = viewport
        setPdfDimension({width , height})

        const canvas = canvasLayer.current
        if(!canvas) return 

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')
        if(!context) return

        const renderContext = {
          canvas ,
          canvasContext : context ,
          viewport : viewport
        }
        return page.render(renderContext)
  }

  const renderTextLayer = ( page : pdfjsLib.PDFPageProxy ) => {
    const viewport = page.getViewport({scale : 1.34})
    const { scale } = viewport
    
    const textDiv = textLayer.current
    if(!textDiv) return 
    textDiv.style.setProperty("--total-scale-factor", `${scale}`);
    

    page.getTextContent().then((content) =>{
      const renderTask = new pdfjsLib.TextLayer({
        container : textDiv ,
        textContentSource : content ,
        viewport : viewport.clone({dontFlip : true})
      })
      return renderTask.render()
    })
  }
 
  

  return (
    <div className="pdf_layers nodrag border border-neutral-300 shadow-2xl">

    <div
      className="pdf_layers_canvas"
      style={{
        width: pdfDimension.width,
        height: pdfDimension.height,
      }}
    >
      <canvas ref={canvasLayer} className=""/>
      
      <div ref={textLayer} className="pdf_layers_text " />
    </div>
    </div>
  );
}