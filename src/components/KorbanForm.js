import React, { useState } from 'react';  
import { useDispatch } from 'react-redux';  // Mengimpor hook 'useDispatch' dari react-redux untuk mengirim action
import { createKorban } from '../redux/action';  // Mengimpor action 'createKorban' dari redux action
  
const KorbanForm = () => {  
  // State untuk menyimpan data yang dimasukkan pada form
  const [name, setName] = useState('');  
  const [alamat, setAlamat] = useState('');  
  const [kondisi, setKondisi] = useState('');  
  const [nama_pos, setNamaPos] = useState('');  
  const dispatch = useDispatch();  // Mendapatkan dispatch dari useDispatch untuk mengirim action
  
  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {  
    e.preventDefault();  // Mencegah reload halaman saat form disubmit
    // Mengirim action 'createKorban' dengan data yang telah diinputkan ke Redux store
    dispatch(createKorban({ name, alamat, kondisi, nama_pos }));  
    // Reset nilai input setelah data berhasil disubmit
    setName('');  
    setAlamat('');  
    setKondisi('');  
    setNamaPos('');  
  };  
  
  return (  
    // Form untuk input data korban
    <form onSubmit={handleSubmit}>  
      {/* Input untuk nama korban */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Korban" required />  
      {/* Input untuk alamat korban */}
      <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Alamat" required />  
      {/* Input untuk kondisi korban */}
      <input type="text" value={kondisi} onChange={(e) => setKondisi(e.target.value)} placeholder="Kondisi" required />  
      {/* Input untuk nama pos korban */}
      <input type="text" value={nama_pos} onChange={(e) => setNamaPos(e.target.value)} placeholder="Nama Pos" required />  
      {/* Tombol untuk mengirim form */}
      <button type="submit">Tambah Korban</button>  
    </form>  
  );  
};  
  
export default KorbanForm;  
