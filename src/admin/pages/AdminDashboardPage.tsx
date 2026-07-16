import { motion } from 'framer-motion';
import {
  Package, BookOpen, Clock,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { AdminLayout } from '../components/AdminLayout';
import { StatCard, SectionHeader, Card } from '../components/AdminUI';
import { mockBookings, mockIdols, monthlyBookings, materialData, recentActivities, dailyBookings } from '../data/mockData';

const COLORS = ['#5B2C83', '#D4AF37', '#22C55E', '#3B82F6', '#EF4444'];

export function AdminDashboardPage() {
  const totalIdols = mockIdols.length;
  const availableIdols = mockIdols.filter(i => i.status === 'available').length;
  const bookedIdols = mockIdols.filter(i => i.status === 'booked').length;
  const pendingBookings = mockBookings.filter(b => b.status === 'pending').length;
  const deliveredIdols = mockIdols.filter(i => i.status === 'delivered').length;

  const stats = [
    { title: 'Active Bookings', value: bookedIdols + pendingBookings, icon: <BookOpen size={20} color="#5B2C83" />, iconBg: '#5B2C83', trend: 15, trendLabel: 'bookings in queue' },
    { title: 'Delivered Idols', value: deliveredIdols, icon: <Package size={20} color="#22C55E" />, iconBg: '#22C55E', trend: 5, trendLabel: 'delivered successfully' },
    { title: 'Pending Verification', value: pendingBookings, icon: <Clock size={20} color="#EF4444" />, iconBg: '#EF4444', trend: 0, trendLabel: 'requires action' },
    { title: 'Available Inventory', value: `${availableIdols} / ${totalIdols}`, icon: <Package size={20} color="#D4AF37" />, iconBg: '#D4AF37', trend: 0, trendLabel: 'idols in stock' },
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

        {/* ── Charts Row 1 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>

          {/* Booking Trend */}
          <Card style={{ padding: 20 }}>
            <SectionHeader title="Monthly Booking Trend" subtitle="Bookings count (2026)" />
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyBookings} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B2C83" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#5B2C83" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: '0.8rem', border: '1px solid rgba(0,0,0,0.06)' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.8rem' }} />
                <Area type="monotone" dataKey="bookings" stroke="#5B2C83" strokeWidth={2} fill="url(#gBookings)" name="Bookings" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Material Distribution */}
          <Card style={{ padding: 20 }}>
            <SectionHeader title="Material Distribution" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={materialData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {materialData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: '0.8rem' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', marginTop: 8 }}>
              {materialData.map((m, i) => (
                <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i % COLORS.length], display: 'inline-block' }} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#6B7280' }}>{m.name} {m.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Charts Row 2 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Daily bookings bar */}
          <Card style={{ padding: 20 }}>
            <SectionHeader title="This Week's Bookings" subtitle="Daily booking count" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyBookings} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: '0.8rem' }} />
                <Bar dataKey="bookings" fill="#5B2C83" radius={[6, 6, 0, 0]} name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Activity */}
          <Card style={{ padding: 20 }}>
            <SectionHeader title="Recent Activity" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recentActivities.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    display: 'flex', gap: 12, padding: '12px 0',
                    borderBottom: i < recentActivities.length - 1 ? '1px solid #F9FAFB' : 'none',
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#1F2937', margin: 0 }}>{a.message}</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF', margin: '2px 0 0' }}>{a.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Recent Bookings Table ── */}
        <Card>
          <div style={{ padding: '20px 20px 0' }}>
            <SectionHeader title="Recent Bookings" subtitle="Latest 5 booking entries" />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
                  {['Booking ID', 'Customer', 'Idol', 'Pickup Date', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockBookings.slice(0, 5).map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #F9FAFB', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.82rem', color: '#5B2C83' }}>{b.bookingId}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.83rem', color: '#1F2937', fontWeight: 500 }}>{b.customerName}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF' }}>{b.customerPhone}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src={b.idolImage} alt={b.idolName} style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6, background: '#F3F4F6' }} />
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#374151' }}>{b.idolName}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#6B7280' }}>{b.pickupDate}</span>
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

// local import
import { StatusBadge } from '../components/AdminUI';
