"use client";

import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import KeterampilanForm from "./KeterampilanForm";

interface Skill {
  id?: number | string;
  _id?: number | string;
  skill_name?: string;
  nama?: string;
  name?: string;
  skill_level?: string;
  level?: string;
  deskripsi?: string; // ⬅️ tambah ini biar match dengan Form
}

interface SkillFormData {
  nama: string;
  level?: string;
}

export default function KeterampilanSection() {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get JWT token from localStorage or wherever you store it
  const getAuthToken = () => {
    const token = localStorage.getItem("token"); // ✅ sesuai dengan login
    return token || "";
  };

  // Fetch skills from API
  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile API response:", data); // ⬅️ Debug: cek struktur JSON dari API
      console.log("Extracted skills:", data?.data?.skills); // ⬅️ Debug: cek apakah array skills terbaca

      setSkills(data?.data?.skills || []); // ✅ Pastikan ambil dari data.data.skills
      setError(null);
    } catch (err) {
      console.error("Error fetching skills:", err);
      setError("Gagal memuat data keterampilan");
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new skill
  const addSkill = async (skillData: SkillFormData) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/profile`;
      const body = {
        skill_name: skillData.nama,
        skill_level: skillData.level || "Beginner", // default level if not provided
      };

      // 🔍 Debug request
      console.log("Add skill request:", {
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(body),
      });

      // 🔍 Debug response
      const responseText = await response.text();
      console.log("Add skill response:", response.status, responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh skills list
      await fetchSkills();
      return true;
    } catch (err) {
      console.error("Error adding skill:", err);
      setError("Gagal menambah keterampilan");
      return false;
    }
  };

  // Update skill
  const updateSkill = async (skillId: number | string, skillData: SkillFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${skillId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          skill_name: skillData.nama,
          skill_level: skillData.level || "Beginner",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh skills list
      await fetchSkills();
      return true;
    } catch (err) {
      console.error("Error updating skill:", err);
      setError("Gagal mengupdate keterampilan");
      return false;
    }
  };

  // Delete skill
  const deleteSkill = async (skillId: number | string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${skillId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh skills list
      await fetchSkills();
      return true;
    } catch (err) {
      console.error("Error deleting skill:", err);
      setError("Gagal menghapus keterampilan");
      return false;
    }
  };

  // Load skills on component mount
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleAdd = () => {
    setEditIndex(null);
    setShowForm(true);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setShowForm(true);
  };

  const handleDelete = async (idx: number) => {
    if (confirm("Yakin mau hapus keterampilan ini?")) {
      const skill = skills[idx];
      const success = await deleteSkill(skill.id ?? skill._id ?? "");
      if (!success) {
        alert("Gagal menghapus keterampilan. Silakan coba lagi.");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditIndex(null);
  };

  const handleSave = async (data: SkillFormData) => {
    let success = false;

    if (editIndex !== null) {
      // Update existing skill
      const skill = skills[editIndex];
      success = await updateSkill(skill.id ?? skill._id ?? "", data);
    } else {
      // Add new skill
      success = await addSkill(data);
    }

    if (success) {
      setShowForm(false);
      setEditIndex(null);
    } else {
      alert("Gagal menyimpan keterampilan. Silakan coba lagi.");
    }
  };

  if (loading) {
    return (
      <div className="mt-3">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Memuat data keterampilan...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-center py-8">
            <div className="text-red-500">{error}</div>
            <button onClick={fetchSkills} className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-end items-center mb-2">
          {!showForm && (
            <button onClick={handleAdd} className="inline-flex items-center bg-blue-600 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors">
              <Plus className="w-3 h-3 mr-1" />
              Tambah Keterampilan
            </button>
          )}
        </div>

        <h2 className="text-sm font-semibold pb-1">Keterampilan</h2>

        {/* Content */}
        {showForm ? (
          <KeterampilanForm
            mode={editIndex === null ? "add" : "edit"}
            initialData={
              editIndex !== null
                ? {
                    nama: skills[editIndex].nama || skills[editIndex].skill_name || "",
                    deskripsi: skills[editIndex].deskripsi || "",
                  }
                : undefined
            }
            onCancel={handleCancel}
            onSave={handleSave}
          />
        ) : (
          <div className="max-h-80 overflow-y-auto pr-1">
            {skills.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Belum ada keterampilan yang ditambahkan</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {skills.map((skill, idx) => (
                  <div key={skill.id || skill._id || idx} className="bg-white rounded-md border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{skill.skill_name || skill.nama || skill.name}</h3>
                      <div className="flex items-center gap-1 ml-2">
                        <button onClick={() => handleEdit(idx)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit keterampilan">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(idx)} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus keterampilan">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Card Content - Menghapus deskripsi sesuai permintaan */}
                    <div className="text-xs text-gray-600">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{skill.skill_level || skill.level || "Beginner"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
