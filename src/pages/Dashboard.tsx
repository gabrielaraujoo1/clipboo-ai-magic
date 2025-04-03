
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import VideoUploader from "@/components/VideoUploader";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Grid, Plus, Settings, Video } from "lucide-react";
import { ProcessingStep } from "@/services/videoProcessingService";

// Projetos de exemplo
const mockProjects = [
  {
    id: 1,
    title: "Introdução ao Produto",
    status: "Concluído",
    thumbnail: "https://source.unsplash.com/random/800x450?topic=tech",
    date: "Hoje às 14:30",
    stats: {
      duration: "5:24",
      clips: 7,
      views: 350
    }
  },
  {
    id: 2,
    title: "Tutorial de Marketing Digital",
    status: "Processando",
    thumbnail: "https://source.unsplash.com/random/800x450?topic=marketing",
    date: "Hoje às 10:15",
    stats: {
      duration: "12:38",
      clips: 0,
      views: 0
    }
  },
  {
    id: 3,
    title: "Resenha de Produto",
    status: "Erro",
    thumbnail: "https://source.unsplash.com/random/800x450?topic=product",
    date: "Ontem às 18:20",
    stats: {
      duration: "8:15",
      clips: 0,
      views: 0
    }
  }
];

const Dashboard = () => {
  const [showUploader, setShowUploader] = useState(false);
  const [projects, setProjects] = useState(mockProjects);

  // Function to add a new project when processing is complete
  const handleProcessingComplete = (thumbnailUrl: string, title: string = "Novo Projeto") => {
    const newProject = {
      id: projects.length + 1,
      title,
      status: "Concluído",
      thumbnail: thumbnailUrl,
      date: `Hoje às ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`,
      stats: {
        duration: "3:45",
        clips: 5,
        views: 0
      }
    };
    
    setProjects([newProject, ...projects]);
    setShowUploader(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-foreground">
                  clip<span className="text-primary">boo</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showUploader ? (
          <div>
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={() => setShowUploader(false)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para projetos
            </Button>
            <VideoUploader />
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Gerencie seus projetos e crie novos vídeos
                </p>
              </div>
              <Button 
                className="mt-4 sm:mt-0" 
                onClick={() => setShowUploader(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </div>

            <Tabs defaultValue="all">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">
                    <Grid className="h-4 w-4 mr-2" />
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="processing">
                    <Clock className="h-4 w-4 mr-2" />
                    Processando
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    <Video className="h-4 w-4 mr-2" />
                    Concluídos
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="relative">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <div 
                            className={`
                              text-xs font-medium px-2 py-1 rounded-full
                              ${project.status === "Concluído" ? "bg-green-100 text-green-800" : ""}
                              ${project.status === "Processando" ? "bg-blue-100 text-blue-800" : ""}
                              ${project.status === "Erro" ? "bg-red-100 text-red-800" : ""}
                            `}
                          >
                            {project.status}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 truncate">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {project.date}
                        </p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Duração: {project.stats.duration}</span>
                          <span>Clipes: {project.stats.clips}</span>
                          <span>Views: {project.stats.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    className="bg-card border border-dashed border-border rounded-xl overflow-hidden flex items-center justify-center h-64 cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setShowUploader(true)}
                  >
                    <div className="text-center p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-medium mb-1">Criar novo projeto</p>
                      <p className="text-muted-foreground text-sm">
                        Comece com um link do YouTube ou um arquivo
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="processing">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((p) => p.status === "Processando")
                    .map((project) => (
                      <div
                        key={project.id}
                        className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="relative">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {project.status}
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1 truncate">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {project.date}
                          </p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Duração: {project.stats.duration}</span>
                            <span>Clipes: {project.stats.clips}</span>
                            <span>Views: {project.stats.views}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((p) => p.status === "Concluído")
                    .map((project) => (
                      <div
                        key={project.id}
                        className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="relative">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {project.status}
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1 truncate">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {project.date}
                          </p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Duração: {project.stats.duration}</span>
                            <span>Clipes: {project.stats.clips}</span>
                            <span>Views: {project.stats.views}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
