import React, { useState } from 'react';  
import { useDispatch } from 'react-redux';  
import { createGunung } from '../redux/action';  // Mengimpor action untuk membuat data gunung di Redux

// Komponen untuk menambah data gunung
const GunungForm = () => {  
  // State untuk menyimpan input pengguna
  const [name, setName] = useState('');  // Nama gunung
  const [ketinggian, setKetinggian] = useState('');  // Ketinggian gunung dalam meter
  const [lokasi, setLokasi] = useState('');  // Lokasi gunung
  const dispatch = useDispatch();  // Mendapatkan dispatch function dari Redux untuk mengirim aksi

  // Fungsi yang dijalankan ketika form disubmit
  const handleSubmit = (e) => {  
    e.preventDefault();  // Mencegah form dari pengiriman default (refresh halaman)

    // Mengirimkan aksi createGunung dengan data dari input pengguna
    dispatch(createGunung({ name, ketinggian, lokasi }));  

    // Reset form setelah data terkirim
    setName('');  
    setKetinggian('');  
    setLokasi('');  
  };  

  return (  
    <form onSubmit={handleSubmit}>  
      {/* Input untuk nama gunung */}
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}  // Mengupdate state 'name' ketika input berubah
        placeholder="Nama Gunung" 
        required 
      />  

      {/* Input untuk ketinggian gunung */}
      <input 
        type="number" 
        value={ketinggian} 
        onChange={(e) => setKetinggian(e.target.value)}  // Mengupdate state 'ketinggian' ketika input berubah
        placeholder="Ketinggian (m)" 
        required 
      />  

      {/* Input untuk lokasi gunung */}
      <input 
        type="text" 
        value={lokasi} 
        onChange={(e) => setLokasi(e.target.value)}  // Mengupdate state 'lokasi' ketika input berubah
        placeholder="Lokasi" 
        required 
      />  

      {/* Tombol untuk mengirimkan form */}
      <button type="submit">Tambah Gunung</button>  
    </form>  
  );  
};  

export default GunungForm;  
