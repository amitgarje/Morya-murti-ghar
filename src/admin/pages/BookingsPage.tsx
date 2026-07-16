import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle, Eye, Check, X as XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { StatusBadge, Card, EmptyState } from '../components/AdminUI';
import { mockBookings } from '../data/mockData';
import type { Booking } from '../data/mockData';

const FILTERS = ['all', 'pending', 'approved', 'rejected', 'delivered'];

export function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const filtered = bookings.filter(b => {
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchSearch = b.customerName.toLowerCase().includes(search.toLowerCase())
      || b.bookingId.toLowerCase().includes(search.toLowerCase())
      || b.idolName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const updateStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    showToast(`Booking ${status}!`);
  };

  const statusCounts = FILTERS.slice(1).reduce((acc, s) => ({ ...acc, [s]: bookings.filter(b => b.status === s).length }), {} as Record<string, number>);

  return (
    <AdminLayout>
      {/* Summary Pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setStatusFilter(f)}
            style={{
              padding: '7px 16px', borderRadius: 9999, border: '1px solid', cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 500,
              textTransform: 'capitalize', transition: 'all 0.15s',
              borderColor: statusFilter === f ? '#5B2C83' : 'rgba(0,0,0,0.08)',
              background: statusFilter === f ? '#5B2C83' : 'white',
              color: statusFilter === f ? 'white' : '#6B7280',
            }}>
            {f === 'all' ? `All (${bookings.length})` : `${f} (${statusCounts[f] ?? 0})`}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', background: 'white' }}>
            <Search size={14} color="#9CA3AF" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..."
              style={{ border: 'none', outline: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#374151', background: 'transparent', width: 180 }} />
          </div>
        </div>
      </div>

      {/* Booking Cards Grid */}
      {filtered.length === 0 ? (
        <Card><EmptyState icon="📋" title="No bookings found" desc="Try changing the filter or add a new booking." /></Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
          {filtered.map((b, i) => (
            <BookingCard key={b.id} booking={b} index={i} onApprove={() => updateStatus(b.id, 'approved')} onReject={() => updateStatus(b.id, 'rejected')} onDeliver={() => updateStatus(b.id, 'delivered')} onOpen={() => navigate(`/admin/bookings/${b.id}`)} />
          ))}
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, background: 'white', borderRadius: 12, padding: '14px 18px', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', borderLeft: '4px solid #22C55E', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#1F2937', minWidth: 260 }}>
        ✓ {toast}
      </motion.div>}</AnimatePresence>
    </AdminLayout>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────
function BookingCard({ booking: b, index, onApprove, onReject, onDeliver, onOpen }: {
  booking: Booking; index: number;
  onApprove: () => void; onReject: () => void; onDeliver: () => void; onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{
        background: 'white', borderRadius: 18,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Top: Idol Image + Basic Info */}
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Large Idol Thumbnail */}
        <div style={{ width: 110, flexShrink: 0, background: 'linear-gradient(135deg, #F9FAFB, #F3F4F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 8px' }}>
          <img src={b.idolImage} alt={b.idolName} style={{ width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))', maxHeight: 120 }} />
        </div>
        {/* Info */}
        <div style={{ flex: 1, padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.78rem', color: '#5B2C83' }}>{b.bookingId}</span>
            <StatusBadge status={b.status} />
          </div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1F2937', margin: '2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.idolName}</h3>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>{b.idolHeight}" • {b.idolMaterial}</p>

          <div style={{ marginTop: 6 }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.88rem', color: '#1F2937', fontWeight: 600, margin: 0 }}>{b.customerName}</p>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#6B7280', margin: '1px 0 0' }}>📞 {b.customerPhone}</p>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6' }}>
        {[
          { label: 'Advance', value: `₹${b.advancePaid.toLocaleString()}`, color: '#22C55E' },
          { label: 'Remaining', value: `₹${b.remainingAmount.toLocaleString()}`, color: b.remainingAmount > 0 ? '#EF4444' : '#22C55E' },
          { label: 'Pickup', value: b.pickupDate.slice(5), color: '#5B2C83' },
        ].map(item => (
          <div key={item.label} style={{ padding: '10px', textAlign: 'center', borderRight: '1px solid #F3F4F6' }}>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: item.color, margin: 0 }}>{item.value}</p>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.68rem', color: '#9CA3AF', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* Transaction ID */}
      <div style={{ padding: '8px 16px', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF' }}>Txn: {b.transactionId}</span>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF' }}>{b.paymentMode}</span>
      </div>

      {/* Action Buttons */}
      <div style={{ padding: '12px 14px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button onClick={onOpen} style={actionBtn('#5B2C83', 'white')}>
          <Eye size={12} /> Open
        </button>
        {b.status === 'pending' && (
          <>
            <button onClick={onApprove} style={actionBtn('#22C55E', 'white')}>
              <Check size={12} /> Approve
            </button>
            <button onClick={onReject} style={actionBtn('#EF4444', 'white')}>
              <XIcon size={12} /> Reject
            </button>
          </>
        )}
        {b.status === 'approved' && (
          <button onClick={onDeliver} style={actionBtn('#2563EB', 'white')}>
            <Check size={12} /> Mark Delivered
          </button>
        )}
        <a href={`https://wa.me/91${b.customerWhatsapp}`} target="_blank" rel="noreferrer" style={{ ...actionBtn('#25D366', 'white'), textDecoration: 'none' }}>
          <MessageCircle size={12} /> WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

function actionBtn(bg: string, color: string): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '5px 10px', borderRadius: 8, border: 'none',
    background: bg, color, cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600,
    transition: 'opacity 0.15s',
  };
}
