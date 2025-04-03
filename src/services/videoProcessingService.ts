
import { toast } from "sonner";

// Processing steps
export enum ProcessingStep {
  DOWNLOADING = "downloading",
  TRANSCRIBING = "transcribing",
  ANALYZING = "analyzing",
  EDITING = "editing",
  EXPORTING = "exporting",
  COMPLETED = "completed",
  ERROR = "error"
}

export interface ProcessingStatus {
  step: ProcessingStep;
  progress: number;
  message: string;
}

// Mock service for video processing
export const processYoutubeVideo = async (youtubeUrl: string, onStatusUpdate: (status: ProcessingStatus) => void): Promise<string> => {
  // Initial status
  onStatusUpdate({
    step: ProcessingStep.DOWNLOADING,
    progress: 0,
    message: "Iniciando download do vídeo..."
  });

  try {
    // Step 1: Download video (simulated)
    await simulateProcessingStep(
      ProcessingStep.DOWNLOADING,
      "Baixando vídeo do YouTube...",
      3000,
      onStatusUpdate
    );

    // Step 2: Transcription (simulated)
    await simulateProcessingStep(
      ProcessingStep.TRANSCRIBING,
      "Transcrevendo áudio com IA...",
      4000,
      onStatusUpdate
    );

    // Step 3: Analyzing content (simulated)
    await simulateProcessingStep(
      ProcessingStep.ANALYZING,
      "Analisando conteúdo e identificando melhores momentos...",
      3500,
      onStatusUpdate
    );

    // Step 4: Editing (simulated)
    await simulateProcessingStep(
      ProcessingStep.EDITING,
      "Criando cortes inteligentes...",
      5000,
      onStatusUpdate
    );

    // Step 5: Exporting (simulated)
    await simulateProcessingStep(
      ProcessingStep.EXPORTING,
      "Exportando vídeos finalizados...",
      2500,
      onStatusUpdate
    );

    // Final status
    onStatusUpdate({
      step: ProcessingStep.COMPLETED,
      progress: 100,
      message: "Processamento concluído com sucesso!"
    });

    return "https://source.unsplash.com/random/800x450?topic=video";
  } catch (error) {
    onStatusUpdate({
      step: ProcessingStep.ERROR,
      progress: 0,
      message: "Erro ao processar o vídeo"
    });
    throw error;
  }
};

// Mock service for file upload video processing
export const processVideoFile = async (file: File, onStatusUpdate: (status: ProcessingStatus) => void): Promise<string> => {
  // Implementation follows the same pattern as processYoutubeVideo
  // Initial status
  onStatusUpdate({
    step: ProcessingStep.UPLOADING,
    progress: 0,
    message: "Iniciando upload do arquivo..."
  });

  try {
    // Similar steps as above but starting with upload instead of download
    await simulateProcessingStep(
      ProcessingStep.UPLOADING,
      "Enviando arquivo de vídeo...",
      3500,
      onStatusUpdate
    );

    // Subsequent steps are the same
    await simulateProcessingStep(
      ProcessingStep.TRANSCRIBING,
      "Transcrevendo áudio com IA...",
      4000,
      onStatusUpdate
    );

    await simulateProcessingStep(
      ProcessingStep.ANALYZING,
      "Analisando conteúdo e identificando melhores momentos...",
      3500,
      onStatusUpdate
    );

    await simulateProcessingStep(
      ProcessingStep.EDITING,
      "Criando cortes inteligentes...",
      5000,
      onStatusUpdate
    );

    await simulateProcessingStep(
      ProcessingStep.EXPORTING,
      "Exportando vídeos finalizados...",
      2500,
      onStatusUpdate
    );

    // Final status
    onStatusUpdate({
      step: ProcessingStep.COMPLETED,
      progress: 100,
      message: "Processamento concluído com sucesso!"
    });

    return "https://source.unsplash.com/random/800x450?topic=video";
  } catch (error) {
    onStatusUpdate({
      step: ProcessingStep.ERROR,
      progress: 0,
      message: "Erro ao processar o vídeo"
    });
    throw error;
  }
};

// Helper function to simulate a processing step with progress updates
const simulateProcessingStep = async (
  step: ProcessingStep,
  message: string,
  duration: number,
  onStatusUpdate: (status: ProcessingStatus) => void
): Promise<void> => {
  const updateInterval = 100; // Update every 100ms
  const totalUpdates = duration / updateInterval;
  
  for (let i = 0; i <= totalUpdates; i++) {
    const progress = Math.min(Math.floor((i / totalUpdates) * 100), 99);
    onStatusUpdate({
      step,
      progress,
      message
    });
    await new Promise(resolve => setTimeout(resolve, updateInterval));
  }
};
