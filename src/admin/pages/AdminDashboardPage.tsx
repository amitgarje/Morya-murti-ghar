import { motion } from 'framer-motion';
import { Package, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { StatCard, SectionHeader, Card, StatusBadge } from '../components/AdminUI';
import { useIdols } from '@/context/IdolContext';

export function AdminDashboardPage() {
  const { idols } = useIdols();
  const totalIdols = idols.length;
  const availableIdols = idols.filter(i => i.status === 'available').length;
  const soldOutIdols = idols.filter(i => i.status === 'sold out').length;

  const stats = [
    { title: 'Total Inventory', value: totalIdols, icon: <Package size={20} color="#5B2C83" />, iconBg: '#5B2C83', trend: 0, trendLabel: 'idols in catalog' },
    { title: 'Available Idols', value: availableIdols, icon: <Package size={20} color="#22C55E" />, iconBg: '#22C55E', trend: 0, trendLabel: 'currently available' },
    { title: 'Sold Out', value: soldOutIdols, icon: <Package size={20} color="#EF4444" />, iconBg: '#EF4444', trend: 0, trendLabel: 'no longer available' },
    { title: 'Catalog Status', value: 'Active', icon: <ShieldCheck size={20} color="#D4AF37" />, iconBg: '#D4AF37', trend: 0, trendLabel: 'public view' },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ── Stat Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {stats.map((s, i) => (
            <StatCard key={s.title} {...s} delay={i * 0.05} />
          ))}
        </div>

        {/* ── Recent Idols Table ── */}
        <Card>
          <div style={{ padding: '20px 20px 0' }}>
            <SectionHeader title="Recently Added Idols" subtitle="Latest catalog entries" />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
                  {['Idol', 'Category', 'Material', 'Height', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {idols.slice(0, 8).map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #F9FAFB', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src={b.images[0] || '/ganesh-hero.png'} alt={b.name} style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6, background: '#F3F4F6' }} />
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#374151', fontWeight: 500 }}>{b.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#6B7280' }}>{b.category}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#6B7280' }}>{b.material}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#6B7280' }}>{b.heightCm} cm</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
