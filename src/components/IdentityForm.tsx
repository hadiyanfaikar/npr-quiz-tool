import { useState } from 'react';
import { User } from 'lucide-react';
// 1. Pastikan semua komponen UI yang dibutuhkan sudah di-import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface UserIdentity {
  name: string;
  age: number;
  gender: string;
}

interface IdentityFormProps {
  onSubmit: (identity: UserIdentity) => void;
}

// Logika dari kode kedua Anda sudah bagus, jadi kita pertahankan
export default function IdentityForm({ onSubmit }: IdentityFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nama harus diisi';
    }

    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      newErrors.age = 'Umur harus antara 10-100 tahun';
    }

    if (!gender) {
      newErrors.gender = 'Jenis kelamin harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        age: parseInt(age),
        gender
      });
    }
  };

  // 2. Di sini kita gunakan struktur JSX dari "source code yang benar"
  //    dan menghubungkannya dengan logika di atas.
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center">
           <div className="flex justify-center mb-4">
             <div className="bg-slate-100 p-4 rounded-full">
               <User className="w-10 h-10 text-slate-600" />
             </div>
           </div>
          <CardTitle className="text-3xl font-bold text-slate-800">
            Tes NPD
          </CardTitle>
          <CardDescription className="text-slate-600">
            Silakan isi identitas Anda untuk memulai tes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Umur</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Masukkan umur Anda"
                min="10"
                max="100"
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && <p className="text-sm text-red-600 mt-1">{errors.age}</p>}
            </div>

            <div className="space-y-3">
              <Label>Jenis Kelamin</Label>
              <RadioGroup value={gender} onValueChange={setGender} className={errors.gender ? 'border border-red-500 rounded-lg p-1' : ''}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Laki-laki" id="male" />
                  <Label htmlFor="male">Laki-laki</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Perempuan" id="female" />
                  <Label htmlFor="female">Perempuan</Label>
                </div>
              </RadioGroup>
              {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Mulai Tes
            </Button>
          </form>
           <div className="mt-6 p-4 bg-slate-50 rounded-lg">
             <p className="text-xs text-slate-600 text-center">
               Tes ini bertujuan edukatif dan bukan merupakan diagnosis medis resmi.
             </p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
