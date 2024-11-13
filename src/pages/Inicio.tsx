import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/back.css";
import "../components/botoes.css";
import "../components/slidedown.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center custom-background lg:w-full min-h-screen bg-cover bg-no-repeat">
      <img
        className="w-3/4 md:w-1/2 lg:w-auto mb-4"
        src="https://i.ibb.co/2S3jtXq/Group-3.png"
        alt="logo"
      />
      <h1 className="text-3xl font-bold mb-6 text-white my-8 text-center text-">
        Bem-vindo ao Sistema de Agendamentos
      </h1>
      <div className="flex mt-4">
        <button
          className="botao bg-[#FF9C09] mx-2"
          onClick={() => navigate("/novo-agendamento")}
        >
          <img src="https://i.ibb.co/MDhgt1k/Group-6.png" alt="" />
          Novo <br />
          Agendamento
        </button>
        <button
          className="botao bg-[#DCDCDD] mx-2"
          onClick={() => navigate("/minhas-reservas")}
        >
          <img src="https://i.ibb.co/FWQqDWk/Group-7.png" alt="" />
          Minhas
          <br /> Reservas
        </button>
      </div>
    </div>
  );
};

export default Home;
