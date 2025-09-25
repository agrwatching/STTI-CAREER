"use client";

import { useState, FormEvent, useEffect } from "react";

type Pengalaman = {
  id?: string | number;
  posisi: string;
  perusahaan: string;
  deskripsi: string;
  tahunMasuk: string;
  tahunKeluar: string;
  isCurrentJob?: boolean;
};

type PengalamanFormProps = {
  mode?: "add" | "edit";
  data?: Pengalaman;
  onSave?: (values: Pengalaman) => void;
  onCancel?: () => void;
  onDelete?: (id: string | number) => void;
};

export default function PengalamanForm({
  mode = "add",
  data,
  onSave,
  onCancel,
  onDelete,
}: PengalamanFormProps) {
  const [values, setValues] = useState<Pengalaman>({
    id: data?.id || undefined,
    posisi: data?.posisi || "",
    perusahaan: data?.perusahaan || "",
    tahunMasuk: data?.tahunMasuk || "",
    tahunKeluar: data?.tahunKeluar || "",
    deskripsi: data?.deskripsi || "",
    isCurrentJob: data?.isCurrentJob || false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Update form values ketika data prop berubah (untuk mode edit)
  useEffect(() => {
    if (data && mode === "edit") {
      console.log("Updating form values with data:", data);
      setValues({
        id: data.id,
        posisi: data.posisi || "",
        perusahaan: data.perusahaan || "",
        tahunMasuk: data.tahunMasuk || "",
        tahunKeluar: data.tahunKeluar || "",
        deskripsi: data.deskripsi || "",
        isCurrentJob: data.isCurrentJob || false,
      });
    }
  }, [data, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setValues((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
    
    // Clear tahun keluar jika pekerjaan saat ini dicentang
    if (name === "isCurrentJob" && checked) {
      setValues((prev) => ({ 
        ...prev, 
        isCurrentJob: true,
        tahunKeluar: ""
      }));
    }
    
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || sessionStorage.getItem("token");
    }
    return null;
  };

  // Validasi form data
  const validateFormData = (data: Pengalaman): string | null => {
    if (!data.posisi?.trim()) return "Posisi harus diisi";
    if (!data.perusahaan?.trim()) return "Nama perusahaan harus diisi";
    if (!data.tahunMasuk?.trim()) return "Tahun masuk harus diisi";
    if (!data.isCurrentJob && !data.tahunKeluar?.trim()) {
      return "Tahun keluar harus diisi jika bukan pekerjaan saat ini";
    }
    if (!data.deskripsi?.trim()) return "Deskripsi pekerjaan harus diisi";

    // Validasi tahun
    const tahunMasuk = parseInt(data.tahunMasuk);
    const currentYear = new Date().getFullYear();
    
    if (isNaN(tahunMasuk) || tahunMasuk < 1900 || tahunMasuk > currentYear + 10) {
      return "Tahun masuk tidak valid";
    }
    
    if (!data.isCurrentJob && data.tahunKeluar) {
      const tahunKeluar = parseInt(data.tahunKeluar);
      
      if (isNaN(tahunKeluar) || tahunKeluar < 1900 || tahunKeluar > currentYear + 10) {
        return "Tahun keluar tidak valid";
      }
      
      if (tahunKeluar < tahunMasuk) {
        return "Tahun keluar tidak boleh lebih kecil dari tahun masuk";
      }
    }

    return null;
  };

  // Format payload untuk API
  const formatPayload = (data: Pengalaman) => {
    const payload = {
      company_name: data.perusahaan.trim(),
      position: data.posisi.trim(),
      start_date: `${data.tahunMasuk.trim()}-01-15`, // Format: YYYY-MM-DD
      end_date: data.isCurrentJob ? null : `${data.tahunKeluar.trim()}-12-31`,
      is_current: Boolean(data.isCurrentJob),
      job_description: data.deskripsi.trim(),
    };
    
    console.log("Formatted payload:", payload);
    return payload;
  };

  // POST - Tambah pengalaman kerja baru
  const postWorkExperience = async (data: Pengalaman) => {
    const token = getToken();
    
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }

    const validationError = validateFormData(data);
    if (validationError) {
      throw new Error(validationError);
    }

    const payload = formatPayload(data);
    console.log("POST Request - URL:", "https://apicareer-production.up.railway.app/api/profile/work-experience");
    console.log("POST Request - Payload:", payload);

    try {
      const response = await fetch(
        "https://apicareer-production.up.railway.app/api/profile/work-experience",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("POST Response status:", response.status);

      const responseText = await response.text();
      console.log("POST Response text:", responseText);
      
      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.log("Response is not JSON, treating as text");
        responseData = { message: responseText };
      }

      console.log("POST Response data:", responseData);

      if (!response.ok) {
        const errorMessage = responseData?.message || 
                           responseData?.error || 
                           responseText ||
                           `Server error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return responseData;
    } catch (fetchError) {
      console.error("POST Fetch error:", fetchError);
      
      if (fetchError instanceof TypeError && fetchError.message.includes("fetch")) {
        throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      }
      
      throw fetchError;
    }
  };

  // PUT - Update pengalaman kerja
  const updateWorkExperience = async (data: Pengalaman) => {
    const token = getToken();
    
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }

    // Pastikan ID ada untuk update
    if (!data.id) {
      throw new Error("ID pengalaman kerja tidak ditemukan untuk update. Data mungkin belum tersimpan.");
    }

    const validationError = validateFormData(data);
    if (validationError) {
      throw new Error(validationError);
    }

    const payload = formatPayload(data);
    const updateUrl = `https://apicareer-production.up.railway.app/api/profile/work-experience/${data.id}`;
    
    console.log("PUT Request - URL:", updateUrl);
    console.log("PUT Request - ID:", data.id);
    console.log("PUT Request - Payload:", payload);
    console.log("PUT Request - Headers:", {
      Authorization: `Bearer ${token.substring(0, 20)}...`,
      "Content-Type": "application/json"
    });

    try {
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("PUT Response status:", response.status);
      console.log("PUT Response headers:", Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log("PUT Response text:", responseText);
      
      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.log("Response is not JSON, treating as text");
        responseData = { message: responseText };
      }

      console.log("PUT Response data:", responseData);

      if (!response.ok) {
        let errorMessage;
        
        switch (response.status) {
          case 400:
            errorMessage = responseData?.message || "Data yang dikirim tidak valid";
            break;
          case 401:
            errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
            break;
          case 403:
            errorMessage = "Anda tidak memiliki izin untuk mengupdate data ini";
            break;
          case 404:
            errorMessage = "Data pengalaman kerja tidak ditemukan";
            break;
          case 422:
            errorMessage = responseData?.message || "Data yang dikirim tidak sesuai format";
            break;
          case 500:
            errorMessage = "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
            break;
          default:
            errorMessage = responseData?.message || 
                          responseData?.error || 
                          responseText ||
                          `Server error: ${response.status} ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      // Jika response OK tapi kosong, anggap berhasil
      if (!responseData || Object.keys(responseData).length === 0) {
        responseData = { 
          message: "Data berhasil diperbarui",
          data: { id: data.id, ...payload }
        };
      }

      return responseData;
    } catch (fetchError) {
      console.error("PUT Fetch error:", fetchError);
      
      if (fetchError instanceof TypeError && fetchError.message.includes("fetch")) {
        throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      }
      
      throw fetchError;
    }
  };

  // DELETE - Hapus pengalaman kerja
  const deleteWorkExperience = async (id: string | number) => {
    const token = getToken();
    
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }

    if (!id) {
      throw new Error("ID pengalaman kerja tidak ditemukan untuk penghapusan.");
    }

    const deleteUrl = `https://apicareer-production.up.railway.app/api/profile/work-experience/${id}`;
    console.log("DELETE Request - URL:", deleteUrl);
    console.log("DELETE Request - ID:", id);

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("DELETE Response status:", response.status);

      const responseText = await response.text();
      console.log("DELETE Response text:", responseText);
      
      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.log("Response is not JSON, treating as text");
        responseData = { message: responseText || "Data berhasil dihapus" };
      }

      console.log("DELETE Response data:", responseData);

      if (!response.ok) {
        const errorMessage = responseData?.message || 
                           responseData?.error || 
                           responseText ||
                           `Server error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return responseData;
    } catch (fetchError) {
      console.error("DELETE Fetch error:", fetchError);
      
      if (fetchError instanceof TypeError && fetchError.message.includes("fetch")) {
        throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      }
      
      throw fetchError;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    console.log("=== FORM SUBMIT STARTED ===");
    console.log("Mode:", mode);
    console.log("Current values:", values);
    
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validasi form terlebih dahulu
    const validationError = validateFormData(values);
    if (validationError) {
      console.log("Validation error:", validationError);
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      let result;
      
      if (mode === "add") {
        console.log("=== EXECUTING POST REQUEST ===");
        result = await postWorkExperience(values);
        console.log("POST result:", result);
        
        setSuccess("Pengalaman kerja berhasil ditambahkan!");
        
        // Reset form setelah berhasil (hanya untuk mode add)
        setValues({
          posisi: "",
          perusahaan: "",
          tahunMasuk: "",
          tahunKeluar: "",
          deskripsi: "",
          isCurrentJob: false,
        });
        
      } else if (mode === "edit") {
        console.log("=== EXECUTING PUT REQUEST ===");
        
        if (!values.id) {
          throw new Error("ID tidak ditemukan untuk update. Pastikan data sudah tersimpan sebelumnya.");
        }
        
        result = await updateWorkExperience(values);
        console.log("PUT result:", result);
        
        setSuccess("Pengalaman kerja berhasil diperbarui!");
      }

      // Panggil callback onSave jika ada
      if (onSave) {
        // Untuk mode add, gunakan ID dari response jika ada
        // Untuk mode edit, gunakan data yang sudah ada
        const savedData = mode === "add" && result?.data?.id 
          ? { ...values, id: result.data.id }
          : values;
          
        console.log("Calling onSave with data:", savedData);
        onSave(savedData);
      }

      // Auto hide success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
        
    } catch (err) {
      console.error("=== SUBMIT ERROR ===", err);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      console.log("=== FORM SUBMIT COMPLETED ===");
    }
  };

  const handleDelete = async () => {
    if (!values.id) {
      setError("ID tidak ditemukan untuk penghapusan");
      return;
    }

    setIsDeleting(true);
    setError("");
    setSuccess("");

    try {
      console.log("=== EXECUTING DELETE REQUEST ===");
      const result = await deleteWorkExperience(values.id);
      console.log("DELETE result:", result);
      
      setSuccess("Pengalaman kerja berhasil dihapus!");
      
      // Panggil callback onDelete jika ada
      if (onDelete) onDelete(values.id);
      
      // Auto hide success message dan close modal
      setTimeout(() => {
        setSuccess("");
        setShowDeleteConfirm(false);
        if (onCancel) onCancel(); // Close form after successful delete
      }, 1500);
      
    } catch (err) {
      console.error("=== DELETE ERROR ===", err);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus data";
      setError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-800">
            {mode === "add" ? "Tambah Pengalaman Kerja" : "Edit Pengalaman Kerja"}
          </h3>
          {mode === "edit" && values.id && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isLoading || isDeleting}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Success Message */}
        {success && (
          <div className="text-green-600 text-xs bg-green-50 border border-green-200 rounded p-2 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded p-2 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Posisi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="posisi"
              value={values.posisi}
              onChange={handleChange}
              disabled={isLoading || isDeleting}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
              placeholder="Contoh: Senior Software Developer"
              maxLength={100}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Nama Perusahaan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="perusahaan"
              value={values.perusahaan}
              onChange={handleChange}
              disabled={isLoading || isDeleting}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
              placeholder="Contoh: PT Tech Innovate Indonesia"
              maxLength={100}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Tahun Masuk <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="tahunMasuk"
              value={values.tahunMasuk}
              onChange={handleChange}
              disabled={isLoading || isDeleting}
              min="1900"
              max={new Date().getFullYear() + 10}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
              placeholder="Contoh: 2022"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Tahun Keluar {!values.isCurrentJob && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              name="tahunKeluar"
              value={values.tahunKeluar}
              onChange={handleChange}
              disabled={isLoading || isDeleting || values.isCurrentJob}
              min="1900"
              max={new Date().getFullYear() + 10}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
              placeholder={values.isCurrentJob ? "Masih bekerja" : "Contoh: 2024"}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-xs text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
            <input
              type="checkbox"
              name="isCurrentJob"
              checked={values.isCurrentJob}
              onChange={handleChange}
              disabled={isLoading || isDeleting}
              className="mr-2 h-3 w-3 text-blue-600 focus:ring-blue-400 border-gray-300 rounded
                disabled:cursor-not-allowed"
            />
            <span className={values.isCurrentJob ? "text-blue-600 font-medium" : ""}>
              Saya masih bekerja di posisi ini
            </span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 pb-1">
            Deskripsi Pekerjaan <span className="text-red-500">*</span>
          </label>
          <textarea
            name="deskripsi"
            value={values.deskripsi}
            onChange={handleChange}
            disabled={isLoading || isDeleting}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none
              disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
            rows={4}
            placeholder="Mengembangkan aplikasi web menggunakan Node.js, React, dan MySQL. Bertanggung jawab atas desain database dan implementasi API RESTful..."
            maxLength={500}
            required
          />
          <div className="text-xs text-gray-400 mt-1 flex justify-between">
            <span>{values.deskripsi.length}/500 karakter</span>
            {values.deskripsi.length > 450 && (
              <span className="text-orange-500">Mendekati batas maksimal</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading || isDeleting}
            className="px-4 py-1.5 text-xs bg-gray-400 text-white rounded 
              hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading || isDeleting || (mode === "edit" && !values.id)}
            className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded 
              hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-1 min-w-[120px] justify-center"
          >
            {isLoading && (
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {isLoading
              ? "Menyimpan..."
              : mode === "add"
              ? "Tambah Pengalaman"
              : "Perbarui Data"}
          </button>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-gray-500 border-t">
            <p>Debug: Mode = {mode}, ID = {values.id || 'none'}</p>
            <p>Current Job: {values.isCurrentJob ? 'Ya' : 'Tidak'}</p>
            <p>Token: {getToken() ? 'Ada' : 'Tidak ada'}</p>
            <p>Submit Disabled: {mode === "edit" && !values.id ? 'Ya (No ID)' : 'Tidak'}</p>
          </div>
        )}
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM8 13a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-800">
                Konfirmasi Hapus
              </h4>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus pengalaman kerja <span className="font-semibold">"{values.posisi}"</span> di <span className="font-semibold">"{values.perusahaan}"</span>? 
              <br />
              <span className="font-medium text-red-600 mt-2 block">Tindakan ini tidak dapat dibatalkan.</span>
            </p>
            
            {error && (
              <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded p-2 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-xs bg-green-50 border border-green-200 rounded p-2 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setError("");
                  setSuccess("");
                }}
                disabled={isDeleting}
                className="px-4 py-2 text-sm bg-gray-400 text-white rounded 
                  hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded 
                  hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center gap-1 min-w-[80px] justify-center"
              >
                {isDeleting && (
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}