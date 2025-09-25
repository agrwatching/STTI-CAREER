"use client";

import { useState, useEffect } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import PengalamanForm from "./PengalamanForm";

export default function PengalamanSection() {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [pengalamanList, setPengalamanList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API saat komponen dimount
  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  const fetchWorkExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://apicareer-production.up.railway.app/api/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Sesuaikan dengan cara penyimpanan token Anda
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch work experiences');
      }
      
      const result = await response.json();
      
      if (result.success && result.data.work_experiences) {
        // Transform API data ke format yang digunakan komponen
        const transformedData = result.data.work_experiences.map((exp: any) => ({
          id: exp.id,
          posisi: exp.position,
          perusahaan: exp.company_name,
          tahunMasuk: new Date(exp.start_date).getFullYear(),
          tahunKeluar: exp.end_date ? new Date(exp.end_date).getFullYear() : 'Sekarang',
          deskripsi: exp.job_description,
          isCurrent: exp.is_current === 1
        }));
        
        setPengalamanList(transformedData);
      }
    } catch (error) {
      console.error('Error fetching work experiences:', error);
      // Bisa tambahkan toast/notification error di sini
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditIndex(null); // mode tambah
    setShowForm(true);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx); // mode edit
    setShowForm(true);
  };

  const handleDelete = async (idx: number) => {
    if (!confirm("Yakin mau hapus pengalaman ini?")) {
      return;
    }

    const experienceToDelete = pengalamanList[idx];
    
    try {
      const response = await fetch(
        `https://apicareer-production.up.railway.app/api/profile/work-experience/${experienceToDelete.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Sesuaikan dengan cara penyimpanan token Anda
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete work experience');
      }

      // Jika berhasil delete dari API, hapus dari state lokal
      setPengalamanList((prev) => prev.filter((_, i) => i !== idx));
      
      // Optional: Tampilkan notifikasi sukses
      console.log('Work experience deleted successfully');
      
    } catch (error) {
      console.error('Error deleting work experience:', error);
      // Optional: Tampilkan notifikasi error
      alert('Gagal menghapus pengalaman kerja. Silakan coba lagi.');
    }
  };

  const handleSave = (values: any) => {
    if (editIndex !== null) {
      // Edit existing
      setPengalamanList(prev => 
        prev.map((item, i) => i === editIndex ? values : item)
      );
    } else {
      // Add new
      setPengalamanList(prev => [...prev, values]);
    }
    setShowForm(false);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditIndex(null);
  };

  if (loading) {
    return (
      <div className="mt-3">
        <h2 className="text-sm font-semibold mb-2">Pengalaman Kerja</h2>
        <div className="text-center py-8 text-gray-500 text-xs">
          Memuat data pengalaman kerja...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {/* Header */}
      <div className="flex justify-end items-center mb-3">
        {!showForm && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 text-sm font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Pengalaman
          </button>
        )}
      </div>

      <h2 className="text-sm font-semibold mb-2">Pengalaman Kerja</h2>
      
      {/* Konten */}
      {showForm ? (
        <PengalamanForm
          mode={editIndex === null ? "add" : "edit"}
          data={editIndex !== null ? pengalamanList[editIndex] : undefined}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2 max-h-[45vh] overflow-y-auto pr-1">
          {pengalamanList.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-gray-500 text-xs">
              Belum ada pengalaman kerja. Klik "Tambah Pengalaman" untuk menambahkan.
            </div>
          ) : (
            pengalamanList.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="border rounded p-2 flex justify-between text-xs bg-white"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{exp.posisi}</h4>
                  <p className="text-gray-500 truncate">{exp.perusahaan}</p>
                  <p className="text-gray-400 mt-0.5">
                    {exp.tahunMasuk} - {exp.tahunKeluar}
                    {exp.isCurrent && <span className="ml-1 text-green-600 font-medium">(Aktif)</span>}
                  </p>
                  <p className="text-gray-600 mt-0.5 break-words">
                    {exp.deskripsi}
                  </p>
                </div>
                <div className="flex gap-1 ml-1">
                  <Pencil
                    className="w-3 h-3 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => handleEdit(idx)}
                  />
                  <Trash2
                    className="w-3 h-3 text-gray-500 cursor-pointer hover:text-red-600 transition-colors"
                    onClick={() => handleDelete(idx)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}