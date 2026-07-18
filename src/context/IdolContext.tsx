import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockIdols } from '../admin/data/mockData';
import type { Idol } from '../admin/data/mockData';
import { saveImageToIDB, resolveImageUrl, deleteImageFromIDB } from '../lib/imageStore';

interface IdolContextType {
  idols: Idol[];
  resolvedImages: Record<string, string>; // id -> resolved blob URL
  addIdol: (formData: FormData) => Promise<void>;
  updateIdol: (id: string, formData: FormData) => Promise<void>;
  deleteIdol: (id: string) => Promise<void>;
}

const IdolContext = createContext<IdolContextType | undefined>(undefined);

const API_URL = 'http://localhost:8080/api/idols';

export function IdolProvider({ children }: { children: React.ReactNode }) {
  const [idols, setIdols] = useState<Idol[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Map of idol id -> resolved image URL (blob URL or https URL)
  const [resolvedImages, setResolvedImages] = useState<Record<string, string>>({});

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

    // Fallback logic: localStorage with IndexedDB image refs
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

  // Save to localStorage whenever idols change (stores idb:// keys, not blobs)
  useEffect(() => {
    if (isLoaded) {
      // Store a lightweight version without large base64 data
      const lightweight = idols.map(idol => ({
        ...idol,
        // idb:// keys are short strings — safe to store
        // base64 strings start with 'data:' — migrate them to IDB on next add
      }));
      try {
        localStorage.setItem('morya_idols', JSON.stringify(lightweight));
      } catch (e) {
        console.warn('localStorage full, clearing old data');
        localStorage.removeItem('morya_idols');
      }
    }
  }, [idols, isLoaded]);

  // Resolve IDB keys to blob URLs whenever idols list changes
  useEffect(() => {
    if (!isLoaded) return;
    const resolveAll = async () => {
      const entries: Record<string, string> = {};
      await Promise.all(
        idols.map(async (idol) => {
          const raw = idol.images?.[0] || '/ganesh-hero.png';
          entries[idol.id] = await resolveImageUrl(raw);
        })
      );
      setResolvedImages(entries);
    };
    resolveAll();
  }, [idols, isLoaded]);

  const addIdol = async (formData: FormData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const newIdol = await res.json();
        setIdols(prev => [newIdol, ...prev]);
        return;
      } else {
        throw new Error(await res.text());
      }
    } catch (e) {
      console.error("Backend error, saving to IndexedDB", e);
      // Save image blob to IndexedDB — survives page reload indefinitely
      let imageRef = '/ganesh-hero.png';
      const file = formData.get('image') as File;
      if (file && file.size > 0) {
        try {
          imageRef = await saveImageToIDB(file);
        } catch (err) {
          console.error("Failed to save image to IndexedDB", err);
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
        images: [imageRef], // idb:// key stored in localStorage
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
      let imageRef: string | undefined;
      const file = formData.get('image') as File;
      if (file && file.size > 0) {
        try {
          imageRef = await saveImageToIDB(file);
        } catch (err) {
          console.error("Failed to save image to IndexedDB", err);
        }
      }
      const updates: Partial<Idol> = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        heightCm: Number(formData.get('heightCm')),
        material: formData.get('material') as any,
        description: formData.get('description') as string,
        status: formData.get('status') as any,
        ...(imageRef ? { images: [imageRef] } : {}),
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
      // Clean up IDB entry for the deleted idol
      const idol = idols.find(i => i.id === id);
      if (idol?.images?.[0]) {
        deleteImageFromIDB(idol.images[0]);
      }
      setIdols(prev => prev.filter(idol => idol.id !== id));
    }
  };

  return (
    <IdolContext.Provider value={{ idols, resolvedImages, addIdol, updateIdol, deleteIdol }}>
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
