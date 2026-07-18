import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { StatusBadge, Btn, Card, Modal, EmptyState } from '../components/AdminUI';
import { useIdols } from '@/context/IdolContext';
import type { Idol } from '../data/mockData';

const MATERIALS = ['All', 'Shadu Mati', 'Plaster of Paris', 'Fiber', 'Eco-Friendly', 'Marble'];
const STATUSES = ['all', 'available', 'sold out'];

export function ManageIdolsPage() {
  const { idols, addIdol, deleteIdol } = useIdols();
  const [search, setSearch] = useState('');
  const [filterMat, setFilterMat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const filtered = idols.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    const matchMat = filterMat === 'All' || i.material === filterMat;
    const matchStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchSearch && matchMat && matchStatus;
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleDelete = () => {
    if (deleteId) { deleteIdol(deleteId); setDeleteId(null); showToast('Idol deleted successfully'); }
  };

  return (
    <AdminLayout>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', background: 'white', minWidth: 220 }}>
            <Search size={15} color="#9CA3AF" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search idols..."
              style={{ border: 'none', outline: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '0.83rem', color: '#374151', width: '100%', background: 'transparent' }} />
          </div>
          {/* Material Filter */}
          <select value={filterMat} onChange={e => setFilterMat(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', background: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#374151', cursor: 'pointer' }}>
            {MATERIALS.map(m => <option key={m}>{m}</option>)}
          </select>
          {/* Status filter pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {STATUSES.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                style={{ padding: '6px 14px', borderRadius: 9999, border: '1px solid', fontSize: '0.78rem', fontFamily: 'Poppins, sans-serif', fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s',
                  borderColor: filterStatus === s ? '#5B2C83' : 'rgba(0,0,0,0.08)', background: filterStatus === s ? '#5B2C83' : 'white', color: filterStatus === s ? 'white' : '#6B7280' }}>
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn size="sm" icon={<Plus size={14} />} onClick={() => setAddOpen(true)}>Add New Idol</Btn>
        </div>
      </div>

      {/* Count */}
      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF', marginBottom: 16 }}>{filtered.length} idol{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card><EmptyState icon="🛕" title="No idols found" desc="Try adjusting your filters or add a new idol." /></Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
          {filtered.map((idol, i) => (
            <motion.div
              key={idol.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'white', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* Image */}
              <div style={{ height: 180, background: 'linear-gradient(135deg, #F9FAFB, #F3F4F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <img src={idol.images[0]} alt={idol.name} style={{ height: '85%', objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }} />
                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                  <StatusBadge status={idol.status} />
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: 0 }}>{idol.name}</h3>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', margin: '2px 0 0' }}>{idol.heightCm}" • {idol.material}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  <Btn size="sm" variant="ghost" icon={<Eye size={12} />} style={{ flex: 1 }}>View</Btn>
                  <Btn size="sm" variant="secondary" icon={<Edit2 size={12} />} style={{ flex: 1 }}>Edit</Btn>
                  <button onClick={() => setDeleteId(idol.id)}
                    style={{ width: 30, borderRadius: 8, border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Idol Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New Idol" width={620}>
        <AddIdolForm onSave={async (formData) => {
          await addIdol(formData);
          setAddOpen(false);
          showToast('Idol added successfully!');
        }} />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Idol" width={400}>
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗑️</div>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#374151', marginBottom: '1.5rem' }}>
            Are you sure you want to delete this idol? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Btn variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={handleDelete}>Delete</Btn>
          </div>
        </div>
      </Modal>

      {/* Toast */}
      <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, background: 'white', borderRadius: 12, padding: '14px 18px', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', borderLeft: '4px solid #22C55E', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#1F2937', minWidth: 260 }}>
        ✓ {toast}
      </motion.div>}</AnimatePresence>
    </AdminLayout>
  );
}

// ─── Add Idol Form ────────────────────────────────────────────────────────────
interface AddFormData {
  name: string;
  category: string;
  heightCm: number;
  material: string;
  description: string;
  status: string;
}

function AddIdolForm({ onSave }: { onSave: (d: FormData) => void }) {
  const [form, setForm] = useState<AddFormData>({
    name: '',
    category: 'Traditional',
    heightCm: 24,
    material: 'Shadu Mati',
    description: '',
    status: 'available'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const set = (k: keyof AddFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: ['heightCm'].includes(k) ? Number(e.target.value) : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('heightCm', form.heightCm.toString());
    formData.append('material', form.material);
    formData.append('description', form.description);
    formData.append('status', form.status);
    
    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      alert("Please select an image");
      return;
    }
    
    onSave(formData);
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'Poppins, sans-serif', fontSize: '0.83rem', color: '#374151', outline: 'none', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#6B7280', fontWeight: 500, marginBottom: 6, display: 'block' };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div><label style={labelStyle}>Idol Name *</label><input required value={form.name} onChange={set('name')} placeholder="e.g. Shree Siddhi Vinayak" style={inputStyle} /></div>
        <div><label style={labelStyle}>Category</label>
          <select value={form.category} onChange={set('category')} style={inputStyle}>
            {['Traditional', 'Premium', 'Children', 'Luxury', 'Eco'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div><label style={labelStyle}>Height (inches)</label><input type="number" value={form.heightCm} onChange={set('heightCm')} min={1} style={inputStyle} /></div>
        <div><label style={labelStyle}>Material</label>
          <select value={form.material} onChange={set('material')} style={inputStyle}>
            {['Shadu Mati', 'Plaster of Paris', 'Fiber', 'Eco-Friendly', 'Marble'].map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Status</label>
          <select value={form.status} onChange={set('status')} style={inputStyle}>
            <option value="available">Available</option>
            <option value="sold out">Sold Out</option>
          </select>
        </div>
      </div>
      <div><label style={labelStyle}>Description</label><textarea value={form.description} onChange={set('description')} rows={3} placeholder="Describe the idol..." style={{ ...inputStyle, resize: 'vertical' }} /></div>
      
      {/* Real Image Upload */}
      <div>
        <label style={labelStyle}>Idol Image File *</label>
        <div style={{ border: '2px dashed rgba(91,44,131,0.2)', borderRadius: 12, padding: '16px', textAlign: 'center', cursor: 'pointer', background: '#F9FAFB' }}>
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/jpg, image/webp"
            required
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          {imageFile && <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#5B2C83', marginTop: '8px' }}>Selected: {imageFile.name}</p>}
        </div>
      </div>

      <Btn type="submit" icon={<Plus size={14} />}>Save Idol</Btn>
    </form>
  );
}
