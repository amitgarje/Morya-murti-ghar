import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, User, ShoppingBag, CreditCard, QrCode } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { SectionHeader, Btn, Card } from '../components/AdminUI';
import { mockIdols } from '../data/mockData';

export function OfflineBookingsPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerWhatsapp: '',
    idolId: '',
    paymentMode: 'Cash',
    advancePaid: 0,
    remainingAmount: 0,
    pickupDate: '',
    notes: '',
  });

  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const availableIdols = mockIdols.filter(i => i.status === 'available');

  const selectedIdol = mockIdols.find(i => i.id === formData.idolId);
  const finalPrice = selectedIdol ? Math.round(selectedIdol.price * (1 - selectedIdol.discount / 100)) : 0;

  const handleIdolChange = (id: string) => {
    const idol = mockIdols.find(i => i.id === id);
    if (idol) {
      const price = Math.round(idol.price * (1 - idol.discount / 100));
      setFormData(prev => ({
        ...prev,
        idolId: id,
        advancePaid: 0,
        remainingAmount: price,
      }));
    } else {
      setFormData(prev => ({ ...prev, idolId: '', advancePaid: 0, remainingAmount: 0 }));
    }
  };

  const handleAdvanceChange = (adv: number) => {
    const remaining = Math.max(0, finalPrice - adv);
    setFormData(prev => ({ ...prev, advancePaid: adv, remainingAmount: remaining }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || !formData.idolId || !formData.pickupDate) {
      showToast('Please fill all required fields');
      return;
    }
    showToast('Offline booking created successfully!');
    setFormData({
      customerName: '',
      customerPhone: '',
      customerWhatsapp: '',
      idolId: '',
      paymentMode: 'Cash',
      advancePaid: 0,
      remainingAmount: 0,
      pickupDate: '',
      notes: '',
    });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 10,
    border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'Poppins, sans-serif',
    fontSize: '0.83rem', color: '#374151', outline: 'none', boxSizing: 'border-box'
  };
  
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem',
    color: '#6B7280', fontWeight: 500, marginBottom: 6, display: 'block'
  };

  return (
    <AdminLayout>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24 }}>
        
        {/* Left Side: Booking Form */}
        <Card style={{ padding: 24 }}>
          <SectionHeader title="Create Offline Booking" subtitle="Book an idol directly from the showroom floor" />
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Customer Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <User size={16} color="#5B2C83" />
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: 0 }}>Customer Details</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Customer Name *</label>
                  <input required value={formData.customerName} onChange={e => setFormData(prev => ({ ...prev, customerName: e.target.value }))} placeholder="Enter name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input required type="tel" value={formData.customerPhone} onChange={e => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))} placeholder="Enter 10-digit number" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>WhatsApp Number</label>
                  <input type="tel" value={formData.customerWhatsapp} onChange={e => setFormData(prev => ({ ...prev, customerWhatsapp: e.target.value }))} placeholder="Same as phone" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Pickup Date *</label>
                  <input required type="date" value={formData.pickupDate} onChange={e => setFormData(prev => ({ ...prev, pickupDate: e.target.value }))} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* Idol Section */}
            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <ShoppingBag size={16} color="#5B2C83" />
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: 0 }}>Select Idol</h3>
              </div>
              <div>
                <label style={labelStyle}>Choose Available Idol *</label>
                <select value={formData.idolId} onChange={e => handleIdolChange(e.target.value)} style={inputStyle}>
                  <option value="">-- Choose Idol --</option>
                  {availableIdols.map(idol => (
                    <option key={idol.id} value={idol.id}>
                      {idol.name} ({idol.heightCm}" • {idol.material}) - ₹{Math.round(idol.price * (1 - idol.discount/100))}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Section */}
            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <CreditCard size={16} color="#5B2C83" />
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: 0 }}>Payment Details</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Payment Mode</label>
                  <select value={formData.paymentMode} onChange={e => setFormData(prev => ({ ...prev, paymentMode: e.target.value }))} style={inputStyle}>
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Card</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Advance Paid (₹)</label>
                  <input type="number" min={0} max={finalPrice} value={formData.advancePaid || ''} onChange={e => handleAdvanceChange(Number(e.target.value))} placeholder="0" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Total Price</label>
                  <input disabled value={`₹${finalPrice.toLocaleString()}`} style={{ ...inputStyle, background: '#F3F4F6' }} />
                </div>
                <div>
                  <label style={labelStyle}>Remaining Amount</label>
                  <input disabled value={`₹${formData.remainingAmount.toLocaleString()}`} style={{ ...inputStyle, background: '#F3F4F6', color: '#EF4444', fontWeight: 600 }} />
                </div>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Special Notes</label>
              <textarea rows={2} value={formData.notes} onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))} placeholder="Any specific requirements..." style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <Btn type="submit" icon={<Save size={16} />}>Save Booking</Btn>
          </form>
        </Card>

        {/* Right Side: Showcase / Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {selectedIdol ? (
            <Card style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1F2937', marginBottom: 14 }}>Selected Idol Preview</h3>
              <div style={{ height: 180, background: 'linear-gradient(135deg, #F9FAFB, #F3F4F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
                <img src={selectedIdol.images[0]} alt={selectedIdol.name} style={{ height: '85%', objectFit: 'contain' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>Name</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: '#1F2937' }}>{selectedIdol.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>Height / Material</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#374151', fontWeight: 500 }}>{selectedIdol.heightCm}" • {selectedIdol.material}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>Base Price</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#374151', textDecoration: 'line-through' }}>₹{selectedIdol.price.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>Final Price</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#22C55E' }}>₹{finalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          ) : (
            <Card style={{ padding: 20, textAlign: 'center', color: '#9CA3AF' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🛕</div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', margin: 0 }}>Select an idol to see the live preview and details</p>
            </Card>
          )}

          {/* Quick Payment QR */}
          <Card style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <QrCode size={18} color="#D4AF37" />
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: 0 }}>Showroom UPI QR</h3>
            </div>
            <div style={{ padding: 12, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, background: 'white' }}>
              {/* Dummy QR placeholder */}
              <div style={{ width: 140, height: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: '#888' }}>[ UPI QR CODE ]</span>
              </div>
            </div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#6B7280', margin: 0 }}>
              Scan QR code directly for quick advance payment collections
            </p>
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
