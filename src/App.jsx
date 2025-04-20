import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import ondaAnimation from "./assets/ondas.json";
import navio1 from "./assets/navio1.json";
import navio2 from "./assets/navio2.json";
import navio3 from "./assets/navio3.json";
import navio4 from "./assets/navio4.json";
import navio5 from "./assets/navio5.json";
import navio6 from "./assets/navio6.json";
import navio7 from "./assets/navio7.json";
import pontuacoesJson from "./pontuacao.json";
import ilha from "./assets/ilha.png";
import polvo from "./assets/polvo.png";
import ancora from "./assets/ancora.png";
import './App.css';

const animacoesNavios = {
  "HOLANDÊS VOADOR": navio1,
  "PÉROLA NEGRA": navio2,
  "PIRATAS DO CARIBE": navio3,
  "NAVIO FANTASMA": navio4,
  "SEREIA DO MAR": navio5,
  "TUBARÃO BRANCO": navio6,
  "CORSÁRIO NEGRO": navio7
};

export default function App() {
  const [pontuacoes, setPontuacoes] = useState([]);

  useEffect(() => {
    setPontuacoes(pontuacoesJson.slice(0, 7));
  }, []);

  return (
    <div className="bg-blue-900 min-h-screen p-5 relative overflow-hidden">
      <img 
        src={ancora} 
        alt="Âncora" 
        className="absolute top-4 left-4 w-28 h-28 z-0" 
      />
      <img 
        src={polvo} 
        alt="Polvo" 
        className="absolute top-2 right-4 w-28 h-28 z-0" 
      />

      <h1 className="titulo-pirata text-center">
        CONQUISTE A ILHA
      </h1>

      <div className="space-y-8 relative z-10">
        {pontuacoes.map((barco, idx) => {
          const ondaLargura = 85;
          const numOndas = Math.floor((barco.pontos / 100) * 7);
          const ondaTotal = ondaLargura * numOndas;

          return (
            <div key={idx} className="relative h-32">
              <div
                className="absolute bottom-6 left-0 h-18 flex transition-all duration-700 ease-in-out"
                style={{ width: `${ondaTotal}px` }}
              >
                {Array.from({ length: numOndas }).map((_, i) => (
                  <div key={i} style={{ width: `${ondaLargura}px` }}>
                    <Lottie animationData={ondaAnimation} loop={true} />
                  </div>
                ))}
              </div>

              <div
                className="absolute z-10 transition-all duration-700 ease-in-out"
                style={{
                  left: `${ondaTotal - 80}px`,
                  bottom: "30px",
                  width: "105px",
                  height: "105px",
                  transform: 'translateY(10px)'
                }}
              >
                <Lottie animationData={animacoesNavios[barco.nome]} loop={true} />
              </div>

              <div 
                className="absolute right-0 bottom-1 z-20" 
                style={{ width: "125px", height: "125px" }}
              >
                <img src={ilha} alt="Ilha" className="w-full h-full object-contain" />
              </div>

              <span className="nome-barco absolute bottom-0 left-1 text-md text-white">
                {barco.nome}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}