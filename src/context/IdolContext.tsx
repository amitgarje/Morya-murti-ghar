import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockIdols } from '../admin/data/mockData';
import type { Idol } from '../admin/data/mockData';

interface IdolContextType {
  idols: Idol[];
  addIdol: (formData: FormData) => Promise<void>;
  updateIdol: (id: string, formData: FormData) => Promise<void>;
  deleteIdol: (id: string) => Promise<void>;
}

const IdolContext = createContext<IdolContextType | undefined>(undefined);

const API_URL = 'http://localhost:8080/api/idols';

export function IdolProvider({ children }: { children: React.ReactNode }) {
  const [idols, setIdols] = useState<Idol[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from Backend, fallback to localStorage/mockData
  const fetchIdols = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setIdols(data);
        setIsLoaded(true);
        return;
      }
    } catch (e) {
      console.warn("Backend not running, falling back to local storage");
    }
    
    // Fallback logic
    const saved = localStorage.getItem('morya_idols');
    if (saved) {
      try {
        setIdols(JSON.parse(saved));
      } catch (e) {
        setIdols(mockIdols);
      }
    } else {
      setIdols(mockIdols);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchIdols();
  }, []);

  // Save to localStorage whenever idols change (as a backup)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('morya_idols', JSON.stringify(idols));
    }
  }, [idols, isLoaded]);

  const addIdol = async (formData: FormData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData, // browser automatically sets multipart/form-data boundary
      });
      if (res.ok) {
        const newIdol = await res.json();
        setIdols(prev => [newIdol, ...prev]);
        return;
      } else {
        throw new Error(await res.text());
      }
    } catch (e) {
      console.error("Backend error, falling back to local state", e);
      // Fallback: convert file to Base64 to store in localStorage
      let imageUrl = '/ganesh-hero.png';
      const file = formData.get('image') as File;
      if (file && file.size > 0) {
        try {
          imageUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        } catch (err) {
          console.error("Failed to read image as Base64", err);
        }
      }

      const newIdol: Idol = {
        id: `i${Date.now()}`,
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        heightCm: Number(formData.get('heightCm')),
        material: formData.get('material') as any,
        description: formData.get('description') as string,
        status: formData.get('status') as any,
        images: [imageUrl],
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setIdols(prev => [newIdol, ...prev]);
    }
  };

  const updateIdol = async (id: string, formData: FormData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (res.ok) {
        const updatedIdol = await res.json();
        setIdols(prev => prev.map(idol => idol.id === id ? updatedIdol : idol));
        return;
      } else {
        throw new Error(await res.text());
      }
    } catch (e) {
      console.error("Backend error, falling back to local state", e);
      // Simplified local fallback
      const updates: Partial<Idol> = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        heightCm: Number(formData.get('heightCm')),
        material: formData.get('material') as any,
        description: formData.get('description') as string,
        status: formData.get('status') as any,
      };
      setIdols(prev => prev.map(idol => idol.id === id ? { ...idol, ...updates } : idol));
    }
  };

  const deleteIdol = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setIdols(prev => prev.filter(idol => idol.id !== id));
        return;
      } else {
        throw new Error(await res.text());
      }
    } catch (e) {
      console.error("Backend error, falling back to local state", e);
      setIdols(prev => prev.filter(idol => idol.id !== id));
    }
  };

  return (
    <IdolContext.Provider value={{ idols, addIdol, updateIdol, deleteIdol }}>
      {children}
    </IdolContext.Provider>
  );
}

export function useIdols() {
  const context = useContext(IdolContext);
  if (!context) {
    throw new Error('useIdols must be used within an IdolProvider');
  }
  return context;
}
