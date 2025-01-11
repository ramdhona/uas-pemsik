import React from 'react';  
import GunungForm from './GunungForm';  // Mengimpor komponen GunungForm untuk form input data gunung
import GunungTable from './GunungTable';  // Mengimpor komponen GunungTable untuk menampilkan data gunung dalam tabel
  
// Komponen utama untuk menampilkan daftar gunung
const GunungList = () => {  
  return (  
    <div>  
      {/* Menampilkan komponen GunungTable yang berfungsi untuk menampilkan daftar gunung */}
      <GunungTable />  
    </div>  
  );  
};  
  
export default GunungList;  
