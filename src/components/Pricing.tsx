
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    description: "Para criadores iniciantes",
    price: "R$ 0",
    period: "para sempre",
    features: [
      "5 vídeos por mês",
      "Processamento de até 3 minutos",
      "Transcrição automática",
      "Formato 9:16 (TikTok, Reels)",
      "Marca d'água ClipBoo",
      "Sem exportação em HD"
    ],
    limitations: [
      "Sem tradução e dublagem",
      "Sem compartilhamento direto",
      "Sem edição manual dos cortes"
    ],
    buttonText: "Começar Grátis",
    buttonVariant: "outline",
    popular: false
  },
  {
    name: "Pro",
    description: "Para criadores em crescimento",
    price: "R$ 29,90",
    period: "por mês",
    features: [
      "25 vídeos por mês",
      "Processamento de até 15 minutos",
      "Transcrição em alta precisão",
      "Todos os formatos de redes sociais",
      "Sem marca d'água",
      "Exportação em HD",
      "Legendas personalizáveis",
      "Edição manual dos cortes"
    ],
    limitations: [
      "Tradução para apenas 3 idiomas"
    ],
    buttonText: "Assinar Pro",
    buttonVariant: "default",
    popular: true
  },
  {
    name: "Enterprise",
    description: "Para equipes e empresas",
    price: "R$ 99,90",
    period: "por mês",
    features: [
      "Vídeos ilimitados",
      "Processamento sem limite de duração",
      "Transcrição ultra precisa",
      "Todos os formatos + personalizado",
      "Sem marca d'água",
      "Exportação em 4K",
      "Legendas totalmente personalizáveis",
      "Edição avançada dos cortes",
      "Tradução e dublagem para 20+ idiomas",
      "Integração com Google Drive/Dropbox",
      "API para integração com outras ferramentas"
    ],
    limitations: [],
    buttonText: "Contato Comercial",
    buttonVariant: "default",
    popular: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha o Plano Ideal para Você
          </h2>
          <p className="text-muted-foreground text-xl">
            Planes flexíveis para criadores de todos os tamanhos, desde iniciantes até empresas de mídia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-card rounded-xl overflow-hidden border ${
                plan.popular ? "border-primary shadow-lg relative" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Mais Popular
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-muted-foreground mb-5">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                
                <Link to="/dashboard">
                  <Button 
                    variant={plan.buttonVariant === "outline" ? "outline" : "default"} 
                    className="w-full mb-6"
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
                
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-start">
                      <X className="h-5 w-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-3">Tem dúvidas sobre nossos planos?</h3>
          <p className="text-muted-foreground mb-6">
            Entre em contato com nossa equipe para encontrar a solução ideal para o seu caso de uso específico.
          </p>
          <Button variant="outline">Falar com Especialista</Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
