import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TestQuestionProps {
  question: string;
  questionNumber: number;
  value: number | null;
  onChange: (value: number) => void;
}

const likertScale = [
  { value: 1, label: "Sangat Tidak Setuju" },
  { value: 2, label: "Tidak Setuju" },
  { value: 3, label: "Netral" },
  { value: 4, label: "Setuju" },
  { value: 5, label: "Sangat Setuju" },
];

export const TestQuestion = ({ question, questionNumber, value, onChange }: TestQuestionProps) => {
  return (
    <Card className="shadow-[var(--shadow-soft)] border-border/50 hover:border-primary/30 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {questionNumber}
            </span>
            <p className="text-base font-medium text-card-foreground leading-relaxed pt-1">
              {question}
            </p>
          </div>

          <RadioGroup
            value={value?.toString()}
            onValueChange={(v) => onChange(parseInt(v))}
            className="space-y-2 pl-11"
          >
            {likertScale.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
              >
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`q${questionNumber}-${option.value}`}
                  className="flex-shrink-0"
                />
                <Label
                  htmlFor={`q${questionNumber}-${option.value}`}
                  className="cursor-pointer flex-1 text-sm group-hover:text-primary transition-colors"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
