import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'english' | 'marathi' | 'out'>('english');

  useEffect(() => {
    // Phase 1: English (1.4s)
    const t1 = setTimeout(() => setPhase('marathi'), 1400);
    // Phase 2: Marathi (1.4s)
    const t2 = setTimeout(() => setPhase('out'), 2800);
    // Phase 3: Fade out (0.6s)
    const t3 = setTimeout(() => setVisible(false), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'linear-gradient(135deg, #3E1B5C 0%, #5B2C83 60%, #4A2470 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem',
            overflow: 'hidden',
          }}
        >
          {/* Soft background radials */}
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Mandala rings */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 180 + i * 100, height: 180 + i * 100,
                borderRadius: '50%',
                border: `1px solid rgba(212,175,55,${0.12 - i * 0.03})`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* OM icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 90, height: 90, borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #EBD076)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(212,175,55,0.5), 0 0 80px rgba(212,175,55,0.2)',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '2.8rem', color: '#3E1B5C', lineHeight: 1 }}>ॐ</span>
          </motion.div>

          {/* Text block */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <AnimatePresence mode="wait">
              {phase === 'english' && (
                <motion.div
                  key="english"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', color: 'rgba(212,175,55,0.8)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Welcome to
                  </p>
                  <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
                    Morya Murti Ghar
                  </h1>
                </motion.div>
              )}
              {phase === 'marathi' && (
                <motion.div
                  key="marathi"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: 'rgba(212,175,55,0.8)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    स्वागत आहे
                  </p>
                  <h1 style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', color: 'white', lineHeight: 1.2, margin: 0 }}>
                    मोरया मूर्ती घर
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', color: '#D4AF37', textAlign: 'center', margin: 0 }}
          >
            घरामध्ये बाप्पा, आनंदाची खजिना!
          </motion.p>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37' }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
