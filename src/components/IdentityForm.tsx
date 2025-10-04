import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IdentityFormProps {
  onSubmit: (data: { name: string; age: string; gender: string }) => void;
}

// Tipe untuk state error
type FormErrors = {
  name?: string;
  age?: string;
  gender?: string;
};

export const IdentityForm = ({ onSubmit }: IdentityFormProps) => {
  // 1. State digabung menjadi satu objek agar lebih rapi
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Fungsi untuk validasi
  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama lengkap tidak boleh kosong.";
    const ageNum = Number(formData.age);
    if (!formData.age) {
      newErrors.age = "Umur tidak boleh kosong.";
    } else if (isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      newErrors.age = "Umur harus antara 10 dan 100 tahun.";
    }
    if (!formData.gender) newErrors.gender = "Pilih salah satu jenis kelamin.";
    
    setErrors(newErrors);
    // Form valid jika tidak ada error
    return Object.keys(newErrors).length === 0;
  };

  // 2. Gunakan useEffect untuk memeriksa validitas form setiap kali data berubah
  useEffect(() => {
    setIsFormValid(validate());
  }, [formData]);
  

  const handleChange = (field: 'name' | 'age' | 'gender', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* 3. Menambahkan animasi pada Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-[var(--shadow-soft)] border-border/50">
          <CardHeader className="space-y-2 text-center">
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
                <Label htmlFor="name" className="text-sm font-medium">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className={`transition-all duration-200 ${errors.name ? 'border-destructive focus:ring-destructive/20' : 'focus:ring-primary/20'}`}
                />
                {/* 4. Menampilkan pesan error jika ada */}
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">Umur</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="Masukkan umur Anda"
                  min="10"
                  max="100"
                  className={`transition-all duration-200 ${errors.age ? 'border-destructive focus:ring-destructive/20' : 'focus:ring-primary/20'}`}
                />
                {errors.age && <p className="text-xs text-destructive mt-1">{errors.age}</p>}
              </div>

              <div className="space-y-3">
                <Label className={`text-sm font-medium ${errors.gender ? 'text-destructive' : ''}`}>Jenis Kelamin</Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                  {/* 5. Styling lebih baik untuk item radio yang dipilih */}
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors data-[state=checked]:bg-primary/10 data-[state=checked]:border border-primary">
                    <RadioGroupItem value="Laki-laki" id="male" />
                    <Label htmlFor="male" className="cursor-pointer flex-1">Laki-laki</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors data-[state=checked]:bg-primary/10 data-[state=checked]:border border-primary">
                    <RadioGroupItem value="Perempuan" id="female" />
                    <Label htmlFor="female" className="cursor-pointer flex-1">Perempuan</Label>
                  </div>
                </RadioGroup>
                {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender}</p>}
              </div>

              <Button
                type="submit"
                disabled={!isFormValid} // 6. Tombol dinonaktifkan jika form tidak valid
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-glow)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
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
      </motion.div>
    </div>
  );
};
