import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  // State untuk menyimpan email dan password input dari pengguna
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State untuk menyimpan pesan error
  const [error, setError] = useState('');

  // Hook untuk navigasi setelah login berhasil
  const navigate = useNavigate();

  // Fungsi untuk menangani submit form
  const handleSubmit = async (event) => {
    event.preventDefault(); // Mencegah halaman reload setelah form di-submit

    // Validasi: Pastikan email dan password tidak kosong
    if (!email || !password) {
      setError('Both email and password are required!');
      return;
    }

    try {
      // Mengirim request ke server untuk login
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      // Jika token diterima, simpan di localStorage dan arahkan ke halaman "/korban"
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token); // Menyimpan token di localStorage
        setError(''); // Menghapus pesan error jika login berhasil
        navigate('/korban'); // Navigasi ke halaman korban
      }
    } catch (error) {
      // Menangani error dari server atau koneksi
      if (error.response) {
        setError(error.response.data.error || 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#104D91]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Header form login */}
        <h2 className="text-2xl font-bold text-center mb-4 text-[#104D91]">Login</h2>
        
        {/* Form login */}
        <form onSubmit={handleSubmit}>
          {/* Pesan error jika ada */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          
          {/* Input email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Menyimpan nilai input ke state email
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Input password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Menyimpan nilai input ke state password
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Tombol login dan link ke halaman register */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-[#104D91] text-white font-semibold rounded-lg hover:bg-[#083061] transition duration-300"
            >
              Login
            </button>
            <a
              href="/register"
              className="text-sm text-[#104D91] hover:underline"
            >
              Belum punya akun?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
