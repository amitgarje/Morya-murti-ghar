import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section style={{ padding: '5rem 0', background: '#FCFCFC' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, #5B2C83 0%, #3E1B5C 100%)',
            borderRadius: '2rem',
            padding: 'clamp(2.5rem, 6vw, 4rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background pattern */}
          <div style={{
            position: 'absolute', top: '-30%', right: '-10%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'rgba(212,175,55,0.12)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-20%', left: '-5%',
            width: 300, height: 300, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '2rem', color: '#D4AF37',
              marginBottom: '1rem', opacity: 0.9,
            }}>
              गणपती बाप्पा मोरया
            </div>

            <h2 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'white',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1.25rem',
            }}>
              Book Your Idol for Ganesh Chaturthi 2025
            </h2>

            <p style={{
              fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.75)',
              fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '36rem', margin: '0 auto 2.5rem',
            }}>
              Limited slots available. Secure your premium Ganpati idol today and bring home the blessings of Bappa.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={{
                  background: '#D4AF37', color: 'white', border: 'none',
                  borderRadius: 9999, padding: '0.9rem 2.25rem',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  boxShadow: '0 6px 24px rgba(212,175,55,0.4)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,175,55,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(212,175,55,0.4)'; }}
              >
                Book Now <ArrowRight size={18} />
              </button>
              <button
                style={{
                  background: 'transparent', color: 'white',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: 9999, padding: '0.9rem 2.25rem',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem',
                  cursor: 'pointer', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}
              >
                View Catalog
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
