import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import NovoAgendamento from './pages/NovoAgendamento';
import MinhasReservas from './pages/MinhasReservas';
import Obrigado from './pages/Obrigado'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/novo-agendamento" element={<NovoAgendamento />} />
        <Route path="/minhas-reservas" element={<MinhasReservas />} />
        <Route path="/obrigado" element={<Obrigado />} /> {/* Rota para a página de agradecimento */}
      </Routes>
    </Router>
  );
};

export default App;
