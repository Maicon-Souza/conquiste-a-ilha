import React, { useEffect, useState, useRef } from "react";
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
  const [animatedPontuacoes, setAnimatedPontuacoes] = useState([]);
  const ondaLargura = 85;
  const maxOndas = 7;
  const animationRef = useRef(null);

  useEffect(() => {
    // Inicia com valores zerados para animação
    setAnimatedPontuacoes(pontuacoesJson.slice(0, 7).map(b => ({ ...b, pontos: 0 })));
    
    // Dispara a animação após um pequeno delay
    animationRef.current = setTimeout(() => {
      setAnimatedPontuacoes(pontuacoesJson.slice(0, 7));
    }, 300);
    
    return () => clearTimeout(animationRef.current);
  }, []);

  const calcularLargura = (pontos) => {
    return Math.floor((pontos / 100) * maxOndas) * ondaLargura;
  };

  return (
    <div className="bg-blue-900 min-h-screen p-5 relative overflow-hidden">
      {/* Elementos decorativos */}
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

      {/* Título principal */}
      <h1 className="titulo-pirata text-center">
        CONQUISTE A ILHA
      </h1>

      {/* Container das equipes */}
      <div className="space-y-8 relative z-10">
        {animatedPontuacoes.map((barco, idx) => {
          const ondaTotal = calcularLargura(barco.pontos);
          const numOndas = Math.ceil(ondaTotal / ondaLargura);

          return (
            <div key={idx} className="relative h-32">
              {/* Barra de progresso animada */}
              <div
                className="absolute bottom-6 left-0 h-18 flex barra-progresso"
                style={{ width: `${ondaTotal}px` }}
              >
                {Array.from({ length: numOndas }).map((_, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      width: `${ondaLargura}px`,
                      flexShrink: 0
                    }}
                  >
                    <Lottie animationData={ondaAnimation} loop={true} />
                  </div>
                ))}
              </div>

              {/* Navio animado - agora com a mesma transição das ondas */}
              <div
                className="absolute z-10 barco-animado"
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

              {/* Ilha */}
              <div 
                className="absolute right-0 bottom-1 z-20" 
                style={{ width: "125px", height: "125px" }}
              >
                <img src={ilha} alt="Ilha" className="w-full h-full object-contain" />
              </div>

              {/* Nome do navio */}
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