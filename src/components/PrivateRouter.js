import React from 'react';  
import { Route, Navigate } from 'react-router-dom';  // Mengimpor komponen Route dan Navigate dari react-router-dom untuk routing

// PrivateRoute adalah komponen yang akan membungkus route yang memerlukan autentikasi
const PrivateRoute = ({ element, ...rest }) => {  
  // Mengecek apakah pengguna sudah terautentikasi berdasarkan token di localStorage
  const isAuthenticated = localStorage.getItem('authToken') !== null;  

  return (
    // Menggunakan komponen Route untuk menentukan apakah pengguna dapat mengakses route ini
    <Route  
      {...rest}  // Menyebarkan props lainnya yang diterima oleh PrivateRoute
      element={isAuthenticated ? element : <Navigate to="/login" />}  // Jika pengguna terautentikasi, tampilkan elemen, jika tidak, arahkan ke halaman login
    />
  );
};

export default PrivateRoute;  // Mengekspor komponen PrivateRoute untuk digunakan di tempat lain
