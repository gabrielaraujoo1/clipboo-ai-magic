
import React from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload do Vídeo",
    description: "Cole um link do YouTube ou faça upload de um vídeo do seu dispositivo.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    number: "02",
    title: "Processamento com IA",
    description: "Nossa IA analisa o conteúdo, transcreve o áudio e identifica os momentos-chave.",
    color: "from-indigo-500 to-violet-500"
  },
  {
    number: "03",
    title: "Edição Automática",
    description: "Criamos cortes precisos, adicionamos legendas e otimizamos para várias plataformas.",
    color: "from-violet-500 to-purple-500"
  },
  {
    number: "04",
    title: "Revisão e Download",
    description: "Visualize os resultados, faça ajustes se necessário e exporte para todas as redes sociais.",
    color: "from-purple-500 to-pink-500"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como o ClipBoo Funciona
          </h2>
          <p className="text-muted-foreground text-xl">
            Transforme vídeos longos em clipes prontos para viral em 4 passos simples.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-xl p-6 border border-border z-10 relative h-full flex flex-col">
                <div className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${step.color} mb-4`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-card rounded-xl overflow-hidden shadow-lg border border-border">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-7/12 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">
                  Veja o ClipBoo em ação
                </h3>
                <p className="text-muted-foreground mb-6">
                  Assista como é fácil transformar um vídeo de 30 minutos em clipes 
                  virais de 60 segundos, prontos para todas as suas redes sociais.
                </p>
                <div className="flex items-center text-primary">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse-soft"></div>
                  </div>
                  <span className="font-medium">Processando vídeos em tempo real</span>
                </div>
              </div>
              <div className="w-full md:w-5/12 bg-muted rounded-lg aspect-video flex items-center justify-center">
                <div className="text-muted-foreground">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1"></div>
                    </div>
                    <span>Preview do Demo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
