import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

interface Reserva {
  barbeiro: string;
  data: string;
  horario: string;
}

const MinhasReservas: React.FC = () => {
  const navigate = useNavigate();
  const [numeroUsuario, setNumeroUsuario] = useState("");
  const [reservaEncontrada, setReservaEncontrada] = useState<Reserva | null>(
    null
  );
  const [mensagemErro, setMensagemErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemErro("");

    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .eq("telefone", numeroUsuario)
      .order("data", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Erro ao buscar reservas:", error);
      setMensagemErro("Erro ao buscar reservas. Tente novamente mais tarde.");
      setReservaEncontrada(null);
    } else if (data && data.length > 0) {
      setReservaEncontrada({
        barbeiro: data[0].barbeiro,
        data: data[0].data,
        horario: data[0].horario,
      });
    } else {
      setReservaEncontrada(null);
      setMensagemErro(
        "Nenhuma reserva encontrada para esse número de usuário."
      );
    }
  };

  const handleInicio = () => {
    navigate("/");
  };

  return (
    <div className="custom-background flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleInicio}
        className="absolute top-10 left-10 p-2 bg-[#DCDCDD] text-black rounded transition hover:scale-105"
      >
        Início
      </button>

      <img
        className="h-[150px]"
        src="https://i.ibb.co/2S3jtXq/Group-3.png"
        alt=""
      />
      <h1 className="text-white text-4xl mt-4 font-bold mb-6">
        Minhas Reservas
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[330px] lg:w-full max-w-md bg-[#DCDCDD] p-6 rounded-lg shadow-md shadow-[#2c2c2c50] mt-4"
      >
        <div className="mb-4">
          <label className="block text-[18px] text-[#111] text-sm font-bold mb-2">
            Digite seu número abaixo
          </label>
          <input
            type="tel"
            value={numeroUsuario}
            onChange={(e) => setNumeroUsuario(e.target.value)}
            className="shadow-md my-1 shadow-[#8b8b8b] rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-[#DCDCDD]"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#FF9C09] text-[#111] font-bold py-2 px-4 rounded shadow hover:scale-105 transition"
        >
          Conferir Reservas
        </button>
      </form>
      {reservaEncontrada && (
        <div className="ficha p-4 bg-[#FF9C09] rounded w-[330px] lg:w-full max-w-md ">
          <h2 className="text-xl font-bold">Reserva Encontrada!</h2>
          <div className="flex justify-around text-[15px]">
            <p>
              <strong>Data:</strong>{" "}
              {new Date(reservaEncontrada.data).toLocaleDateString("pt-BR")}
            </p>
            <p>
            <strong>Horário:</strong> {reservaEncontrada.horario.slice(0, 5)}
            </p>
            <p>
              <strong>Barbeiro:</strong> {reservaEncontrada.barbeiro}
            </p>
          </div>
        </div>
      )}

      {mensagemErro && <p className="text-red-500 mt-4">{mensagemErro}</p>}

      {reservaEncontrada && <div></div>}
    </div>
  );
};

export default MinhasReservas;
