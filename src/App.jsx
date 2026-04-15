import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import CoinDetail from './pages/CoinDetail/CoinDetail';

// De App-functie bepaalt welke pagina je ziet op basis van de link in je browser.
function App() {
  return (
    <Router>
      <Routes>
        {/* De hoofdpagina: het dashboard */}
        <Route path="/" element={<Dashboard />} />
        {/* De detailpagina voor een specifieke munt, met een eigen ID in de link */}
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </Router>
  )
}

export default App;
