
import React from "react";
import { 
  Upload, 
  FileText, 
  Scissors, 
  Subtitles, 
  Share, 
  Video, 
  Languages, 
  CheckCircle 
} from "lucide-react";

const features = [
  {
    title: "Upload Simples",
    description: "Cole um link do YouTube ou faça upload manualmente do seu vídeo em segundos.",
    icon: Upload,
    color: "from-blue-500 to-sky-600"
  },
  {
    title: "Transcrição Automática",
    description: "Nossa IA converte seu áudio em texto com precisão excepcional.",
    icon: FileText,
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Cortes Inteligentes",
    description: "Identificamos os melhores momentos e removemos pausas automaticamente.",
    icon: Scissors,
    color: "from-orange-500 to-amber-600"
  },
  {
    title: "Legendas Dinâmicas",
    description: "Legendas personalizáveis e estilizadas que engajam o espectador.",
    icon: Subtitles,
    color: "from-yellow-500 to-amber-600"
  },
  {
    title: "Formatos para Redes Sociais",
    description: "Ajuste automático para TikTok (9:16), Instagram (1:1) e YouTube (16:9).",
    icon: Video,
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "Compartilhamento Fácil",
    description: "Publique diretamente nas suas redes ou baixe para personalizar ainda mais.",
    icon: Share,
    color: "from-indigo-500 to-purple-600"
  },
  {
    title: "Tradução & Dublagem",
    description: "Traduza e duble seus vídeos para outros idiomas mantendo seu tom de voz.",
    icon: Languages,
    color: "from-violet-500 to-purple-600"
  },
  {
    title: "Qualidade Profissional",
    description: "Resultados com padrão profissional sem conhecimento técnico necessário.",
    icon: CheckCircle,
    color: "from-cyan-500 to-blue-600"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Potencialize Seus Vídeos com IA
          </h2>
          <p className="text-muted-foreground text-xl">
            Nossa tecnologia de inteligência artificial avançada transforma o processo de edição de vídeo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card hover:scale-[1.02] group"
            >
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
