import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Users2, BrainCircuit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IdentityFormProps {
  onSubmit: (data: { name: string; age: string; gender: string }) => void;
}

export const IdentityForm = ({ onSubmit }: IdentityFormProps) => {
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });
  const [errors, setErrors] = useState({ name: false, age: false, gender: false });
  const [isFormValid, setIsFormValid] = useState(false);

  // Validasi form setiap kali ada perubahan data
  useEffect(() => {
    const { name, age, gender } = formData;
    const ageNum = Number(age);
    const nameIsValid = name.trim().length > 2;
    const ageIsValid = !isNaN(ageNum) && ageNum >= 10 && ageNum <= 100;
    const genderIsValid = !!gender;

    setErrors({ name: !nameIsValid, age: !ageIsValid, gender: !genderIsValid });
    setIsFormValid(nameIsValid && ageIsValid && genderIsValid);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Varian animasi untuk framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-full max-w-lg shadow-2xl rounded-2xl border-border/20">
          <CardHeader className="text-center p-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}>
              <BrainCircuit className="mx-auto h-12 w-12 text-primary mb-4" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Mulai Asesmen Kepribadian</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-1">
              Hanya butuh beberapa detik untuk memulai.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Contoh: Budi Sanjaya"
                    className={`pl-10 ${errors.name && formData.name ? 'border-red-500' : ''}`}
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="age">Umur</Label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="Masukkan umur Anda (10-100)"
                    className={`pl-10 ${errors.age && formData.age ? 'border-red-500' : ''}`}
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-3" variants={itemVariants}>
                <Label>Jenis Kelamin</Label>
                 <RadioGroup value={formData.gender} onValueChange={(value) => handleChange('gender', value)} className="grid grid-cols-2 gap-4">
                    <Label htmlFor="male" className={`flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'Laki-laki' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <Users2 className="h-5 w-5 mr-2 text-muted-foreground"/>
                      <RadioGroupItem value="Laki-laki" id="male" className="sr-only"/>
                      Laki-laki
                    </Label>
                    <Label htmlFor="female" className={`flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'Perempuan' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <Users2 className="h-5 w-
