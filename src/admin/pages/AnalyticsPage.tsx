import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import { AdminLayout } from '../components/AdminLayout';
import { SectionHeader, Card, StatCard } from '../components/AdminUI';
import { monthlyBookings, materialData, heightData } from '../data/mockData';

const COLORS = ['#5B2C83', '#D4AF37', '#22C55E', '#3B82F6', '#EF4444'];

export function AnalyticsPage() {
  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Top summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          <StatCard title="Total Revenue Projected" value="₹1,24,000" icon="💰" iconBg="#22C55E" trend={14} />
          <StatCard title="Advance Payments" value="₹56,500" icon="💳" iconBg="#5B2C83" trend={22} />
          <StatCard title="Outstanding Balance" value="₹67,500" icon="⏳" iconBg="#EF4444" trend={-4} />
          <StatCard title="Booking Conversion" value="94.2%" icon="📈" iconBg="#D4AF37" trend={2} />
        </div>

        {/* Detailed Chart Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          
          {/* Revenue Over Time Area Chart */}
          <Card style={{ padding: 20 }}>
            <SectionHeader title="Revenue Realization Graph" subtitle="Advance payments vs total booking values" />
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyBookings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B2C83" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#5B2C83" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#5B2C83" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue Realized (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Height distribution */}
          <Card style={{ padding: 20 }}>
            <SectionHeader title="Height Distribution" subtitle="Most booked idol sizes (in inches)" />
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={heightData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#D4AF37" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
          {/* Material breakdown pie */}
          <Card style={{ padding: 20 }}>
            <SectionHeader title="Material Breakdown" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={materialData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                  {materialData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
              {materialData.map((entry, index) => (
                <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[index % COLORS.length] }} />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#6B7280' }}>{entry.name}</span>
                  </div>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.82rem', color: '#1F2937' }}>{entry.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Table summary of sales */}
          <Card>
            <div style={{ padding: '20px 20px 0' }}>
              <SectionHeader title="Top Selling Categories" subtitle="Category-wise metrics breakdown" />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6', textAlign: 'left' }}>
                  {['Category', 'Stock Available', 'Booked', 'Average Price', 'Popular Material'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: 'Traditional', stock: 15, booked: 42, avg: '₹4,500', mat: 'Shadu Mati' },
                  { cat: 'Premium', stock: 8, booked: 28, avg: '₹8,500', mat: 'Shadu Mati' },
                  { cat: 'Luxury', stock: 3, booked: 12, avg: '₹18,000', mat: 'Marble' },
                  { cat: 'Eco-Friendly', stock: 24, booked: 18, avg: '₹2,200', mat: 'Eco-Friendly' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F9FAFB' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#1F2937' }}>{row.cat}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#6B7280' }}>{row.stock} units</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#22C55E', fontWeight: 600 }}>{row.booked} reserved</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#374151' }}>{row.avg}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#374151' }}>{row.mat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

      </div>
    </AdminLayout>
  );
}
