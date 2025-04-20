import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import ondaAnimation from "./assets/ondas.json";
import navio1 from "./assets/navio1.json";
import navio2 from "./assets/navio2.json";
import navio3 from "./assets/navio3.json";
import pontuacoesJson from "./pontuacao.json";
import ilha from "./assets/ilha.png";
import polvo from "./assets/polvo.png";
import ancora from "./assets/ancora.png";

const animacoesNavios = {
  "HOLANDÊS VOADOR": navio1,
  "PÉROLA NEGRA": navio2,
  "PIRATAS DO CARIBE": navio3
};

export default function App() {
  const [pontuacoes, setPontuacoes] = useState([]);

  useEffect(() => {
    setPontuacoes(pontuacoesJson);
  }, []);

  return (
    <div className="bg-blue-900 min-h-screen p-10 relative overflow-hidden">
      {/* Elementos decorativos */}
      <img src={polvo} alt="Polvo" className="absolute top-10 left-10 w-32 h-32 z-0" />
      <img src={ancora} alt="Âncora" className="absolute top-10 right-10 w-32 h-32 z-0" />

      {/* Título principal */}
      <h1 className="text-center text-5xl font-bold text-white mb-16 relative z-10">
        CONQUISTE A ILHA
      </h1>

      <div className="space-y-20 relative z-10">
        {pontuacoes.map((barco, idx) => {
          const ondaLargura = 100;
          const numOndas = Math.floor((barco.pontos / 100) * 10);
          const ondaTotal = ondaLargura * numOndas;

          return (
            <div key={idx} className="relative h-40">
              {/* Nome do navio - agora acima da área de progresso */}
              <span className="absolute -top-8 left-0 w-full text-center font-bold text-3xl text-white uppercase tracking-wider mb-2">
                {barco.nome}
              </span>

              {/* Ondas */}
              <div
                className="absolute bottom-0 left-0 h-24 flex transition-all duration-700 ease-in-out"
                style={{ width: `${ondaTotal}px` }}
              >
                {Array.from({ length: numOndas }).map((_, i) => (
                  <div key={i} style={{ width: `${ondaLargura}px` }}>
                    <Lottie animationData={ondaAnimation} loop={true} />
                  </div>
                ))}
              </div>

              {/* Navio animado - ajustado para flutuar sobre as ondas */}
              <div
                className="absolute z-10 transition-all duration-700 ease-in-out"
                style={{
                  left: `${ondaTotal - 85}px`,
                  bottom: "20px", // Ajustado para ficar sobre as ondas
                  width: "120px",
                  height: "120px",
                  transform: 'translateY(-15px)' // Efeito de flutuação mais pronunciado
                }}
              >
                <Lottie animationData={animacoesNavios[barco.nome]} loop={true} />
              </div>

              {/* Ilha */}
              <div className="absolute right-0 bottom-2 z-20" style={{ width: "150px", height: "150px" }}>
                <img src={ilha} alt="Ilha" className="w-full h-full object-contain" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}