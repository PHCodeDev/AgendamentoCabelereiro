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

  const barbeiros = [
    {
      nome: "Barbeiro 1",
      img: "https://i.ibb.co/ccFbYkc/image.png",
      bgColor: "bg-[#DCDCDD]",
    },
    {
      nome: "Barbeiro 2",
      img: "https://i.ibb.co/yg0XGyc/image-1.png",
      bgColor: "bg-[#DCDCDD]",
    },
    {
      nome: "Qualquer",
      img: "https://i.ibb.co/tMSf2Gw/Group-12.png",
      bgColor: "bg-[#DCDCDD]",
    },
  ];

  const escolhaBarbeiro = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitHorario = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    <div className="custom-background min-h-screen flex items-center">
      <button
        onClick={handleInicio}
        className="absolute top-10 left-10 p-2 bg-[#DCDCDD] text-black rounded transition hover:scale-105"
      >
        Início
      </button>
      <div className="mx-auto p-4 relative">
        {mensagemErro && <p className="text-red-500">{mensagemErro}</p>}
        {step === 1 && (
          <>
            <div className="flex flex-col items-center justify-center">
              <img
                className="h-[150px] w-[150px]"
                src="https://i.ibb.co/2S3jtXq/Group-3.png"
                alt="logo"
              />
              <h1 className="text-4xl font-bold text-white my-6 ">
                Novo Agendamento
              </h1>
              <form onSubmit={escolhaBarbeiro}>
                <div className="flex space-x-4">
                  {barbeiros.map((b) => (
                    <label
                      key={b.nome}
                      className={`p-4 transform hover:scale-105 px-20 rounded cursor-pointer flex flex-col items-center ${
                        barbeiro === b.nome ? "bg-[#FF9C09]" : ""
                      } ${b.bgColor}`}
                    >
                      <input
                        type="radio"
                        name="barbeiro"
                        value={b.nome}
                        checked={barbeiro === b.nome}
                        onChange={(e) => setBarbeiro(e.target.value)}
                        className="hidden"
                      />
                      <img
                        src={b.img}
                        alt={b.nome}
                        className="w-16 h-16 mb-2"
                      />
                      <span className="text-center font-bold text-black ">
                        {b.nome}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  className="botao bg-[#FF9C09] mt-8 mx-auto p-2 rounded"
                >
                  Próximo
                </button>
              </form>
            </div>
          </>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center text-white">
            <img
              className="h-[150px] w-[150px]"
              src="https://i.ibb.co/2S3jtXq/Group-3.png"
              alt="logo"
            />
            <h1 className="text-4xl font-bold text-white my-6 ">
              Escolha a Data e Horário
            </h1>
            <form
              className="flex flex-col items-center "
              onSubmit={handleSubmitHorario}
            >
              <label className="block mb-2">
                Selecione a Data:
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="mt-2 mx-4 p-2 border text-black border-gray-300 rounded"
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
                  className="mt-2 mx-4 p-2 text-black border border-gray-300 rounded"
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
              <div className="flex">
                <button
                  onClick={handleVoltar}
                  className=" botao mx-4 mt-8 p-2 bg-gray-500 text-black rounded"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="botao mx-4 mt-8 p-2 bg-[#FF9C09] text-black rounded"
                >
                  Próximo
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 3 && (
          <div className="text-white flex flex-col items-center">
            <img
              className="h-[150px] w-[150px]"
              src="https://i.ibb.co/2S3jtXq/Group-3.png"
              alt="logo"
            />
            <h1 className="text-4xl font-bold mb-4">
              Confirmação do Agendamento
            </h1>
            <div className="flex">
              <p className="mx-4">
                <strong>Barbeiro:</strong> {barbeiro}
              </p>
              <p className="mx-4">
                <strong>Data:</strong> {data}
              </p>
              <p className="mx-4">
                <strong>Horário:</strong> {horario}
              </p>
            </div>
            <form
              className="mt-4 items-center flex flex-col"
              onSubmit={handleFinalSubmit}
            >
              <label className="mb-2">
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-2 pr-44 pl-2 py-2 border border-gray-300 rounded text-left"
                  required
                  placeholder="Digite seu nome"
                />
              </label>

              <label className="mb-2 ">
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="mt-2 pr-44 pl-2 p-2 border border-gray-300 rounded"
                  required
                  placeholder="Digite seu telefone"
                />
              </label>
              <div className="flex flex-row text-black">
                <button
                  onClick={handleVoltar}
                  className="botao mt-4 p-2 mx-4 bg-gray-500 rounded"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="mt-4 font-bold mx-4 p-2 bg-[#FF9C09] rounded transition hover:scale-105"
                >
                  Finalizar Agendamento
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NovoAgendamento;
