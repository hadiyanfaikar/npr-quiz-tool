import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// ... (Interface dan Tipe tidak berubah)
interface IdentityFormProps {
  onSubmit: (data: { name: string; age: string; gender: string }) => void;
}
type FormErrors = {
  name?: string;
  age?: string;
  gender?: string;
};


export const IdentityForm = ({ onSubmit }: IdentityFormProps) => {
  // ... (Semua state dan logic tidak berubah)
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
    // [PERUBAHAN] Latar belakang utama
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 text-slate-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* [PERUBAHAN] Efek kartu menjadi glassmorphism */}
        <Card className="w-full bg-slate-900/50 backdrop-blur-sm border border-slate-700 shadow-2xl shadow-teal-500/10">
          <CardHeader className="space-y-2 text-center">
            {/* [PERUBAHAN] Gradasi warna judul */}
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Tes NPD
            </CardTitle>
            {/* [PERUBAHAN] Warna teks deskripsi */}
            <CardDescription className="text-base text-slate-400">
              Asesmen Kepribadian Narsistik - 50 Pertanyaan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                {/* [PERUBAHAN] Warna teks label */}
                <Label htmlFor="name" className="text
