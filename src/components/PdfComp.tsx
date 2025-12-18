import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from '/AryanKateResume.pdf'
export default function PdfComp({pdf} : {pdf : any}) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  console.log(pdf)

  return (
    <div>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={false}/>
      </Document>
    </div>
  );
}