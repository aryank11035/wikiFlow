import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FlowWithProvider from './components/provider/flow-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FlowWithProvider />
  </StrictMode>,
)
