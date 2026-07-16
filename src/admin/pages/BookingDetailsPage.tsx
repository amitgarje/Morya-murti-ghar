import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, Truck, Printer, QrCode, MessageCircle } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { StatusBadge, Btn, Card } from '../components/AdminUI';
import { mockBookings } from '../data/mockData';

export function BookingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = mockBookings.find(b => b.id === id);

  if (!booking) return (
    <AdminLayout>
      <div style={{ textAlign: 'center', padding: '6rem', color: '#9CA3AF', fontFamily: 'Poppins, sans-serif' }}>
        <div style={{ fontSize: '3rem' }}>❌</div>
        <p>Booking not found.</p>
        <Btn onClick={() => navigate('/admin/bookings')}>Back to Bookings</Btn>
      </div>
    </AdminLayout>
  );

  const timelineColors: Record<string, string> = {
    'Booking Created': '#5B2C83',
    'Payment Received': '#22C55E',
    'Cash Payment': '#22C55E',
    'Full Payment': '#22C55E',
    'Booking Approved': '#3B82F6',
    'Booking Rejected': '#EF4444',
    'Idol Delivered': '#D4AF37',
  };

  const getColor = (action: string) => {
    const key = Object.keys(timelineColors).find(k => action.startsWith(k));
    return key ? timelineColors[key] : '#9CA3AF';
  };

  return (
    <AdminLayout>
      {/* Back */}
      <button onClick={() => navigate('/admin/bookings')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#5B2C83', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', fontWeight: 500, marginBottom: 20 }}>
        <ArrowLeft size={16} /> Back to Bookings
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        {/* ── LEFT ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Idol Showcase */}
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: 300, background: 'linear-gradient(135deg, #F9FAFB, #F3F4F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={booking.idolImage} alt={booking.idolName} style={{ height: '85%', objectFit: 'contain', filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.12))' }} />
            </div>
            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderTop: '1px solid #F3F4F6', overflowX: 'auto' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ width: 56, height: 56, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', border: i === 1 ? '2px solid #5B2C83' : '2px solid transparent' }}>
                  <img src={booking.idolImage} alt="" style={{ width: '80%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </Card>

          {/* Idol Info */}
          <Card style={{ padding: 20 }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1F2937', margin: '0 0 14px' }}>Idol Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Name', value: booking.idolName },
                { label: 'Height', value: `${booking.idolHeight}"` },
                { label: 'Material', value: booking.idolMaterial },
                { label: 'Price', value: `₹${booking.idolPrice.toLocaleString()}` },
              ].map(f => (
                <div key={f.label}>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</p>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.92rem', color: '#1F2937', margin: '3px 0 0' }}>{f.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── RIGHT ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Booking Header */}
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF', margin: 0 }}>Booking ID</p>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#5B2C83', margin: '4px 0' }}>{booking.bookingId}</h2>
              </div>
              <StatusBadge status={booking.status} />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {booking.status === 'pending' && (
                <>
                  <Btn size="sm" variant="success" icon={<Check size={13} />}>Approve</Btn>
                  <Btn size="sm" variant="danger" icon={<X size={13} />}>Reject</Btn>
                </>
              )}
              {booking.status === 'approved' && <Btn size="sm" icon={<Truck size={13} />}>Mark Delivered</Btn>}
              <Btn size="sm" variant="ghost" icon={<Printer size={13} />}>Print</Btn>
              <Btn size="sm" variant="ghost" icon={<QrCode size={13} />}>QR Code</Btn>
              <a href={`https://wa.me/91${booking.customerWhatsapp}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 10, background: '#25D366', color: 'white', textDecoration: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', fontWeight: 600 }}>
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </Card>

          {/* Customer Details */}
          <Card style={{ padding: 20 }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: '0 0 14px' }}>Customer Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Name', value: booking.customerName },
                { label: 'Phone', value: booking.customerPhone },
                { label: 'WhatsApp', value: booking.customerWhatsapp },
                { label: 'Booking Date', value: booking.bookingDate },
                { label: 'Pickup Date', value: booking.pickupDate },
              ].map(f => (
                <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F9FAFB' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>{f.label}</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.83rem', color: '#1F2937', fontWeight: 500 }}>{f.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Payment Details */}
          <Card style={{ padding: 20 }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: '0 0 14px' }}>Payment Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              {[
                { label: 'Idol Price', value: `₹${booking.idolPrice.toLocaleString()}`, color: '#1F2937' },
                { label: 'Advance Paid', value: `₹${booking.advancePaid.toLocaleString()}`, color: '#22C55E' },
                { label: 'Remaining', value: `₹${booking.remainingAmount.toLocaleString()}`, color: booking.remainingAmount > 0 ? '#EF4444' : '#22C55E' },
                { label: 'Payment Mode', value: booking.paymentMode, color: '#5B2C83' },
              ].map(f => (
                <div key={f.label} style={{ padding: '10px', background: '#F9FAFB', borderRadius: 10 }}>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: '#9CA3AF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{f.label}</p>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: f.color, margin: '4px 0 0' }}>{f.value}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: '10px 14px', background: 'rgba(91,44,131,0.05)', borderRadius: 10, border: '1px solid rgba(91,44,131,0.1)' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>Transaction ID</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#5B2C83', margin: '2px 0 0' }}>{booking.transactionId}</p>
            </div>
          </Card>

          {/* Timeline */}
          <Card style={{ padding: 20 }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1F2937', margin: '0 0 16px' }}>Booking Timeline</h3>
            <div style={{ position: 'relative' }}>
              {booking.timeline.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: 14, marginBottom: i < booking.timeline.length - 1 ? 20 : 0, position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: getColor(t.action), flexShrink: 0, marginTop: 3 }} />
                    {i < booking.timeline.length - 1 && <div style={{ width: 2, flex: 1, background: '#F3F4F6', marginTop: 4 }} />}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.83rem', color: '#1F2937', fontWeight: 500, margin: 0 }}>{t.action}</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF', margin: '2px 0 0' }}>{t.time} · {t.by}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {booking.notes && (
              <div style={{ marginTop: 16, padding: '10px 14px', background: '#FEF9C3', borderRadius: 10, border: '1px solid #FDE68A' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#92400E', margin: 0 }}>📝 {booking.notes}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
