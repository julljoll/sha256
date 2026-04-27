import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ConsignacionPage from './pages/ConsignacionPage';
import PrccPage from './pages/PrccPage';
import AdquisicionPage from './pages/AdquisicionPage';
import AnalisisPage from './pages/AnalisisPage';
import InformePage from './pages/InformePage';
import DisposicionJudicialPage from './pages/DisposicionJudicialPage';
import DisposicionFinalPage from './pages/DisposicionFinalPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="consignacion" element={<ConsignacionPage />} />
        <Route path="prcc" element={<PrccPage />} />
        <Route path="adquisicion" element={<AdquisicionPage />} />
        <Route path="analisis" element={<AnalisisPage />} />
        <Route path="informe" element={<InformePage />} />
        <Route path="disposicion-judicial" element={<DisposicionJudicialPage />} />
        <Route path="disposicion-final" element={<DisposicionFinalPage />} />
      </Route>
    </Routes>
  );
}

export default App;

