import React from "react";
import { useNavigate } from "react-router-dom";

const Obrigado: React.FC = () => {
  const navigate = useNavigate();

  const handleVerReserva = () => {
    navigate("/minhas-reservas");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center">
        <div className="container mx-auto p-4 text-center ">
          <h1 className="text-2xl font-bold mb-4">
            Obrigado pelo seu Agendamento!
          </h1>
          <p>Seu agendamento foi realizado com sucesso.</p>
          <button
            onClick={handleVerReserva}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Ver Minha Reserva
          </button>
        </div>
    </div>
  );
};

export default Obrigado;
