import { useState } from 'react';
import { User } from 'lucide-react';

export interface UserIdentity {
  name: string;
  age: number;
  gender: string;
}

interface IdentityFormProps {
  onSubmit: (identity: UserIdentity) => void;
}

export default function IdentityForm({ onSubmit }: IdentityFormProps) {
  // 1. Menggunakan satu state object untuk form agar lebih rapi
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const { name, age, gender } = formData;
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
        name: formData.name.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
      });
    }
  };
  
  // 2. Membuat satu handler untuk mengelola perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const isFormIncomplete = !formData.name || !formData.age || !formData.gender;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100 p-4 rounded-full">
            <User className="w-12 h-12 text-slate-700" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
          Tes NPD
        </h1>
        <p className="text-slate-600 text-center mb-8">
          Silakan isi identitas Anda untuk memulai tes
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              // 3. Perbaikan styling: border berubah warna saat focus, bukan transparan
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500 ring-red-200' : 'border-slate-300'
              } focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition-all`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-2">
              Umur
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.age ? 'border-red-500 ring-red-200' : 'border-slate-300'
              } focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition-all`}
              placeholder="Masukkan umur"
              min="10"
              max="100"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Jenis Kelamin
            </label>
            {/* 4. Menambahkan border error pada container tombol */}
            <div className={`grid grid-cols-2 gap-4 p-1 rounded-lg border-2 ${errors.gender ? 'border-red-500' : 'border-transparent'}`}>
              <button
                type="button"
                onClick={() =>
