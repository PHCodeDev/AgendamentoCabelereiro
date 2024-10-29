import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NovoAgendamento from './pages/NovoAgendamento'; // Importe seu componente de agendamento
import MinhasReservas from './pages/MinhasReservas'; // Importe seu componente de reservas
import Obrigado from './pages/Obrigado'; // Importe o componente da página de agradecimento

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo-agendamento" element={<NovoAgendamento />} />
        <Route path="/minhas-reservas" element={<MinhasReservas />} />
        <Route path="/obrigado" element={<Obrigado />} /> {/* Rota para a página de agradecimento */}
      </Routes>
    </Router>
  );
};

export default App;
