import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ConsignacionPage from './pages/ConsignacionPage';
import AdquisicionPage from './pages/AdquisicionPage';
import AnalisisPage from './pages/AnalisisPage';
import InformePage from './pages/InformePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="consignacion" element={<ConsignacionPage />} />
        <Route path="adquisicion" element={<AdquisicionPage />} />
        <Route path="analisis" element={<AnalisisPage />} />
        <Route path="informe" element={<InformePage />} />
      </Route>
    </Routes>
  );
}

export default App;
