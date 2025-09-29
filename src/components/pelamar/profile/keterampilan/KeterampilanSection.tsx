"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, WifiOff, CheckCircle, AlertCircle, Wifi, Edit, Upload } from "lucide-react";
import KeterampilanForm from "./KeterampilanForm";

interface Skill {
  id?: number | string;
  _id?: number | string;
  skill_name?: string;
  nama?: string;
  name?: string;
  skill_level?: string;
  level?: string;
  deskripsi?: string;
}

interface SkillFormData {
  nama: string;
  level?: string;
}

interface FileData {
  projectFiles: any;
  cv: any;
  certificate: any;
}

export default function KeterampilanSection() {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [authStatus, setAuthStatus] = useState('checking');
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([]);
  const [files, setFiles] = useState<FileData>({
    projectFiles: null,
    cv: null,
    certificate: null
  });

  // API Base URL - sesuaikan dengan URL API Anda
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  // Token management with multiple possible keys
  const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    
    const possibleKeys = ['jwt_token', 'token', 'authToken', 'accessToken'];
    for (const key of possibleKeys) {
      const token = localStorage.getItem(key);
      if (token && token !== 'YOUR_JWT_TOKEN' && token.length > 10) {
        return token;
      }
    }
    return null;
  };

  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return !!(token && token !== 'YOUR_JWT_TOKEN' && token.length > 10);
  };

  // Clear auth tokens
  const clearAuthTokens = (): void => {
    if (typeof window === 'undefined') return;
    
    const possibleKeys = ['jwt_token', 'token', 'authToken', 'accessToken'];
    possibleKeys.forEach(key => localStorage.removeItem(key));
  };

  // Load dummy data for different scenarios
  const loadDummyData = (scenario: string): void => {
    const dummySkills: Skill[] = [
      { id: 1, nama: 'JavaScript', level: 'Advanced' },
      { id: 2, nama: 'React', level: 'Intermediate' },
      { id: 3, nama: 'TypeScript', level: 'Intermediate' }
    ];

    const dummyPortfolioLinks = ['https://github.com/example', 'https://portfolio.example.com'];

    switch (scenario) {
      case 'expired':
        setSkills(dummySkills);
        setPortfolioLinks(dummyPortfolioLinks);
        setAuthStatus('expired');
        break;
      case 'no-permission':
        setSkills(dummySkills.slice(0, 2));
        setPortfolioLinks([dummyPortfolioLinks[0]]);
        setAuthStatus('unauthenticated');
        break;
      case 'error':
        setSkills(dummySkills);
        setPortfolioLinks(dummyPortfolioLinks);
        setAuthStatus('unauthenticated');
        break;
      default:
        setSkills(dummySkills);
        setPortfolioLinks(dummyPortfolioLinks);
        setAuthStatus('unauthenticated');
    }
  };

  // Save skills data to API
  const saveSkillsData = async (data: any): Promise<boolean> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/profile/skill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (err) {
      console.error('Error saving skills:', err);
      return false;
    }
  };

  // Fetch skills from API
  const fetchSkills = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token || !isAuthenticated()) {
        loadDummyData('no-permission');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/profile/skill`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle different response statuses
      if (response.status === 401) {
        console.warn('Authentication token expired or invalid');
        clearAuthTokens();
        loadDummyData('expired');
        setLoading(false);
        return;
      }

      if (response.status === 403) {
        setError('Akses ditolak - periksa permissions');
        setAuthStatus('unauthenticated');
        loadDummyData('no-permission');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setAuthStatus('authenticated');

      // Process skills data
      if (data.skills) {
        const skillsArray = typeof data.skills === 'string' 
          ? data.skills.split(', ').filter((skill: string) => skill.trim()).map((skill: string, index: number) => ({ id: index + 1, nama: skill }))
          : Array.isArray(data.skills) 
            ? data.skills.map((skill: any, index: number) => {
                if (typeof skill === 'object') {
                  return {
                    id: skill.id || skill._id || index + 1,
                    nama: skill.skill_name || skill.name || skill.nama || skill,
                    level: skill.skill_level || skill.level || 'Beginner'
                  };
                }
                return { id: index + 1, nama: skill };
              })
            : [];
        setSkills(skillsArray);
      } else {
        setSkills([]);
      }
      
      // Process portfolio links
      if (data.portfolio_links) {
        setPortfolioLinks(Array.isArray(data.portfolio_links) ? data.portfolio_links : [data.portfolio_links]);
      } else if (data.portfolioLinks) {
        setPortfolioLinks(Array.isArray(data.portfolioLinks) ? data.portfolioLinks : [data.portfolioLinks]);
      } else {
        setPortfolioLinks([]);
      }

      // Process files if available
      if (data.files) {
        setFiles({
          projectFiles: data.files.projectFiles || null,
          cv: data.files.cv || null,
          certificate: data.files.certificate || null
        });
      }
      
    } catch (err: any) {
      console.error('Error fetching skills:', err);
      
      if (err.name === 'NetworkError' || err.message.includes('Failed to fetch')) {
        setError('Koneksi bermasalah - menampilkan data demo');
        setIsOnline(false);
      } else {
        setError(`Gagal memuat data: ${err.message}`);
      }
      
      loadDummyData('error');
    } finally {
      setLoading(false);
    }
  };

  // Add new skill
  const addSkill = async (skillData: SkillFormData): Promise<boolean> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/profile/skill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          skills: skillData.nama,
          portfolio_links: portfolioLinks,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh skills list
      await fetchSkills();
      return true;
    } catch (err) {
      console.error('Error adding skill:', err);
      setError('Gagal menambah keterampilan');
      return false;
    }
  };

  // Update skill
  const updateSkill = async (skillId: string | number, skillData: SkillFormData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/skill/${skillId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          skill_name: skillData.nama,
          skill_level: skillData.level || 'Beginner',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Success - clear any previous errors
      setError(null);
      setAuthStatus('authenticated');
      
      // Optionally refresh data from server
      await fetchSkills();
      
      return true;
    } catch (err) {
      console.error('Error updating skill:', err);
      setError('Gagal mengupdate keterampilan');
      return false;
    }
  };

  // Delete skill
  const deleteSkill = async (skillId: string | number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/skill/${skillId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      await fetchSkills();
      return true;
    } catch (err) {
      console.error('Error deleting skill:', err);
      setError('Gagal menghapus keterampilan');
      return false;
    }
  };

  // Load skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  // Auto retry when coming back online
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (authStatus === 'unauthenticated' && isAuthenticated()) {
        fetchSkills();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [authStatus]);

  const handleEditClick = (): void => {
    setEditMode(true);
    setShowForm(true);
  };

  const handleEdit = (idx: number): void => {
    setEditIndex(idx);
    setShowForm(true);
    setEditMode(true);
  };

  const handleDelete = async (idx: number): Promise<void> => {
    if (confirm("Yakin mau hapus keterampilan ini?")) {
      const skill = skills[idx];
      
      if (isOnline && isAuthenticated() && (skill.id || skill._id)) {
        const success = await deleteSkill(skill.id || skill._id!);
        if (!success) {
          alert('Gagal menghapus keterampilan. Silakan coba lagi.');
        }
      } else {
        // Local delete
        const newSkills = skills.filter((_, index) => index !== idx);
        setSkills(newSkills);
        setError('Skill dihapus - perubahan disimpan lokal');
      }
    }
  };

  const handleAddSkill = (): void => {
    setEditIndex(null);
    setShowForm(true);
    setEditMode(true);
  };

  const handleCancel = (): void => {
    setShowForm(false);
    setEditMode(false);
    setEditIndex(null);
  };

  const handleSave = async (data: SkillFormData): Promise<void> => {
    let success = false;
    
    if (editIndex !== null) {
      // Update existing skill
      const skill = skills[editIndex];
      if (isOnline && isAuthenticated() && (skill.id || skill._id)) {
        success = await updateSkill(skill.id || skill._id!, data);
      } else {
        // Local update
        const newSkills = [...skills];
        newSkills[editIndex] = { ...newSkills[editIndex], ...data };
        setSkills(newSkills);
        success = true;
        setError('Perubahan disimpan lokal');
      }
    } else {
      // Add new skill
      if (isOnline && isAuthenticated()) {
        success = await addSkill(data);
      } else {
        // Local add
        const newSkill: Skill = {
          id: Date.now(),
          nama: data.nama,
          level: data.level
        };
        setSkills([...skills, newSkill]);
        success = true;
        setError('Skill ditambahkan - perubahan disimpan lokal');
      }
    }

    if (success) {
      setShowForm(false);
      setEditMode(false);
      setEditIndex(null);
      
      // Show success message briefly
      const originalError = error;
      setError('✓ Perubahan berhasil disimpan');
      setTimeout(() => {
        setError(originalError);
      }, 2000);
    } else {
      alert('Gagal menyimpan keterampilan. Silakan coba lagi.');
    }
  };

  const removeSkill = async (skillToRemove: Skill): Promise<void> => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    
    // Try to save to API if possible
    if (isOnline && isAuthenticated()) {
      await saveSkillsData({ nama: updatedSkills.map(s => s.nama).join(', ') });
    } else {
      setError('Skill dihapus - perubahan disimpan lokal');
    }
  };

  // Retry function for failed requests
  const handleRetry = (): void => {
    fetchSkills();
  };

  // Get status info for display
  const getStatusInfo = () => {
    if (!isOnline) {
      return { type: 'offline', message: 'Mode Offline', icon: WifiOff, color: 'orange' };
    }
    
    switch (authStatus) {
      case 'authenticated':
        return { type: 'success', message: 'Tersinkron', icon: CheckCircle, color: 'green' };
      case 'expired':
        return { type: 'warning', message: 'Token Kedaluwarsa', icon: AlertCircle, color: 'yellow' };
      case 'unauthenticated':
        return { type: 'info', message: 'Mode Demo', icon: AlertCircle, color: 'blue' };
      default:
        return { type: 'info', message: 'Memeriksa...', icon: Wifi, color: 'gray' };
    }
  };

  const statusInfo = getStatusInfo();

  if (loading) {
    return (
      <div className="mt-3">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              Memuat data keterampilan...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="max-w-5xl mx-auto">
        {showForm ? (
          <KeterampilanForm 
            mode={editIndex === null ? "add" : "edit"} 
            initialData={editIndex !== null ? skills[editIndex] : undefined} 
            onCancel={handleCancel} 
            onSave={handleSave} 
          />
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Header with Status and Edit Button */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Keterampilan</h2>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  statusInfo.color === 'green' ? 'bg-green-100 text-green-800' :
                  statusInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                  statusInfo.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                  statusInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  <statusInfo.icon className="w-3 h-3 mr-1" />
                  {statusInfo.message}
                </div>
              </div>
              <button 
                onClick={handleEditClick}
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Keterampilan
              </button>
            </div>

            {/* Error/Status Messages */}
            {error && (
              <div className={`mb-4 p-3 rounded-md flex items-start justify-between ${
                error.includes('✓') ? 'bg-green-100 border border-green-300' :
                error.includes('offline') || error.includes('Offline') ? 'bg-orange-100 border border-orange-300' :
                error.includes('kedaluwarsa') || error.includes('expired') ? 'bg-yellow-100 border border-yellow-300' :
                error.includes('demo') || error.includes('Demo') ? 'bg-blue-100 border border-blue-300' :
                'bg-red-100 border border-red-300'
              }`}>
                <div>
                  <p className={`text-sm font-medium ${
                    error.includes('✓') ? 'text-green-800' :
                    error.includes('offline') || error.includes('Offline') ? 'text-orange-800' :
                    error.includes('kedaluwarsa') || error.includes('expired') ? 'text-yellow-800' :
                    error.includes('demo') || error.includes('Demo') ? 'text-blue-800' :
                    'text-red-800'
                  }`}>
                    {error}
                  </p>
                  {(error.includes('kedaluwarsa') || error.includes('expired')) && (
                    <p className="text-xs text-yellow-600 mt-1">
                      Silakan login ulang untuk sinkronisasi dengan server
                    </p>
                  )}
                  {error.includes('offline') && (
                    <p className="text-xs text-orange-600 mt-1">
                      Perubahan akan disinkronkan ketika kembali online
                    </p>
                  )}
                </div>
                {(error.includes('Gagal') || error.includes('bermasalah')) && (
                  <button
                    onClick={handleRetry}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Coba Lagi
                  </button>
                )}
              </div>
            )}

            {/* Skills Display */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 transition-colors"
                    >
                      {skill.nama || skill.name || skill.skill_name}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-blue-600 transition-colors"
                        title="Hapus skill"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm italic">
                    Belum ada keterampilan yang ditambahkan
                  </div>
                )}
              </div>
              
              {/* Add Skill Button */}
              <button
                onClick={handleAddSkill}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
              >
                + Tambah Keterampilan
              </button>
            </div>

            {/* Portfolio Section */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Portofolio</h3>
              <div className="space-y-2">
                {portfolioLinks.length > 0 ? (
                  portfolioLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline block break-all transition-colors"
                    >
                      {link}
                    </a>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm italic">
                    Belum ada link portofolio yang ditambahkan
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Display Section */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">File Pendukung</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Project Files", key: "projectFiles" },
                  { title: "Curriculum Vitae", key: "cv" },
                  { title: "Paklaring Keahlian", key: "certificate" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-center hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 mb-3 text-sm">
                      {item.title}
                    </h4>
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6 text-gray-500" />
                      </div>
                      {files[item.key as keyof FileData] ? (
                        <p className="text-xs text-green-600 font-medium">
                          📎 {files[item.key as keyof FileData]?.name || `${item.key}_file.pdf`}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500">
                          Belum ada file yang diunggah
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}