import React from "react";
import { ProcessingStep, type ProcessingStatus as ProcessingStatusType } from "@/services/videoProcessingService";
import { Progress } from "@/components/ui/progress";
import { FileVideo, Upload, FileText, Scissors, Subtitles, Download, CheckCircle, X, Loader2 } from "lucide-react";

interface ProcessingStatusProps {
  status: ProcessingStatusType;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ status }) => {
  const getStepIcon = (step: ProcessingStep) => {
    switch (step) {
      case ProcessingStep.DOWNLOADING:
        return <Download className="h-6 w-6" />;
      case ProcessingStep.UPLOADING:
        return <Upload className="h-6 w-6" />;
      case ProcessingStep.TRANSCRIBING:
        return <FileText className="h-6 w-6" />;
      case ProcessingStep.ANALYZING:
        return <Loader2 className="h-6 w-6 animate-spin" />;
      case ProcessingStep.EDITING:
        return <Scissors className="h-6 w-6" />;
      case ProcessingStep.EXPORTING:
        return <Download className="h-6 w-6" />;
      case ProcessingStep.COMPLETED:
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case ProcessingStep.ERROR:
        return <X className="h-6 w-6 text-red-500" />;
      default:
        return <FileVideo className="h-6 w-6" />;
    }
  };

  const getStepColor = (step: ProcessingStep) => {
    switch (step) {
      case ProcessingStep.COMPLETED:
        return "bg-green-100 text-green-800";
      case ProcessingStep.ERROR:
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Processamento de Vídeo</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStepColor(status.step)}`}>
          {status.step === ProcessingStep.COMPLETED 
            ? "Concluído" 
            : status.step === ProcessingStep.ERROR 
              ? "Erro" 
              : "Processando"}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {getStepIcon(status.step)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">{status.message}</p>
          <Progress value={status.progress} className="h-2" />
        </div>
      </div>

      {status.step === ProcessingStep.COMPLETED && (
        <div className="mt-4 bg-muted/40 p-4 rounded-lg">
          <p className="text-sm font-medium">Vídeo processado com sucesso!</p>
          <p className="text-xs text-muted-foreground mt-1">
            Seu vídeo foi processado e está pronto para visualização. Você pode encontrá-lo na lista de projetos.
          </p>
        </div>
      )}

      {status.step === ProcessingStep.ERROR && (
        <div className="mt-4 bg-red-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-red-800">Ocorreu um erro no processamento</p>
          <p className="text-xs text-red-600 mt-1">
            Não foi possível processar seu vídeo. Por favor, tente novamente ou use outro vídeo.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;
