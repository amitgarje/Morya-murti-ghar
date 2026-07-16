import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, Edit, Settings } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { SectionHeader, Btn, Card } from '../components/AdminUI';

const TEMPLATES = [
  { id: 't1', name: 'Royal Gold Invitation', theme: 'Royal Purple & Gold', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=80', active: true, usageCount: 145 },
  { id: 't2', name: 'Classic Traditional', theme: 'Marigold Yellow & Red', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=80', active: true, usageCount: 92 },
  { id: 't3', name: 'Apple Minimalist', theme: 'Clean White & Grey', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=80', active: false, usageCount: 38 },
];

export function InvitationStudioPage() {
  const [templates, setTemplates] = useState(TEMPLATES);
  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleToggleActive = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
    showToast('Template visibility updated!');
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <SectionHeader title="Invitation Studio Templates" subtitle="Manage personalized invitation website themes available to customers" />
        <Btn size="sm" icon={<Plus size={14} />} onClick={() => showToast('Create Template feature opened')}>
          Create Template
        </Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {templates.map(t => (
          <Card key={t.id} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Visual Cover */}
            <div style={{ height: 160, background: '#e0e0e0', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 1 }} />
              <div style={{
                position: 'absolute', top: 12, left: 12, zIndex: 2,
                padding: '4px 10px', borderRadius: 9999, fontSize: '0.68rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600,
                background: t.active ? '#22C55E' : '#EF4444', color: 'white'
              }}>
                {t.active ? 'Active' : 'Draft'}
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 2 }}>
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  {t.name}
                </h4>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', margin: '2px 0 0', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  {t.theme}
                </p>
              </div>
            </div>

            {/* Template Info / Stats */}
            <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#9CA3AF' }}>Invitations Sent</span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#1F2937' }}>{t.usageCount} times</span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                <Btn size="sm" variant="ghost" icon={<Eye size={12} />} style={{ flex: 1 }} onClick={() => showToast('Opening preview...')}>Preview</Btn>
                <Btn size="sm" variant="secondary" icon={<Edit size={12} />} style={{ flex: 1 }} onClick={() => showToast('Opening editor...')}>Edit</Btn>
                <button 
                  onClick={() => handleToggleActive(t.id)}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(91,44,131,0.2)',
                    background: t.active ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: t.active ? '#22C55E' : '#EF4444'
                  }}
                  title={t.active ? 'Deactivate Template' : 'Activate Template'}
                >
                  <Settings size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, background: 'white', borderRadius: 12, padding: '14px 18px', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', borderLeft: '4px solid #5B2C83', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#1F2937', minWidth: 260 }}>
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
