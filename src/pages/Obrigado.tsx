import React from "react";
import { useNavigate } from "react-router-dom";

const Obrigado: React.FC = () => {
  const navigate = useNavigate();

  const handleVerReserva = () => {
    navigate("/minhas-reservas");
  };

  return (
    <div className=" min-h-screen flex items-center custom-background text-white">
      <div className="flex flex-col items-center mx-auto p-4 text-center ">
        <img
          className="w-3/4 md:w-1/2 lg:w-auto mb-4"
          src="https://i.ibb.co/2S3jtXq/Group-3.png"
          alt="logo"
        />
        <h1 className="text-2xl font-bold mb-4">
          Obrigado pelo seu Agendamento!
        </h1>
        <p>Seu agendamento foi realizado com sucesso.</p>
        <button
          onClick={handleVerReserva}
          className="mt-4 p-2 bg-[#FF9C09] text-black font-bold transition hover:scale-105 rounded"
        >
          Ver Minha Reserva
        </button>
      </div>
    </div>
  );
};

export default Obrigado;
