import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────
   Loader: Phase 1 = video intro, Phase 2 = welcome screen
───────────────────────────────────────── */
export function Loader() {
  const [phase, setPhase] = useState<'welcome-in' | 'welcome-out' | 'done'>('welcome-in');
  const [textPhase, setTextPhase] = useState<'english' | 'marathi'>('english');

  // Check if already shown in this session to avoid showing every page navigation
  const [visible] = useState(() => {
    const shown = sessionStorage.getItem('morya_loader_shown');
    return !shown;
  });

  useEffect(() => {
    if (!visible) return;

    // Play welcome audio (Ganesh aarti bell/chime) using Web Audio API fallback
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.type = 'sine';

    // Play a pleasant Om/bell-like tone sequence
    const playTone = (freq: number, start: number, duration: number, vol: number) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, ctx.currentTime + start);
      g.gain.setValueAtTime(0, ctx.currentTime + start);
      g.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
      o.start(ctx.currentTime + start);
      o.stop(ctx.currentTime + start + duration + 0.1);
    };

    // Bell-like ascending chord for auspicious opening
    playTone(432, 0.1, 1.5, 0.15);
    playTone(528, 0.3, 1.5, 0.12);
    playTone(639, 0.5, 1.5, 0.10);
    playTone(396, 0.0, 0.8, 0.08);

    // Welcome phase timings (adjusted for no video)
    const t1 = setTimeout(() => setTextPhase('marathi'), 1500);
    const t2 = setTimeout(() => setPhase('welcome-out'), 3000);
    const t3 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('morya_loader_shown', 'true');
    }, 3700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ctx.close();
    };
  }, [visible]);

  if (!visible || phase === 'done') return null;

  return (
    <AnimatePresence>
      {/* ── PHASE 2: WELCOME SCREEN ── */}
      {(phase === 'welcome-in' || phase === 'welcome-out') && (
        <motion.div
          key="welcome-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'welcome-out' ? 0 : 1 }}
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

          {/* Text block with language switch */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <AnimatePresence mode="wait">
              {textPhase === 'english' && (
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
              {textPhase === 'marathi' && (
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
