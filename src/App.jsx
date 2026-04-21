import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VNPromotora    from './VNPromotora.jsx'
import VNPromotoraCLT from './VNPromotoraCLT.jsx'
import VNPromotoraSIAPE from './VNPromotoraSIAPE.jsx'
import ObrigadoCLT    from './ObrigadoCLT.jsx'
import ObrigadoSIAPE  from './ObrigadoSIAPE.jsx'
import ObrigadoQ      from './ObrigadoQ.jsx'
import Obrigado      from './Obrigado.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal — Crédito Consignado INSS */}
        <Route path="/"                          element={<VNPromotora />} />

        {/* Segunda página — Crédito Consignado CLT */}
        <Route path="/credito-consignado-clt"    element={<VNPromotoraCLT />} />
        <Route path="/credito-consignado-siape" element={<VNPromotoraSIAPE />} />

        <Route path="/obrigado-clt"              element={<ObrigadoCLT />} />
        <Route path="/obrigado-siape"            element={<ObrigadoSIAPE />} />
        <Route path="/obrigado-q"                element={<ObrigadoQ />} />
        <Route path="/obrigado"                element={<Obrigado />} />

        {/* Qualquer rota não encontrada redireciona para home */}
        <Route path="*"                          element={<VNPromotora />} />
      </Routes>
    </BrowserRouter>
  )
}
