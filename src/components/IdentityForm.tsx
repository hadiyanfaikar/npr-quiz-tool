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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              } focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all`}
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
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.age ? 'border-red-500' : 'border-slate-300'
              } focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all`}
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
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setGender('Laki-laki')}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  gender === 'Laki-laki'
                    ? 'border-slate-700 bg-slate-700 text-white'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                Laki-laki
              </button>
              <button
                type="button"
                onClick={() => setGender('Perempuan')}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  gender === 'Perempuan'
                    ? 'border-slate-700 bg-slate-700 text-white'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                Perempuan
              </button>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Mulai Tes
          </button>
        </form>

        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600 text-center">
            Tes ini bertujuan edukatif dan bukan merupakan diagnosis medis resmi.
            Untuk evaluasi profesional, konsultasikan dengan psikolog atau psikiater.
          </p>
        </div>
      </div>
    </div>
  );
}
