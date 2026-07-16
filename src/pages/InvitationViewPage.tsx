import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';

/* ─────────────────────────────────────────
   Mock DB / Theme config (reused for simplicity)
───────────────────────────────────────── */
const THEMES: Record<string, any> = {
  'purple': { bg: 'linear-gradient(135deg, #5B2C83, #3E1B5C)', color: 'white', accent: '#D4AF37' },
  'gold': { bg: 'linear-gradient(135deg, #D4AF37, #EBD076)', color: '#5B2C83', accent: '#ffffff' },
  'red': { bg: 'linear-gradient(135deg, #991B1B, #7F1D1D)', color: '#FEF3C7', accent: '#D4AF37' },
  'minimal': { bg: '#ffffff', color: '#1F2937', accent: '#5B2C83' },
};

/* ─────────────────────────────────────────
   Generated Invitation View Page
───────────────────────────────────────── */
export function InvitationViewPage() {
  // const { id } = useParams();
  
  // In a real app, we'd fetch this data using the `id`. 
  // For now, we mock the data with the selected theme.
  const [data] = useState({
    familyName: 'Garje Family',
    hostName: 'Rahul Garje',
    mobile: '+91 98765 43210',
    address: '101, Omkar Niwas, Kothrud, Pune, Maharashtra',
    arrivalDate: '14th September 2026',
    duration: '5 Days',
    hasPooja: true,
    poojaDate: '16th September 2026',
    poojaTime: '10:00 AM',
    message: 'आपण सहकुटुंब सहपरिवार\nश्री गणरायाच्या दर्शनासाठी\nआग्रहाचे निमंत्रण.',
    theme: 'purple' // Mocking theme
  });

  const activeTheme = THEMES[data.theme] || THEMES['purple'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: activeTheme.bg, color: activeTheme.color, minHeight: '100vh', fontFamily: 'Poppins, sans-serif', overflowX: 'hidden' }}>
      
      {/* ── Soft Particles Background ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: Math.random() * window.innerHeight, x: Math.random() * window.innerWidth, opacity: 0.1 + Math.random() * 0.3 }}
            animate={{ y: [null, Math.random() * -200], opacity: [null, 0.5, 0.1] }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', width: 4 + Math.random() * 4, height: 4 + Math.random() * 4, borderRadius: '50%', background: activeTheme.accent }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto', padding: '0', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* ── Hero Section ── */}
        <section style={{ padding: '4rem 2rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))', marginBottom: '1rem' }}>🪔</div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '1.4rem', color: activeTheme.accent, marginBottom: '2rem', letterSpacing: '0.05em' }}>
              || श्री गणेशाय नमः ||
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>Welcome To</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '3rem', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
              {data.familyName}
            </h1>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1.5rem', opacity: 0.9 }}>
              Ganesh Utsav 2026
            </h2>
          </motion.div>
        </section>

        {/* ── Invitation Message ── */}
        <section style={{ padding: '2rem', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            style={{ border: `2px solid ${activeTheme.accent}`, borderRadius: '24px', padding: '3rem 2rem', position: 'relative' }}
          >
            {/* Floral Corners */}
            <div style={{ position: 'absolute', top: -10, left: -10, fontSize: '2rem', background: activeTheme.bg, padding: '0.2rem' }}>🌸</div>
            <div style={{ position: 'absolute', bottom: -10, right: -10, fontSize: '2rem', background: activeTheme.bg, padding: '0.2rem' }}>🌸</div>
            
            <p style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '1.35rem', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}>
              {data.message}
            </p>
          </motion.div>
        </section>

        {/* ── Festival Schedule ── */}
        <section style={{ padding: '2rem' }}>
          <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', textAlign: 'center', marginBottom: '2rem', fontWeight: 700 }}>
            Festival Schedule
          </motion.h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ScheduleCard icon={Calendar} title="Arrival Date" value={data.arrivalDate} theme={activeTheme} />
            <ScheduleCard icon={Clock} title="Festival Duration" value={data.duration} theme={activeTheme} />
            
            {data.hasPooja && (
              <ScheduleCard icon={Calendar} title="Satyanarayan Pooja" value={`${data.poojaDate} at ${data.poojaTime}`} theme={activeTheme} highlight />
            )}
          </div>
        </section>

        {/* ── Venue & Contact ── */}
        <section style={{ padding: '2rem', marginTop: 'auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: data.theme === 'minimal' ? '#F9FAFB' : 'rgba(0,0,0,0.15)', borderRadius: '24px', padding: '2rem', textAlign: 'center' }}
          >
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>Venue</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <MapPin style={{ color: activeTheme.accent }} />
              <span style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>{data.address}</span>
            </div>

            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${activeTheme.accent}, transparent)`, margin: '2rem 0', opacity: 0.3 }} />
            
            <div style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Warm Regards</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{data.hostName}</div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
              <Phone size={16} /> {data.mobile}
            </div>
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ padding: '2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
          Created with devotion via Morya Murti Ghar
        </footer>

      </div>
    </div>
  );
}

function ScheduleCard({ icon: Icon, title, value, theme, highlight = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem', background: theme.bg === '#ffffff' ? '#F3F4F6' : 'rgba(255,255,255,0.08)', borderRadius: '16px', border: highlight ? `1px solid ${theme.accent}` : 'none' }}
    >
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.bg === '#ffffff' ? 'white' : theme.bg }}>
        <Icon size={24} />
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{title}</div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', fontWeight: 600 }}>{value}</div>
      </div>
    </motion.div>
  );
}
