import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground font-medium">Progress Tes</span>
        <span className="text-primary font-semibold">
          {current} / {total}
        </span>
      </div>
      <Progress value={percentage} className="h-3 bg-secondary" />
      <p className="text-xs text-muted-foreground text-center">
        {percentage.toFixed(0)}% selesai
      </p>
    </div>
  );
};
