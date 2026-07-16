import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

export function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const contactItems = [
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 98765 43210',
      sub: 'Mon – Sun, 9 AM – 8 PM',
      href: 'tel:+919876543210',
      color: '#5B2C83',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+91 98765 43210',
      sub: 'Quick replies on WhatsApp',
      href: 'https://wa.me/919876543210',
      color: '#25D366',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@moryamurtighar.in',
      sub: 'We reply within 24 hours',
      href: 'mailto:contact@moryamurtighar.in',
      color: '#D4AF37',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Pune, Maharashtra',
      sub: 'Walk-in welcome during festival season',
      href: '#',
      color: '#EF4444',
    },
  ];

  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '80px', fontFamily: 'Poppins, sans-serif' }}>

      {/* ── Page Header ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.1rem', borderRadius: 9999, marginBottom: '1.5rem',
            background: 'rgba(91,44,131,0.07)', border: '1px solid rgba(91,44,131,0.15)',
          }}>
            <span>📞</span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#5B2C83', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Get In Touch
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#1F2937',
            lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 1rem',
          }}>
            Contact <span style={{ background: 'linear-gradient(135deg, #5B2C83, #9B59B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Morya Murti Ghar</span>
          </h1>

          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', color: '#6B7280', lineHeight: 1.8, maxWidth: '30rem', margin: '0 auto' }}>
            Have a question about an idol or want to book your Bappa? We're happy to help. Reach out to us anytime.
          </p>
        </motion.div>
      </section>

      {/* ── Contact Cards ── */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '1.5rem',
        }}>
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(91,44,131,0.1)' }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', gap: '0.75rem',
                  padding: '2.25rem 1.5rem',
                  background: 'white', borderRadius: '20px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: '16px',
                  background: `${item.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={26} style={{ color: item.color }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1F2937', marginBottom: '0.25rem' }}>
                    {item.value}
                  </div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>
                    {item.sub}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* ── Hours Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            marginTop: '2.5rem',
            padding: '2rem 2.5rem',
            background: 'linear-gradient(135deg, #3E1B5C 0%, #5B2C83 100%)',
            borderRadius: '20px',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '12px',
              background: 'rgba(212,175,55,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Clock size={22} style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Showroom Hours</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Open every day during festival season</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { day: 'Mon – Fri', time: '10 AM – 8 PM' },
              { day: 'Sat – Sun', time: '9 AM – 9 PM' },
            ].map(s => (
              <div key={s.day} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: 'rgba(212,175,55,0.8)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{s.day}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white' }}>{s.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
