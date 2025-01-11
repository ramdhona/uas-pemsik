import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKorban, removeKorban, editKorban, createKorban } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const KorbanTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const korban = useSelector((state) => state.korban);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKorban, setCurrentKorban] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Cek apakah token ada di localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchKorban());
    }
  }, [dispatch, navigate]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeKorban(id));
        Swal.fire(
          'Dihapus!',
          'Data korban berhasil dihapus.',
          'success'
        );
      }
    });
  };

  const openEditModal = (korban) => {
    setCurrentKorban(korban);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentKorban(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true); // Buka modal tambah korban
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false); // Tutup modal tambah korban
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    await dispatch(editKorban(currentKorban));
    dispatch(fetchKorban());
    
    Swal.fire(
      'Sukses!',
      'Data korban berhasil diperbarui.',
      'success'
    );
    
    closeModal();
  };

  const handleAddKorbanSubmit = async (event) => {
    event.preventDefault();

    await dispatch(createKorban(currentKorban)); // Gunakan createKorban untuk menambahkan korban
    dispatch(fetchKorban());
    
    Swal.fire(
      'Sukses!',
      'Data korban berhasil ditambahkan.',
      'success'
    );
    
    closeAddModal(); // Tutup modal setelah berhasil menambah
  };

  const handleInputChange = (event) => {
    setCurrentKorban({
      ...currentKorban,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#003D7A]">
      <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md mt-5 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#000000]">Daftar Korban</h2>
          <div className="flex space-x-4">
            {/* Tombol Daftar Gunung */}
            <Link
              to="/gunung"
              className="px-6 py-2 bg-[#104D91] text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Daftar Gunung
            </Link>
            {/* Tombol Logout */}
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tombol Tambah Korban Bencana */}
        <button
          onClick={openAddModal}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md mb-6 hover:bg-green-700 transition duration-300"
        >
          Tambah Korban Bencana
        </button>
        
        <table className="w-full text-sm text-left text-gray-500 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-[#104D91] text-white">
            <tr>
              <th scope="col" className="px-6 py-3">Nama</th>
              <th scope="col" className="px-6 py-3">Alamat</th>
              <th scope="col" className="px-6 py-3">Kondisi</th>
              <th scope="col" className="px-6 py-3">Nama Pos</th>
              <th scope="col" className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {korban.length > 0 ? (
              korban.map((k) => (
                <tr key={k.id} className="bg-white border-b hover:bg-gray-50 transition duration-300">
                  <td className="px-6 py-4 text-gray-900 font-medium">{k.name}</td>
                  <td className="px-6 py-4">{k.alamat}</td>
                  <td className="px-6 py-4">{k.kondisi}</td>
                  <td className="px-6 py-4">{k.nama_pos}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      onClick={() => openEditModal(k)}
                      className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(k.id)}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 italic">
                  Tidak ada data korban
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="mt-6 text-center text-sm text-white mb-5">
          Copyright © Dwi Ramdhona A11.2022.14033
        </footer>
    

      {/* Modal Edit Korban */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Edit Korban</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={currentKorban.name}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#104D91] focus:border-[#104D91]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={currentKorban.alamat}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#104D91] focus:border-[#104D91]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Kondisi</label>
                <input
                  type="text"
                  name="kondisi"
                  value={currentKorban.kondisi}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#104D91] focus:border-[#104D91]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Pos</label>
                <input
                  type="text"
                  name="nama_pos"
                  value={currentKorban.nama_pos}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#104D91] focus:border-[#104D91]"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#104D91] text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Korban */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Tambah Korban</h3>
            <form onSubmit={handleAddKorbanSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#104D91] focus:border-[#104D91]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#104D91] focus:border-[#104D91]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Kondisi</label>
                <input
                  type="text"
                  name="kondisi"
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#104D91] focus:border-[#104D91]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Pos</label>
                <input
                  type="text"
                  name="nama_pos"
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#104D91] focus:border-[#104D91]"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#104D91] text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KorbanTable;
