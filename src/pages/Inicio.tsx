import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/back.css";
import "../components/botoes.css"
import "../components/slidedown.css"

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center custom-background w-full min-h-screen bg-cover bg-no-repeat">
      <img src="https://i.ibb.co/2S3jtXq/Group-3.png" alt="" />
      <h1 className="text-3xl font-bold mb-6 text-white my-8">
        Bem-vindo ao Sistema de Agendamentos
      </h1>
      <div className="flex mt-4">
        <button
          className="botao bg-[#FF9C09] mx-3"
          onClick={() => navigate("/novo-agendamento")}
        >
          <img src="https://i.ibb.co/MDhgt1k/Group-6.png" alt="" />
          Novo  <br/>Agendamento
        </button>
        <button
          className="botao bg-[#DCDCDD] mx-3"
          onClick={() => navigate("/minhas-reservas")}
        >
            <img src="https://i.ibb.co/FWQqDWk/Group-7.png" alt="" />
          Minhas<br/> Reservas
        </button>
      </div>
    </div>
  );
};

export default Home;
