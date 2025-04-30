import { useState, useEffect } from 'react';
import { supa } from '../lib/supa'; // Sesuaikan dengan path kamu

// Komponen untuk menampilkan data
const SubmissionsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ nama: '', kelas: '' });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supa.from('submissions').select('*').order('created_at', { ascending: false });
      setData(data);
      setFilteredData(data); // Menyimpan data yang sudah difilter
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [field]: value };
      filterData(newFilters);
      return newFilters;
    });
  };

  const filterData = (filters: any) => {
    const { nama, kelas } = filters;
    const filtered = data.filter((item) => {
      const matchesNama = nama ? item.nama.toLowerCase().includes(nama.toLowerCase()) : true;
      const matchesKelas = kelas ? item.kelas.toLowerCase().includes(kelas.toLowerCase()) : true;
      return matchesNama && matchesKelas;
    });
    setFilteredData(filtered);
  };

  const handleSort = (field: string) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleDelete = async (id: number) => {
    // Hapus data dari database menggunakan Supabase
    await supa.from('submissions').delete().eq('id', id);
    
    // Hapus data dari state lokal
    setData(data.filter((item) => item.id !== id));
    setFilteredData(filteredData.filter((item) => item.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="table-container">
      <h1 className="title">Submissions Table STEMation</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter Nama"
          value={filters.nama}
          onChange={(e) => handleFilterChange(e, 'nama')} // Filter berdasarkan nama
          className="filter-input"
        />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('absen')}>No Absen</th>
            <th onClick={() => handleSort('nama')}>Nama</th>
            <th onClick={() => handleSort('score')}>Score</th>
            <th onClick={() => handleSort('created_at')}>Tanggal Pengajuan</th>
            <th>Aksi</th> {/* Kolom untuk tombol delete */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} className="table-row">
              <td>{row.absen}</td> {/* Menampilkan No Absen */}
              <td>{row.nama}</td>     {/* Menampilkan Nama */}
              <td>{row.score}</td>    {/* Menampilkan Score */}
              <td>{row.created_at}</td> {/* Menampilkan Tanggal Pengajuan */}
              <td>
                <button
                  onClick={() => handleDelete(row.id)} // Menambahkan aksi delete
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTable;
