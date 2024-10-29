import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const NovoAgendamento: React.FC = () => {
  const navigate = useNavigate();
  const [barbeiro, setBarbeiro] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [horario, setHorario] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [mensagemErro, setMensagemErro] = useState<string>("");

  const barbeiros = ["Barbeiro 1", "Barbeiro 2", "Qualquer"];

  const handleSubmitBarbeiro = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitHorario = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Calcular o início e o fim da semana atual
    const hoje = new Date();
    const inicioDaSemana = new Date(hoje);
    const fimDaSemana = new Date(hoje);

    inicioDaSemana.setDate(hoje.getDate() - hoje.getDay());

    fimDaSemana.setDate(hoje.getDate() + (6 - hoje.getDay()));

    // Consultar o número de agendamentos na semana atual
    const { data: reservas, error: erroConsulta } = await supabase
      .from("agendamentos")
      .select("*")
      .eq("telefone", telefone)
      .gte("data", inicioDaSemana.toISOString().split("T")[0])
      .lte("data", fimDaSemana.toISOString().split("T")[0]);

    if (erroConsulta) {
      console.error("Erro ao consultar reservas:", erroConsulta);
      setMensagemErro(
        "Erro ao verificar agendamentos. Tente novamente mais tarde."
      );
      return;
    }

    // Verificar se já existem agendamentos nesta semana
    if (reservas && reservas.length >= 1) {
      setMensagemErro("Você já possui um agendamento nesta semana.");
      return;
    }

    // Inserir o novo agendamento
    const { data: insertedData, error } = await supabase
      .from("agendamentos")
      .insert([{ barbeiro, data, horario, nome, telefone }]);

    if (error) {
      console.error("Erro ao salvar agendamento:", error);
      setMensagemErro(
        "Erro ao salvar agendamento. Tente novamente mais tarde."
      );
    } else {
      console.log("Agendamento salvo com sucesso:", insertedData);
      navigate("/obrigado");
    }
  };

  const handleVoltar = () => {
    setStep(step - 1);
  };

  const handleInicio = () => {
    navigate("/");
  };

  const generateHorarios = () => {
    const horarios: string[] = [];
    for (let i = 8; i <= 17; i++) {
      const horaFormatada = `${i < 10 ? "0" : ""}${i}:00`;
      horarios.push(horaFormatada);
    }
    return horarios;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center">
        <div className="mx-auto p-4 relative">
          <button
            onClick={handleInicio}
            className="top-4 left-4 p-2 bg-yellow-500 text-white rounded"
          >
            Início
          </button>
          {mensagemErro && <p className="text-red-500">{mensagemErro}</p>}
          {step === 1 && (
            <>
              <div className="flex flex-col justify-center">
                  <h1 className="text-2xl font-bold mb-4">Novo Agendamento</h1>
                  <form onSubmit={handleSubmitBarbeiro}>
                    <label className="block mb-2">
                      Escolha o barbeiro:
                      <select
                        value={barbeiro}
                        onChange={(e) => setBarbeiro(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded"
                        required
                      >
                        <option value="">Selecione</option>
                        {barbeiros.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="submit"
                      className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                      Próximo
                    </button>
                  </form>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold mb-4">Escolha a Data e Horário</h1>
              <form onSubmit={handleSubmitHorario}>
                <label className="block mb-2">
                  Selecione a Data:
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    max={
                      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                </label>
                <label className="block mb-2">
                  Selecione o Horário:
                  <select
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Selecione</option>
                    {generateHorarios().map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                  Confirmar Agendamento
                </button>
              </form>
              <button
                onClick={handleVoltar}
                className="mt-4 p-2 bg-gray-500 text-white rounded"
              >
                Voltar
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <h1 className="text-2xl font-bold mb-4">
                Confirmação do Agendamento
              </h1>
              <p>
                <strong>Barbeiro:</strong> {barbeiro}
              </p>
              <p>
                <strong>Data:</strong> {data}
              </p>
              <p>
                <strong>Horário:</strong> {horario}
              </p>
              <form onSubmit={handleFinalSubmit}>
                <label className="block mb-2">
                  Nome:
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </label>
                <label className="block mb-2">
                  Telefone:
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                  Finalizar Agendamento
                </button>
              </form>
              <button
                onClick={handleVoltar}
                className="mt-4 p-2 bg-gray-500 text-white rounded"
              >
                Voltar
              </button>
            </>
          )}
        </div>
    </div>
  );
};

export default NovoAgendamento;
