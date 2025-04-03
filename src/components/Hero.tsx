
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden dark:bg-black">
      <div className="absolute inset-0 hero-gradient opacity-10 dark:opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
            <span className="inline-block py-1">Transforme vídeos longos em</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 inline-block">
              clipes virais automaticamente
            </span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-up animation-delay-100">
            ClipBoo usa IA avançada para transcrever, cortar e otimizar seus vídeos
            para TikTok, Shorts e Reels - tudo com apenas alguns cliques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-200">
            <Link to="/dashboard">
              <Button size="lg" className="btn-gradient">
                Comece gratuitamente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button variant="outline" size="lg">
                Como funciona
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 max-w-5xl mx-auto relative animate-fade-up animation-delay-300">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 blur-[100px] -z-10 rounded-full"></div>
            <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden shadow-xl">
              <div className="relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xl font-semibold text-white p-4 backdrop-blur-sm bg-black/30 rounded-lg">
                    Preview da Interface
                  </div>
                </div>
                <img 
                  src="/lovable-uploads/8f371f1f-dbc6-40e8-984f-dfe7566fbdee.png" 
                  alt="ClipBoo Logo" 
                  className="w-full h-full object-contain backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-muted-foreground flex flex-wrap justify-center gap-8 animate-fade-up animation-delay-400">
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-green-400"></div>
              <span>+5.000 usuários ativos</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-blue-400"></div>
              <span>+50.000 vídeos processados</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-purple-400"></div>
              <span>98% de taxa de satisfação</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
