
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Video, Link as LinkIcon, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { processYoutubeVideo, processVideoFile, ProcessingStatus, ProcessingStep } from "@/services/videoProcessingService";
import ProcessingStatus from "@/components/ProcessingStatus";

const VideoUploader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadType, setUploadType] = useState<"link" | "file" | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUrlValid, setIsUrlValid] = useState<boolean | null>(null);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);

  const handleYoutubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples da URL do YouTube
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const isValid = youtubeRegex.test(youtubeUrl);
    
    if (!isValid) {
      setIsUrlValid(false);
      return;
    }
    
    setIsUrlValid(true);
    setIsLoading(true);
    
    try {
      // Process the YouTube video
      await processYoutubeVideo(youtubeUrl, (status) => {
        setProcessingStatus(status);
        
        // When completed, show a success toast
        if (status.step === ProcessingStep.COMPLETED) {
          toast.success("Vídeo processado com sucesso!");
          setIsLoading(false);
        }
        
        // If there's an error, show an error toast
        if (status.step === ProcessingStep.ERROR) {
          toast.error("Erro ao processar o vídeo. Tente novamente.");
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error("Erro ao processar o vídeo. Tente novamente.");
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Verificar se é um arquivo de vídeo
      if (!selectedFile.type.startsWith("video/")) {
        toast.error("Por favor, envie apenas arquivos de vídeo.");
        return;
      }
      
      // Verificar tamanho (100MB como exemplo)
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast.error("O arquivo é muito grande. O limite é 100MB.");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleFileClear = () => {
    setFile(null);
  };

  const handleFileSubmit = async () => {
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      // Process the file
      await processVideoFile(file, (status) => {
        setProcessingStatus(status);
        
        // When completed, show a success toast
        if (status.step === ProcessingStep.COMPLETED) {
          toast.success("Vídeo processado com sucesso!");
          setIsLoading(false);
        }
        
        // If there's an error, show an error toast
        if (status.step === ProcessingStep.ERROR) {
          toast.error("Erro ao processar o vídeo. Tente novamente.");
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error("Erro ao processar o vídeo. Tente novamente.");
      setIsLoading(false);
    }
  };

  const renderUploadOption = () => {
    // If we're currently processing a video, show the processing status
    if (processingStatus) {
      return <ProcessingStatus status={processingStatus} />;
    }

    if (uploadType === "link") {
      return (
        <div className="mt-6 animate-fade-up">
          <form onSubmit={handleYoutubeSubmit} className="space-y-4">
            <div>
              <label htmlFor="youtube-url" className="block text-sm font-medium mb-1">
                URL do YouTube
              </label>
              <div className="flex">
                <Input
                  id="youtube-url"
                  type="text"
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => {
                    setYoutubeUrl(e.target.value);
                    setIsUrlValid(null);
                  }}
                  className={`flex-1 ${
                    isUrlValid === false ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {isUrlValid === false && (
                <p className="text-red-500 text-sm mt-1">Por favor, insira uma URL do YouTube válida</p>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
                </>
              ) : (
                "Começar a Processar"
              )}
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setUploadType(null)} 
              className="w-full"
            >
              Voltar
            </Button>
          </form>
        </div>
      );
    }

    if (uploadType === "file") {
      return (
        <div className="mt-6 animate-fade-up">
          {!file ? (
            <div
              className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                Arraste e solte seu vídeo aqui, ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">
                Suporta MP4, MOV, AVI (máx. 100MB)
              </p>
              <input
                id="file-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Video className="h-10 w-10 text-primary mr-3" />
                  <div>
                    <p className="font-medium truncate max-w-[180px] sm:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleFileClear}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-4 space-y-2">
            <Button 
              onClick={handleFileSubmit} 
              disabled={!file || isLoading} 
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                "Enviar Vídeo"
              )}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setUploadType(null)} 
              className="w-full"
            >
              Voltar
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 animate-fade-up">
        <button
          className="flex flex-col items-center justify-center p-8 border rounded-lg hover:border-primary hover:shadow-md transition-all"
          onClick={() => setUploadType("link")}
        >
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <LinkIcon className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Vídeo do YouTube</h3>
          <p className="text-muted-foreground text-center">
            Cole o link de um vídeo do YouTube para processamento
          </p>
        </button>
        
        <button
          className="flex flex-col items-center justify-center p-8 border rounded-lg hover:border-primary hover:shadow-md transition-all"
          onClick={() => setUploadType("file")}
        >
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Upload de Arquivo</h3>
          <p className="text-muted-foreground text-center">
            Faça upload de um vídeo do seu dispositivo
          </p>
        </button>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Criar Novo Projeto</h2>
      <p className="text-muted-foreground mb-2">
        Escolha como você quer enviar seu vídeo
      </p>
      
      {renderUploadOption()}
    </div>
  );
};

export default VideoUploader;
