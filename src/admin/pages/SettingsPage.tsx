import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Store, Shield, Bell, Upload, QrCode } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Btn, Card } from '../components/AdminUI';

export function SettingsPage() {
  const [shopName, setShopName] = useState('Morya Murti Ghar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [upiId, setUpiId] = useState('moryamurtighar@okaxis');
  const [address, setAddress] = useState('Lane 4, Ganeshpeth, Pune, Maharashtra - 411002');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 10,
    border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'Poppins, sans-serif',
    fontSize: '0.83rem', color: '#374151', outline: 'none', boxSizing: 'border-box'
  };
  
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem',
    color: '#6B7280', fontWeight: 500, marginBottom: 6, display: 'block'
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        
        {/* Left: Settings Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <form onSubmit={handleSave}>
            <Card style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #F3F4F6', paddingBottom: 12 }}>
                <Store size={18} color="#5B2C83" />
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1F2937', margin: 0 }}>Shop Settings</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Shop Name</label>
                  <input value={shopName} onChange={e => setShopName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Contact Hotline</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>UPI Payment VPA (For Reservations)</label>
                  <input value={upiId} onChange={e => setUpiId(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Shop Physical Address</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Btn type="submit" icon={<Save size={14} />}>Save Changes</Btn>
              </div>
            </Card>
          </form>

          {/* Security & Access */}
          <Card style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #F3F4F6', paddingBottom: 12 }}>
              <Shield size={18} color="#5B2C83" />
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1F2937', margin: 0 }}>Security Settings</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Current Password</label>
                <input type="password" placeholder="••••••••" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>New Password</label>
                <input type="password" placeholder="Min 8 characters" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Btn variant="secondary" onClick={() => showToast('Password updated!')}>Change Password</Btn>
            </div>
          </Card>
        </div>

        {/* Right side helper items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* UPI Merchant QR */}
          <Card style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <QrCode size={18} color="#D4AF37" />
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: 0 }}>UPI Merchant QR</h3>
            </div>
            <div style={{ padding: 12, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, background: 'white' }}>
              <div style={{ width: 150, height: 150, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: '#888' }}>[ UPI QR CODE ]</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn size="sm" variant="ghost" icon={<Upload size={12} />} onClick={() => showToast('Uploading new QR code...')}>Upload QR</Btn>
            </div>
          </Card>

          {/* System status */}
          <Card style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Bell size={18} color="#5B2C83" />
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: 0 }}>System Metrics</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#9CA3AF' }}>Server Status</span>
                <span style={{ color: '#22C55E', fontWeight: 600 }}>Active / Online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#9CA3AF' }}>Database Sync</span>
                <span style={{ color: '#22C55E', fontWeight: 600 }}>100% synced</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#9CA3AF' }}>WhatsApp Gateway</span>
                <span style={{ color: '#22C55E', fontWeight: 600 }}>Connected</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, background: 'white', borderRadius: 12, padding: '14px 18px', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', borderLeft: '4px solid #22C55E', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#1F2937', minWidth: 260 }}>
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
