"use client";

import { useState, useEffect } from "react";

type User = {
  full_name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  date_of_birth?: string | null;
  profile_photo?: string | null;
  profile_photo_url?: string | null;
};

type Props = {
  user: User;
  isEditing: boolean;
  onCancel: () => void;
  onSaveSuccess: (updated: Partial<User>) => void;
};

export default function Biodata({
  user,
  isEditing,
  onCancel,
  onSaveSuccess,
}: Props) {
  const [formData, setFormData] = useState<User>({
    full_name: user.full_name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    date_of_birth: user.date_of_birth || "",
    profile_photo: user.profile_photo || "",
    profile_photo_url: user.profile_photo_url || "",
  });
  
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // 🔧 Initialize photo preview when user data changes
  useEffect(() => {
    const initialPhotoUrl = user.profile_photo_url || user.profile_photo;
    setPhotoPreview(initialPhotoUrl || null);
    
    // Reset form when user changes
    setFormData({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      country: user.country || "",
      date_of_birth: user.date_of_birth || "",
      profile_photo: user.profile_photo || "",
      profile_photo_url: user.profile_photo_url || "",
    });
  }, [user]);

  // 🔧 Clear errors when editing mode changes
  useEffect(() => {
    if (!isEditing) {
      setErrors({});
      setPhotoFile(null);
    }
  }, [isEditing]);

  /** ✅ Validate form data */
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Nama lengkap tidak boleh kosong";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (formData.phone && !/^[0-9\-\+\(\)\s]+$/.test(formData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    if (photoFile && !photoFile.type.startsWith('image/')) {
      newErrors.photo = "File yang dipilih harus berupa gambar";
    }

    if (photoFile && photoFile.size > 5 * 1024 * 1024) { // 5MB limit
      newErrors.photo = "Ukuran file tidak boleh lebih dari 5MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** ✅ Update input text */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /** ✅ Handle photo selection */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (!file) {
      setPhotoFile(null);
      setPhotoPreview(user.profile_photo_url || user.profile_photo || null);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, photo: "File yang dipilih harus berupa gambar" }));
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: "Ukuran file tidak boleh lebih dari 5MB" }));
      return;
    }

    // Clear photo error
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.photo;
      return newErrors;
    });

    setPhotoFile(file);
    
    // Create preview URL
    const tempUrl = URL.createObjectURL(file);
    setPhotoPreview(tempUrl);

    console.log("📷 Photo selected:", {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      type: file.type
    });
  };

  /** ✅ Remove photo selection */
  const handleRemovePhoto = () => {
    if (photoFile && photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }
    
    setPhotoFile(null);
    setPhotoPreview(user.profile_photo_url || user.profile_photo || null);
    
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    // Clear photo error
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.photo;
      return newErrors;
    });
  };

  /** ✅ Upload photo to server */
  const uploadPhoto = async (token: string): Promise<string | null> => {
    if (!photoFile) return null;

    try {
      setUploadProgress(0);
      
      const formDataImg = new FormData();
      formDataImg.append("profile_photo", photoFile);

      console.log("📤 Uploading photo:", photoFile.name);

      const xhr = new XMLHttpRequest();
      
      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(progress);
          }
        });

        xhr.onload = () => {
          setUploadProgress(100);
          
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              console.log("✅ Upload success response:", response);
              
              // Coba berbagai kemungkinan struktur response
              const photoUrl = response.url || 
                              response.profile_photo_url ||
                              response.data?.url ||
                              response.data?.profile_photo_url ||
                              (response.filename ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${response.filename}` : null) ||
                              (response.data?.filename ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${response.data.filename}` : null);

              if (photoUrl) {
                resolve(photoUrl);
              } else {
                console.error("❌ No photo URL in response:", response);
                reject(new Error("URL foto tidak ditemukan dalam response server"));
              }
            } catch (parseError) {
              console.error("❌ Failed to parse upload response:", parseError);
              reject(new Error("Response server tidak valid"));
            }
          } else {
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              reject(new Error(errorResponse.message || "Gagal upload foto"));
            } catch {
              reject(new Error(`Upload failed with status: ${xhr.status}`));
            }
          }
        };

        xhr.onerror = () => {
          reject(new Error("Koneksi gagal saat upload foto"));
        };

        xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/api/profile/upload-photo`);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formDataImg);
      });

    } catch (error) {
      console.error("❌ Upload error:", error);
      throw new Error("Gagal upload foto: " + (error as Error).message);
    }
  };

  /** ✅ Save biodata and photo */
  const handleSave = async () => {
    // Validate form before saving
    if (!validateForm()) {
      console.log("❌ Form validation failed:", errors);
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);
      
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      console.log("💾 Starting save process...");

      // 1️⃣ Update biodata text fields
      const cleanFormData = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v || null])
      );

      console.log("📝 Updating biodata:", cleanFormData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile/biodata`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanFormData),
        }
      );

      const biodataResponse = await res.json();
      console.log("📝 Biodata update response:", biodataResponse);

      if (!res.ok) {
        throw new Error(biodataResponse.message || "Gagal update biodata");
      }

      // 2️⃣ Upload photo if selected
      let photoUrl: string | null = null;
      if (photoFile) {
        try {
          photoUrl = await uploadPhoto(token);
          console.log("📷 Photo uploaded successfully:", photoUrl);
        } catch (photoError) {
          console.error("❌ Photo upload failed:", photoError);
          throw new Error("Biodata berhasil disimpan, tetapi gagal upload foto: " + (photoError as Error).message);
        }
      }

      // 3️⃣ Update final data with photo URL if uploaded
      const finalData = { ...cleanFormData };
      if (photoUrl) {
        finalData.profile_photo_url = photoUrl;
        
        // Update local state
        setFormData(prev => ({
          ...prev,
          profile_photo_url: photoUrl
        }));
        
        // Update preview with new URL
        setPhotoPreview(photoUrl);
        
        // Clear photo file since it's now uploaded
        setPhotoFile(null);
        
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }

      console.log("✅ Save completed successfully:", finalData);
      
      alert("✅ Biodata berhasil diperbarui!");
      onSaveSuccess(finalData);

    } catch (err) {
      console.error("❌ Save error:", err);
      const errorMessage = (err as Error).message || "Terjadi kesalahan server";
      alert(`❌ ${errorMessage}`);
      
      // If it's a photo upload error but biodata was saved, refresh the page data
      if (errorMessage.includes("Biodata berhasil disimpan")) {
        // Optionally trigger a data refresh here
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  /** ✅ Cancel editing */
  const handleCancel = () => {
    // Reset form to original data
    setFormData({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      country: user.country || "",
      date_of_birth: user.date_of_birth || "",
      profile_photo: user.profile_photo || "",
      profile_photo_url: user.profile_photo_url || "",
    });

    // Reset photo states
    if (photoFile && photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(null);
    setPhotoPreview(user.profile_photo_url || user.profile_photo || null);
    
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    // Clear errors
    setErrors({});
    setUploadProgress(0);

    onCancel();
  };

  return (
    <div className="space-y-4">
      {/* Progress bar for photo upload */}
      {loading && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="text-sm text-gray-600 mt-1">Upload foto: {uploadProgress}%</p>
        </div>
      )}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nama Lengkap */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${
              errors.full_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan nama lengkap"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
            placeholder="Email tidak dapat diubah"
          />
          <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
        </div>

        {/* Nomor Telepon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Contoh: +62 812-3456-7890"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Alamat */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Alamat
          </label>
          <input
            type="text"
            name="address"
            value={formData.address ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Masukkan alamat lengkap"
          />
        </div>

        {/* Kota */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kota
          </label>
          <input
            type="text"
            name="city"
            value={formData.city ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Masukkan nama kota"
          />
        </div>

        {/* Negara */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Negara
          </label>
          <input
            type="text"
            name="country"
            value={formData.country ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Masukkan nama negara"
          />
        </div>

        {/* Tanggal Lahir */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tanggal Lahir
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Upload Foto */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Foto Profil
          </label>
          <div className="mt-1">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${
                errors.photo ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Format: JPG, PNG, GIF. Maksimal 5MB
            </p>
          </div>

          {/* Photo Preview */}
          {photoPreview && (
            <div className="mt-4 flex items-start space-x-4">
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview Foto Profil"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                  onError={(e) => {
                    console.error("❌ Error loading image:", photoPreview);
                    e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NCA2NEw3MCA3OEw1OCA3MEw0NCA4NEg4NFY2NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPGNpcmNsZSBjeD0iNTgiIGN5PSI1MiIgcj0iOCIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
                  }}
                />
                {isEditing && (photoFile || photoPreview !== (user.profile_photo_url || user.profile_photo)) && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Hapus foto"
                  >
                    ×
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                {photoFile && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>File baru:</strong> {photoFile.name}</p>
                    <p><strong>Ukuran:</strong> {(photoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p><strong>Tipe:</strong> {photoFile.type}</p>
                  </div>
                )}
                {!photoFile && (user.profile_photo_url || user.profile_photo) && (
                  <div className="text-sm text-gray-600">
                    <p><strong>Foto saat ini</strong></p>
                    <p className="text-xs break-all">{user.profile_photo_url || user.profile_photo}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="md:col-span-2 flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="flex-1 md:flex-none bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {uploadProgress > 0 && uploadProgress < 100 ? `Upload ${uploadProgress}%` : 'Menyimpan...'}
                </div>
              ) : (
                "💾 Simpan Perubahan"
              )}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 md:flex-none bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 font-medium"
            >
              Batal
            </button>
          </div>
        )}
      </form>
    </div>
  );
}