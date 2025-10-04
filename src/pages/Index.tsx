import { useState } from "react";
import { IdentityForm } from "@/components/IdentityForm";
import { TestQuestion } from "@/components/TestQuestion";
import { ProgressBar } from "@/components/ProgressBar";
import { Results } from "@/components/Results";
import { npdQuestions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Stage = "identity" | "test" | "results";

interface Identity {
  name: string;
  age: string;
  gender: string;
}

const QUESTIONS_PER_PAGE = 10;

const Index = () => {
  const [stage, setStage] = useState<Stage>("identity");
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(npdQuestions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = npdQuestions.slice(startIndex, endIndex);

  const answeredCount = Object.keys(answers).length;

  const handleIdentitySubmit = (data: Identity) => {
    setIdentity(data);
    setStage("test");
  };

  const handleAnswerChange = (questionIndex: number, value: number) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmitTest = () => {
    setStage("results");
  };

  const handleRetry = () => {
    setStage("identity");
    setIdentity(null);
    setAnswers({});
    setCurrentPage(0);
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const isPageComplete = () => {
    return currentQuestions.every((_, index) => {
      const questionIndex = startIndex + index;
      return answers[questionIndex] !== undefined;
    });
  };

  const isAllAnswered = answeredCount === npdQuestions.length;

  if (stage === "identity") {
    return <IdentityForm onSubmit={handleIdentitySubmit} />;
  }

  if (stage === "results" && identity) {
    return <Results score={calculateScore()} identity={identity} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tes NPD
          </h1>
          <p className="text-muted-foreground">
            Halaman {currentPage + 1} dari {totalPages}
          </p>
        </div>

        <ProgressBar current={answeredCount} total={npdQuestions.length} />

        <div className="space-y-4">
          {currentQuestions.map((question, index) => {
            const questionIndex = startIndex + index;
            return (
              <TestQuestion
                key={questionIndex}
                question={question}
                questionNumber={questionIndex + 1}
                value={answers[questionIndex] || null}
                onChange={(value) => handleAnswerChange(questionIndex, value)}
              />
            );
          })}
        </div>

        <div className="flex gap-4 justify-between pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            variant="outline"
            size="lg"
            className="flex-1 max-w-[200px]"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>

          {currentPage < totalPages - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!isPageComplete()}
              className="flex-1 max-w-[200px] bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              size="lg"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmitTest}
              disabled={!isAllAnswered}
              className="flex-1 max-w-[200px] bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              size="lg"
            >
              Lihat Hasil
            </Button>
          )}
        </div>

        {!isPageComplete() && (
          <p className="text-center text-sm text-muted-foreground">
            Jawab semua pertanyaan di halaman ini untuk melanjutkan
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
