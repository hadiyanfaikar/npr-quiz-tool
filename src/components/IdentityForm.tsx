import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IdentityFormProps {
  onSubmit: (data: { name: string; age: string; gender: string }) => void;
}

export const IdentityForm = ({ onSubmit }: IdentityFormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && gender) {
      onSubmit({ name, age, gender });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      <Card className="w-full max-w-md shadow-[var(--shadow-soft)] border-border/50">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tes NPD
          </CardTitle>
          <CardDescription className="text-base">
            Asesmen Kepribadian Narsistik - 50 Pertanyaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">
                Umur
              </Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Masukkan umur Anda"
                required
                min="10"
                max="100"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Jenis Kelamin</Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="Laki-laki" id="male" />
                  <Label htmlFor="male" className="cursor-pointer flex-1">
                    Laki-laki
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="Perempuan" id="female" />
                  <Label htmlFor="female" className="cursor-pointer flex-1">
                    Perempuan
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              size="lg"
            >
              Mulai Tes
            </Button>

            <p className="text-xs text-muted-foreground text-center pt-2">
              Tes ini memakan waktu sekitar 10-15 menit untuk diselesaikan
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
