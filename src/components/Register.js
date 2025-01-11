import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/action';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  // Menggunakan Redux dispatch untuk mengirim action registerUser
  const dispatch = useDispatch();
  
  // Hook navigasi untuk mengarahkan ke halaman login setelah registrasi
  const navigate = useNavigate();

  // State untuk menyimpan data form input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Fungsi untuk menangani perubahan pada input form
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value, // Menyimpan nilai input berdasarkan nama field
    });
  };

  // Fungsi untuk menangani submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Mencegah reload halaman
    await dispatch(registerUser(formData)); // Dispatch action untuk mendaftarkan user
    navigate('/login'); // Mengarahkan ke halaman login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#104D91]">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        {/* Header form registrasi */}
        <h2 className="text-2xl font-bold text-center mb-6 text-[#104D91]">Registrasi User</h2>
        
        {/* Form registrasi */}
        <form onSubmit={handleFormSubmit}>
          {/* Input nama */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange} // Mengubah state berdasarkan input user
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>

          {/* Input email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange} // Mengubah state berdasarkan input user
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Masukkan email Anda"
              required
            />
          </div>

          {/* Input password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange} // Mengubah state berdasarkan input user
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Masukkan password Anda"
              required
            />
          </div>

          {/* Tombol daftar */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-[#104D91] text-white py-2 rounded-md font-semibold hover:bg-[#083061] transition duration-300"
            >
              Daftar
            </button>
          </div>
        </form>

        {/* Link ke halaman login */}
        <div className="mt-4 text-sm text-center text-white">
          Sudah punya akun?{' '}
          <a
            href="/login"
            className="text-[#104D91] hover:underline font-medium"
          >
            Masuk
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
