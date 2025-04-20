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
      {/* Elementos decorativos - Polvo maior no canto superior direito */}
      <img 
        src={polvo} 
        alt="Polvo" 
        className="absolute top-5 right-5 w-40 h-40 z-0" 
      />
      
      {/* Âncora maior no canto inferior esquerdo */}
      <img 
        src={ancora} 
        alt="Âncora" 
        className="absolute bottom-5 left-5 w-40 h-40 z-0" 
      />

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

              {/* Navio animado */}
              <div
                className="absolute z-10 transition-all duration-700 ease-in-out"
                style={{
                  left: `${ondaTotal - 85}px`,
                  bottom: "20px",
                  width: "120px",
                  height: "120px",
                  transform: 'translateY(-15px)'
                }}
              >
                <Lottie animationData={animacoesNavios[barco.nome]} loop={true} />
              </div>

              {/* Ilha */}
              <div className="absolute right-0 bottom-2 z-20" style={{ width: "150px", height: "150px" }}>
                <img src={ilha} alt="Ilha" className="w-full h-full object-contain" />
              </div>

              {/* Nome do navio - agora embaixo no começo das ondas */}
              <span className="absolute bottom-2 left-0 font-bold text-2xl text-white uppercase tracking-wider">
                {barco.nome}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}