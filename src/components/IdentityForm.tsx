import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Interface dan Tipe tidak berubah
interface IdentityFormProps {
  onSubmit: (data: { name: string; age: string; gender: string }) => void;
}
type FormErrors = {
  name?: string;
  age?: string;
  gender?: string;
};

export const IdentityForm = ({ onSubmit }: IdentityFormProps) => {
  // Semua state dan logic fungsional tidak berubah
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

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
    return Object.keys(newErrors).length === 0;
  };

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
    // [TEMA BARU] Latar belakang terang yang bersih
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* [TEMA BARU] Kartu putih dengan bayangan yang lebih jelas */}
        <Card className="w-full bg-white border border-slate-200 shadow-xl rounded-2xl">
          <CardHeader className="space-y-2 text-center">
            {/* [TEMA BARU] Judul dengan gradasi biru langit */}
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Tes NPD
            </CardTitle>
            {/* [TEMA BARU] Warna teks deskripsi yang lebih lembut */}
            <CardDescription className="text-base text-slate-500">
              Asesmen Kepribadian Narsistik - 50 Pertanyaan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Lengkap</Label>
                {/* [TEMA BARU] Input field dengan highlight biru */}
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className={`transition-all duration-200 border-slate-300 focus:ring-2 focus:ring-sky-300 focus:border-sky-500 ${errors.name ? 'border-red-500 focus:ring-red-300 focus:border-red-500' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium text-slate-700">Umur</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="Masukkan umur Anda"
                  min="10"
                  max="100"
                  className={`transition-all duration-200 border-slate-300 focus:ring-2 focus:ring-sky-300 focus:border-sky-500 ${errors.age ? 'border-red-500 focus:ring-red-300 focus:border-red-500' : ''}`}
                />
                {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
              </div>

              <div className="space-y-3">
                <Label className={`text-sm font-medium ${errors.gender ? 'text-red-600' : 'text-slate-700'}`}>Jenis Kelamin</Label>
