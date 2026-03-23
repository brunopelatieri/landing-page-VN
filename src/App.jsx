import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VNPromotora    from './VNPromotora.jsx'
import VNPromotoraCLT from './VNPromotoraCLT.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal — Crédito Consignado INSS */}
        <Route path="/"                          element={<VNPromotora />} />

        {/* Segunda página — Crédito Consignado CLT */}
        <Route path="/credito-consignado-clt"    element={<VNPromotoraCLT />} />

        {/* Qualquer rota não encontrada redireciona para home */}
        <Route path="*"                          element={<VNPromotora />} />
      </Routes>
    </BrowserRouter>
  )
}
