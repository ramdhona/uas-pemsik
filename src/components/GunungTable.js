import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGunung, removeGunung, editGunung, createGunung } from '../redux/action';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2 untuk alert konfirmasi dan notifikasi

const GunungTable = () => {
  const dispatch = useDispatch(); // Mendapatkan dispatch dari Redux
  const gunung = useSelector((state) => state.gunung); // Mendapatkan data gunung dari store Redux
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk membuka/menutup modal edit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State untuk membuka/menutup modal tambah
  const [currentGunung, setCurrentGunung] = useState(null); // State untuk menyimpan data gunung yang sedang diedit
  const [newGunung, setNewGunung] = useState({
    name: '',
    ketinggian: '',
    lokasi: '',
  }); // State untuk menyimpan data gunung yang baru akan ditambahkan

  useEffect(() => {
    dispatch(fetchGunung()); // Mengambil data gunung saat komponen pertama kali dimuat
  }, [dispatch]);

  // Fungsi untuk menghapus data gunung
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeGunung(id)); // Menghapus data gunung berdasarkan id
        Swal.fire(
          'Terhapus!',
          'Data gunung berhasil dihapus.',
          'success'
        );
      }
    });
  };

  // Fungsi untuk membuka modal edit dan mengisi data gunung yang akan diedit
  const openModal = (gunung) => {
    setCurrentGunung(gunung);
    setIsModalOpen(true); // Menampilkan modal edit
  };

  // Fungsi untuk menutup modal edit
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGunung(null); // Menghapus data gunung yang sedang diedit
  };

  // Fungsi untuk membuka modal tambah data gunung
  const openAddModal = () => {
    setIsAddModalOpen(true); // Menampilkan modal tambah
  };

  // Fungsi untuk menutup modal tambah
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewGunung({
      name: '',
      ketinggian: '',
      lokasi: '',
    }); // Menghapus data yang diinputkan pada modal tambah
  };

  // Fungsi untuk menangani perubahan input pada modal edit
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentGunung((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani perubahan input pada modal tambah
  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
    setNewGunung((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk mengirimkan data setelah mengedit gunung
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Mencegah form untuk reload halaman
    await dispatch(editGunung(currentGunung)); // Mengirimkan data yang diedit ke Redux
    dispatch(fetchGunung()); // Memperbarui data gunung setelah diubah
    closeModal(); // Menutup modal
    Swal.fire(
      'Sukses!',
      'Data gunung berhasil diperbarui.',
      'success'
    );
  };

  // Fungsi untuk mengirimkan data setelah menambahkan gunung baru
  const handleAddFormSubmit = async (event) => {
    event.preventDefault(); // Mencegah form untuk reload halaman
    await dispatch(createGunung(newGunung)); // Menambahkan gunung baru ke Redux
    dispatch(fetchGunung()); // Memperbarui daftar gunung setelah data baru ditambahkan
    closeAddModal(); // Menutup modal tambah
    Swal.fire(
      'Sukses!',
      'Data gunung berhasil ditambahkan.',
      'success'
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#003D7A]">
      <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md mt-5 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Daftar Gunung</h2>
          <div className="flex space-x-4">
            <Link
              to="/korban"
              className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              Daftar Korban
            </Link>
            <button
              onClick={openAddModal}
              className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              Tambah Data
            </button>
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-[#104D91] text-white">
            <tr>
              <th scope="col" className="px-6 py-3">Nama Gunung</th>
              <th scope="col" className="px-6 py-3">Ketinggian (m)</th>
              <th scope="col" className="px-6 py-3">Lokasi</th>
              <th scope="col" className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {gunung.length > 0 ? (
              gunung.map((g) => (
                <tr key={g.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">{g.name}</td>
                  <td className="px-6 py-4">{g.ketinggian}</td>
                  <td className="px-6 py-4">{g.lokasi}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      onClick={() => openModal(g)}
                      className="text-white bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 italic">
                  Tidak ada data gunung
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal untuk menambah data gunung */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Add Data Gunung</h3>
              <form onSubmit={handleAddFormSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nama Gunung</label>
                  <input
                    type="text"
                    name="name"
                    value={newGunung.name}
                    onChange={handleNewInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Ketinggian (m)</label>
                  <input
                    type="number"
                    name="ketinggian"
                    value={newGunung.ketinggian}
                    onChange={handleNewInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                  <input
                    type="text"
                    name="lokasi"
                    value={newGunung.lokasi}
                    onChange={handleNewInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className="px-4 py-2 bg-gray-200 rounded-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal untuk mengedit data gunung */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Edit Gunung</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nama Gunung</label>
                  <input
                    type="text"
                    name="name"
                    value={currentGunung.name}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Ketinggian (m)</label>
                  <input
                    type="number"
                    name="ketinggian"
                    value={currentGunung.ketinggian}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                  <input
                    type="text"
                    name="lokasi"
                    value={currentGunung.lokasi}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 rounded-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-6 text-center text-sm text-white mb-5">
          Copyright © Dwi Ramdhona A11.2022.14033
        </footer>
    </div>
  );
};

export default GunungTable;
