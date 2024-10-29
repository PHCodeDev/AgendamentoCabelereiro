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

    // Consultar as reservas no Supabase
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <button
        onClick={handleInicio}
        className="absolute top-4 left-4 p-2 bg-yellow-500 text-white rounded"
      >
        Início
      </button>

      <h1 className="text-3xl font-bold mb-6">Minhas Reservas</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Número do Usuário
          </label>
          <input
            type="tel"
            value={numeroUsuario}
            onChange={(e) => setNumeroUsuario(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 transition"
        >
          Conferir Reservas
        </button>
      </form>

      {mensagemErro && <p className="text-red-500 mt-4">{mensagemErro}</p>}

      {reservaEncontrada && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h2 className="text-xl font-bold">Reserva Encontrada!</h2>
          <p>
            <strong>Data:</strong> {reservaEncontrada.data}
          </p>
          <p>
            <strong>Horário:</strong> {reservaEncontrada.horario}
          </p>
          <p>
            <strong>Barbeiro:</strong> {reservaEncontrada.barbeiro}
          </p>
        </div>
      )}
    </div>
  );
};

export default MinhasReservas;
