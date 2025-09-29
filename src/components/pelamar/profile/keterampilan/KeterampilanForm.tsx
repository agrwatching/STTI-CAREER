"use client";

import { useState } from "react";
import { Plus, X, Upload } from "lucide-react";

type Props = {
  mode: "add" | "edit";
  initialData?: { nama: string };
  onCancel: () => void;
  onSave: (data: { nama: string }) => void;
};

export default function KeterampilanForm({
  mode,
  initialData,
  onCancel,
  onSave,
}: Props) {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(
    initialData?.nama ? initialData.nama.split(", ") : []
  );
  const [skillLevels, setSkillLevels] = useState<{ [key: string]: string }>({});
  const [links, setLinks] = useState([""]);
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk mendapatkan token autentikasi
  const getAuthToken = () => {
    // Sesuaikan dengan cara Anda menyimpan token
    // Opsi 1: Dari localStorage
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    
    // Opsi 2: Dari sessionStorage
    // const token = sessionStorage.getItem('authToken');
    
    // Opsi 3: Dari cookies (perlu library js-cookie)
    // import Cookies from 'js-cookie';
    // const token = Cookies.get('authToken');
    
    return token || '';
  };

  // Fungsi untuk menambahkan skill
  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkill = skillInput.trim();
      setSkills([...skills, newSkill]);
      // Set default level untuk skill baru
      setSkillLevels({ ...skillLevels, [newSkill]: "Beginner" });
      setSkillInput("");
    }
  };

  // Fungsi untuk menghapus skill
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    // Hapus juga level dari skill yang dihapus
    const newSkillLevels = { ...skillLevels };
    delete newSkillLevels[skillToRemove];
    setSkillLevels(newSkillLevels);
  };

  // Fungsi untuk update skill level
  const updateSkillLevel = (skill: string, level: string) => {
    setSkillLevels({ ...skillLevels, [skill]: level });
  };

  // Handle enter key untuk menambah skill
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // Fungsi untuk menambah link input
  const addLink = () => {
    setLinks([...links, ""]);
  };

  // Fungsi untuk update link
  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  // Fungsi untuk remove link
  const removeLink = (index: number) => {
    setLinks(links.filter((_, idx) => idx !== index));
  };

  // Fungsi untuk handle file change dengan validasi
  const handleFileChange = (idx: number, file: File | null) => {
    if (file) {
      // Validasi tipe file sesuai yang diizinkan backend
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/jpg', 
        'image/png'
      ];
      
      const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        alert(`❌ Tipe file tidak diizinkan!\n\nFile: ${file.name}\nTipe: ${file.type}\n\nHanya diperbolehkan: PDF, DOC, DOCX, JPG, PNG`);
        return;
      }
      
      // Validasi ukuran file (100MB = 100 * 1024 * 1024 bytes)
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`❌ Ukuran file terlalu besar!\n\nFile: ${file.name}\nUkuran: ${(file.size / 1024 / 1024).toFixed(2)} MB\n\nMaksimal: 100 MB`);
        return;
      }
    }
    
    const newFiles = [...files];
    newFiles[idx] = file;
    setFiles(newFiles);
  };

  // Fungsi untuk POST skill ke API - DIPERBAIKI
  const postSkillToAPI = async (skillName: string, skillLevel: string) => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token autentikasi tidak ditemukan. Silakan login kembali.');
    }

    try {
      console.log(`🚀 Posting skill: ${skillName} with level: ${skillLevel}`);
      
      const response = await fetch('https://apicareer-production.up.railway.app/api/profile/skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          // Tambahan headers yang mungkin diperlukan
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          skill_name: skillName,
          skill_level: skillLevel
        })
      });

      console.log(`📡 Response status for ${skillName}:`, response.status);

      // Log response headers untuk debugging
      console.log(`📋 Response headers for ${skillName}:`, Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        // Coba ambil error message dari response
        let errorMessage = `Failed to post skill: ${skillName} (Status: ${response.status})`;
        try {
          const errorData = await response.json();
          console.error(`❌ Error response for ${skillName}:`, errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // Jika response bukan JSON, gunakan status text
          const responseText = await response.text();
          console.error(`❌ Non-JSON error response for ${skillName}:`, responseText);
          errorMessage = responseText || `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log(`✅ Successfully posted skill ${skillName}:`, result);
      return result;
      
    } catch (error) {
      console.error(`💥 Error posting skill ${skillName}:`, error);
      
      // Tambahan debugging untuk network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('🌐 Network error - possible CORS or connection issue');
        throw new Error(`Network error saat posting skill ${skillName}. Periksa koneksi internet Anda.`);
      }
      
      throw error;
    }
  };

  // Fungsi untuk upload files - DIPERBAIKI
  const uploadFiles = async () => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Token autentikasi tidak ditemukan');
    }

    const formData = new FormData();
    
    // Mapping files berdasarkan dokumentasi API
    // Index 0: Portfolio File
    // Index 1: CV File
    // Index 2: Cover Letter
    if (files[0]) {
      console.log('📁 Adding portfolio_file:', files[0].name, files[0].type);
      formData.append('portfolio_file', files[0]);
    }
    if (files[1]) {
      console.log('📄 Adding cv_file:', files[1].name, files[1].type);
      formData.append('cv_file', files[1]);
    }
    if (files[2]) {
      console.log('📝 Adding cover_letter_file:', files[2].name, files[2].type);
      formData.append('cover_letter_file', files[2]);
    }

    // Hanya upload jika ada file
    const hasFiles = files.some(f => f !== null);
    if (!hasFiles) {
      console.log('📭 No files to upload');
      return null;
    }

    // Log semua files yang akan diupload
    console.log('📦 Files to upload:', {
      portfolio: files[0]?.name,
      cv: files[1]?.name,
      cover_letter: files[2]?.name
    });

    try {
      console.log('🚀 Sending file upload request...');
      const response = await fetch('https://apicareer-production.up.railway.app/api/profile/upload-files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // JANGAN tambahkan Content-Type untuk FormData, browser akan set otomatis
          'Accept': 'application/json',
        },
        body: formData
      });

      console.log('📡 Upload response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Failed to upload files';
        try {
          const errorData = await response.json();
          console.error('❌ Upload error response:', errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          const responseText = await response.text();
          console.error('❌ Non-JSON upload error:', responseText);
          errorMessage = responseText || `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ Upload success:', result);
      return result;
    } catch (error) {
      console.error('💥 Error uploading files:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error saat upload files. Periksa koneksi internet Anda.');
      }
      
      throw error;
    }
  };

  // Fungsi untuk test API endpoint
  const testAPIEndpoint = async () => {
    const token = getAuthToken();
    
    if (!token) {
      console.error('❌ No auth token found');
      return false;
    }

    try {
      console.log('🔍 Testing API endpoint...');
      
      // Test dengan GET request dulu untuk cek apakah endpoint exist
      const testResponse = await fetch('https://apicareer-production.up.railway.app/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      
      console.log('🧪 Test response status:', testResponse.status);
      
      if (testResponse.ok) {
        console.log('✅ Base API endpoint is accessible');
        return true;
      } else {
        console.log('❌ Base API endpoint returned:', testResponse.status);
        return false;
      }
    } catch (error) {
      console.error('💥 Error testing API endpoint:', error);
      return false;
    }
  };

  // Handle submit form - DIPERBAIKI
  const handleSubmit = async () => {
    // Validasi
    if (skills.length === 0) {
      alert("Mohon tambahkan minimal satu keterampilan");
      return;
    }

    // Cek token sebelum submit
    const token = getAuthToken();
    if (!token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    
    try {
      // 0. Test API endpoint terlebih dahulu
      console.log('🔍 Testing API accessibility...');
      const isAPIAccessible = await testAPIEndpoint();
      if (!isAPIAccessible) {
        throw new Error('API tidak dapat diakses. Periksa koneksi internet atau coba lagi nanti.');
      }

      // 1. Upload files terlebih dahulu jika ada
      let uploadResult = null;
      if (files.some(f => f !== null)) {
        console.log("📤 Uploading files...");
        uploadResult = await uploadFiles();
        console.log("✅ Files uploaded successfully:", uploadResult);
      }

      // 2. Post setiap skill ke API dengan level yang sesuai
      console.log("📝 Posting skills...");
      const skillErrors: string[] = [];
      const successfulSkills: string[] = [];
      
      // Post skills satu per satu untuk better error handling
      for (const skill of skills) {
        try {
          const level = skillLevels[skill] || "Beginner";
          console.log(`🎯 Posting skill: ${skill} with level: ${level}`);
          await postSkillToAPI(skill, level);
          successfulSkills.push(skill);
          console.log(`✅ Successfully posted: ${skill}`);
        } catch (error) {
          console.error(`❌ Failed to post skill: ${skill}`, error);
          skillErrors.push(`${skill}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // 3. Evaluasi hasil
      if (skillErrors.length > 0 && successfulSkills.length === 0) {
        // Semua skill gagal
        throw new Error(`Gagal menyimpan semua keterampilan:\n\n${skillErrors.join('\n')}`);
      } else if (skillErrors.length > 0) {
        // Sebagian skill gagal
        console.warn('⚠️ Some skills failed to post:', skillErrors);
        alert(`⚠️ Sebagian data berhasil disimpan:\n\n✅ Berhasil: ${successfulSkills.join(', ')}\n\n❌ Gagal: ${skillErrors.join('\n')}`);
      } else {
        // Semua skill berhasil
        console.log("✅ Successfully posted all skills:", successfulSkills);
      }
      
      // 4. Call the original onSave callback untuk update UI parent component
      onSave({ nama: skills.join(", ") });
      
      // 5. Tampilkan success message jika tidak ada error
      if (skillErrors.length === 0) {
        alert("🎉 Semua keterampilan dan file berhasil disimpan!");
      }
      
    } catch (error) {
      console.error("💥 Error in handleSubmit:", error);
      
      // Tampilkan error message yang lebih informatif
      let errorMessage = "Terjadi kesalahan saat menyimpan data.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      // Tambahkan hint untuk error umum
      if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
        errorMessage += "\n\n💡 Token Anda mungkin sudah kadaluarsa. Silakan login ulang.";
      } else if (errorMessage.includes("404") || errorMessage.includes("Not Found")) {
        errorMessage += "\n\n💡 Endpoint API tidak ditemukan. Mungkin ada masalah dengan server atau URL API.";
      } else if (errorMessage.includes("500")) {
        errorMessage += "\n\n💡 Terjadi kesalahan di server. Silakan coba lagi nanti.";
      } else if (errorMessage.includes("Network error") || errorMessage.includes("fetch")) {
        errorMessage += "\n\n💡 Periksa koneksi internet Anda dan coba lagi.";
      }
      
      alert(`❌ Gagal menyimpan data:\n\n${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Skills Input Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keterampilan <span className="text-red-500">*</span>
        </label>
        
        {/* Skills Input */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Contoh: HTML, CSS, Data Science"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addSkill}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition-colors"
          >
            Tambah
          </button>
        </div>

        {/* Skills Tags with Level Selector */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 gap-2"
            >
              <span className="font-semibold">{skill}</span>
              <select
                value={skillLevels[skill] || "Beginner"}
                onChange={(e) => updateSkillLevel(skill, e.target.value)}
                className="text-xs bg-white border border-green-300 rounded px-2 py-0.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-green-600 transition-colors"
                title="Hapus skill"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              Belum ada keterampilan yang ditambahkan
            </p>
          )}
        </div>
        
        {skills.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            💡 Pilih level untuk setiap keterampilan sebelum menyimpan
          </p>
        )}
      </div>

      {/* Portfolio Links Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Portofolio Online & Tautan Terkait
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Tambahkan Tautan</label>
            {links.map((link, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => updateLink(idx, e.target.value)}
                  placeholder="https://example.com/portfolio"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(idx)}
                    className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors"
                    title="Hapus link"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addLink}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" /> 
              Tambah Tautan Lain
            </button>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Unggah File Pendukung
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Portfolio File",
              desc: "Unggah portfolio Anda dalam format PDF atau DOC/DOCX (maks 100MB)",
              maxSize: "100MB",
              accept: ".pdf,.doc,.docx",
              formats: "PDF, DOC, DOCX"
            },
            {
              title: "Curriculum Vitae", 
              desc: "Unggah CV Anda dalam format PDF atau DOC/DOCX (maks 100MB)",
              maxSize: "100MB",
              accept: ".pdf,.doc,.docx",
              formats: "PDF, DOC, DOCX"
            },
            {
              title: "Cover Letter",
              desc: "Unggah surat lamaran dalam format PDF atau DOC/DOCX (maks 100MB)", 
              maxSize: "100MB",
              accept: ".pdf,.doc,.docx",
              formats: "PDF, DOC, DOCX"
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <h4 className="font-medium text-gray-900 mb-2 text-sm">
                {item.title}
              </h4>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {item.desc}
              </p>
              
              <label className="block cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept={item.accept}
                  onChange={(e) =>
                    handleFileChange(idx, e.target.files?.[0] || null)
                  }
                />
                <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-xs text-center">
                    <span className="text-blue-600 hover:underline font-medium">
                      Unggah File
                    </span>{" "}
                    atau tarik & seret
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Maksimal {item.maxSize}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Format: {item.formats}
                  </p>
                </div>
              </label>
              
              {files[idx] && (
                <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200 relative">
                  <div className="pr-6">
                    <p className="text-xs text-blue-800 font-medium truncate">
                      📎 {files[idx]?.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {((files[idx]?.size || 0) / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => handleFileChange(idx, null)}
                    className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
                    title="Hapus file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          ℹ️ File bersifat opsional, tetapi sangat direkomendasikan untuk melengkapi profil Anda
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          type="button"
          className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Batal
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading || skills.length === 0}
          className="px-6 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Menyimpan...
            </span>
          ) : (
            "Simpan Perubahan"
          )}
        </button>
      </div>

      {/* Enhanced Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs space-y-2">
          <p className="font-bold mb-2">🐛 Debug Info:</p>
          <div className="grid grid-cols-2 gap-2">
            <p>Token tersedia: {getAuthToken() ? '✅ Ya' : '❌ Tidak'}</p>
            <p>Jumlah skills: {skills.length}</p>
            <p>Files terupload: {files.filter(f => f !== null).length}/3</p>
            <p>API Base URL: apicareer-production.up.railway.app</p>
          </div>
          <div className="mt-2 p-2 bg-white rounded">
            <p className="font-semibold">📋 Skills & Levels:</p>
            {skills.map(skill => (
              <p key={skill} className="text-xs">
                • {skill}: {skillLevels[skill] || 'Beginner'}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}