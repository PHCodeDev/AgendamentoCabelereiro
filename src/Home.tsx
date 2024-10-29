import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para navegação

const Home: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Sistema de Agendamentos</h1>
      <div className="flex flex-col space-y-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 transition"
          onClick={() => navigate('/novo-agendamento')}
        >
          Novo Agendamento
        </button>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-green-600 transition"
          onClick={() => navigate('/minhas-reservas')}
        >
          Minhas Reservas
        </button>
      </div>
    </div>
  );
};

export default Home;
