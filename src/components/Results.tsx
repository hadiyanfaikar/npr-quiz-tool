import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, RotateCcw } from "lucide-react";

interface ResultsProps {
  score: number;
  identity: {
    name: string;
    age: string;
    gender: string;
  };
  onRetry: () => void;
}

export const Results = ({ score, identity, onRetry }: ResultsProps) => {
  const getInterpretation = (score: number) => {
    if (score < 80) {
      return {
        level: "Indikasi Rendah NPD",
        description:
          "Hasil tes menunjukkan bahwa Anda memiliki karakteristik narsistik yang minimal. Anda cenderung memiliki keseimbangan yang baik antara kepercayaan diri dan kemampuan berempati terhadap orang lain.",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30",
      };
    } else if (score <= 160) {
      return {
        level: "Indikasi Sedang NPD",
        description:
          "Hasil tes menunjukkan bahwa Anda memiliki beberapa karakteristik narsistik pada tingkat sedang. Anda mungkin memiliki kecenderungan untuk mengutamakan diri sendiri dalam situasi tertentu, namun masih mampu berempati dan mempertimbangkan perspektif orang lain.",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50 dark:bg-amber-950/30",
      };
    } else {
      return {
        level: "Indikasi Tinggi NPD",
        description:
          "Hasil tes menunjukkan bahwa Anda memiliki karakteristik narsistik yang lebih menonjol. Anda mungkin sering mengalami kesulitan dalam hubungan interpersonal atau merasa membutuhkan validasi eksternal yang tinggi. Disarankan untuk berkonsultasi dengan profesional kesehatan mental untuk evaluasi lebih lanjut.",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/30",
      };
    }
  };

  const interpretation = getInterpretation(score);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="shadow-[var(--shadow-soft)] border-border/50">
          <CardHeader className="text-center space-y-3 pb-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)]">
              <span className="text-3xl font-bold text-primary-foreground">{score}</span>
            </div>
            <CardTitle className="text-3xl font-bold">Hasil Tes NPD</CardTitle>
            <CardDescription className="text-base">Asesmen Kepribadian Narsistik</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Nama</p>
                  <p className="font-semibold text-sm">{identity.name}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Umur</p>
                  <p className="font-semibold text-sm">{identity.age} tahun</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Jenis Kelamin</p>
                  <p className="font-semibold text-sm">{identity.gender}</p>
                </div>
              </div>

              <Card className={`${interpretation.bgColor} border-none`}>
                <CardContent className="pt-6">
                  <h3 className={`text-2xl font-bold mb-3 ${interpretation.color}`}>
                    {interpretation.level}
                  </h3>
                  <p className="text-card-foreground leading-relaxed">{interpretation.description}</p>
                </CardContent>
              </Card>
            </div>

            <Alert className="border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm leading-relaxed">
                <strong className="font-semibold">Catatan Penting:</strong> Tes ini hanya untuk tujuan
                edukasi dan skrining awal. Hasil ini bukan merupakan diagnosis medis resmi. Jika Anda
                merasa memerlukan bantuan profesional, silakan berkonsultasi dengan psikolog atau
                psikiater yang berkualifikasi.
              </AlertDescription>
            </Alert>

            <Button
              onClick={onRetry}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Ulangi Tes
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Dikembangkan untuk tujuan edukasi psikologi</p>
        </div>
      </div>
    </div>
  );
};
