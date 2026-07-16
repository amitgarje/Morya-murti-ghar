import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Sparkles } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Card, EmptyState, Modal, Btn } from '../components/AdminUI';
import { mockCustomers, mockBookings } from '../data/mockData';
import type { Customer } from '../data/mockData';

export function CustomersPage() {
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  const filtered = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  const activeCustBookings = selectedCust 
    ? mockBookings.filter(b => b.customerId === selectedCust.id)
    : [];

  return (
    <AdminLayout>
      {/* Header Search toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', background: 'white', minWidth: 260 }}>
          <Search size={15} color="#9CA3AF" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or phone..."
            style={{ border: 'none', outline: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '0.83rem', color: '#374151', width: '100%', background: 'transparent' }} />
        </div>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF', margin: 0 }}>
          {filtered.length} customer{filtered.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {filtered.length === 0 ? (
        <Card><EmptyState icon="👥" title="No customers found" desc="No profiles match your search criteria." /></Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'white', borderRadius: 16, padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column', gap: 16,
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* Profile Top */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: `${c.color}15`, color: c.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem'
                }}>
                  {c.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.98rem', color: '#1F2937', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.name}
                    </h3>
                    {c.isReturning && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 3,
                        padding: '2px 8px', borderRadius: 9999, background: 'rgba(91,44,131,0.08)',
                        color: '#5B2C83', fontSize: '0.65rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600
                      }}>
                        <Sparkles size={8} /> Returning
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#6B7280', margin: '2px 0 0' }}>📞 {c.phone}</p>
                </div>
              </div>

              {/* Booking quick stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 14px', background: '#F9FAFB', borderRadius: 10 }}>
                <div>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.68rem', color: '#9CA3AF', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Bookings</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937' }}>{c.totalBookings} orders</span>
                </div>
                <div>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.68rem', color: '#9CA3AF', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Value</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#22C55E' }}>₹{c.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF' }}>Last order: {c.lastBooking}</span>
                <Btn size="sm" variant="ghost" icon={<Eye size={12} />} onClick={() => setSelectedCust(c)}>History</Btn>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Customer Booking History Modal */}
      <Modal open={!!selectedCust} onClose={() => setSelectedCust(null)} title={selectedCust ? `${selectedCust.name}'s Booking History` : ''} width={580}>
        {selectedCust && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Quick Profile Summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${selectedCust.color}15`, color: selectedCust.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                {selectedCust.initials}
              </div>
              <div>
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: 0 }}>{selectedCust.name}</h4>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#6B7280', margin: '2px 0 0' }}>{selectedCust.phone} • {selectedCust.email || 'No email saved'}</p>
              </div>
            </div>

            {/* List of bookings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h5 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>Orders ({activeCustBookings.length})</h5>
              
              {activeCustBookings.length === 0 ? (
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF', textAlign: 'center', margin: 0 }}>No bookings recorded for this customer.</p>
              ) : (
                activeCustBookings.map(b => (
                  <div key={b.id} style={{ display: 'flex', gap: 12, padding: 12, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, alignItems: 'center' }}>
                    <img src={b.idolImage} alt="" style={{ width: 40, height: 40, objectFit: 'contain', background: '#F9FAFB', borderRadius: 8 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#5B2C83' }}>{b.bookingId}</span>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.73rem', textTransform: 'capitalize', fontWeight: 600, color: b.status === 'approved' || b.status === 'delivered' ? '#22C55E' : '#EF4444' }}>
                          {b.status}
                        </span>
                      </div>
                      <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: '#1F2937', margin: '2px 0 0' }}>{b.idolName}</h4>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.73rem', color: '#9CA3AF', margin: 0 }}>Booked: {b.bookingDate} • Pickup: {b.pickupDate}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
