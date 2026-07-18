import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';

/* ─────────────────────────────────────────
   Animation Variants
───────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeDown = {
  hidden: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9 } },
};

/* ─────────────────────────────────────────
   Floating Particles
───────────────────────────────────────── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.7) 0%, transparent 70%)',
        pointerEvents: 'none',
        ...style,
      }}
      animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
    />
  );
}

/* ─────────────────────────────────────────
   Subtle Mandala Watermark
───────────────────────────────────────── */
function MandalaWatermark() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 0,
    }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${260 + i * 55}px`,
          height: `${260 + i * 55}px`,
          borderRadius: '50%',
          border: `1px solid rgba(212,175,55,${0.07 - i * 0.01})`,
        }} />
      ))}
      {/* Decorative petal lines */}
      {[...Array(12)].map((_, i) => (
        <div key={`p-${i}`} style={{
          position: 'absolute',
          width: 2, height: 90,
          background: `rgba(212,175,55,0.06)`,
          transformOrigin: 'bottom center',
          transform: `rotate(${i * 30}deg) translateY(-140px)`,
          borderRadius: 2,
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Hero Section
───────────────────────────────────────── */
export function HeroSection() {
  /* Subtle parallax on mouse move for the image */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [4, -4]);
  const rotateY = useTransform(springX, [-300, 300], [-4, 4]);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  const particles = [
    { width: 6, height: 6, top: '18%', left: '8%' },
    { width: 4, height: 4, top: '72%', left: '5%' },
    { width: 8, height: 8, top: '40%', left: '12%' },
    { width: 5, height: 5, top: '85%', left: '20%' },
    { width: 6, height: 6, top: '55%', right: '6%' },
    { width: 4, height: 4, top: '25%', right: '10%' },
    { width: 7, height: 7, top: '65%', right: '15%' },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#FCFCFC',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '80px', /* navbar height */
      }}
    >
      {/* ── Background Blobs ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Purple blob — top left */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-15%', left: '-10%',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91,44,131,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Gold blob — bottom right */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], y: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '-20%', right: '-8%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)',
          }}
        />
        {/* Purple blob — bottom left */}
        <div style={{
          position: 'absolute', bottom: '-5%', left: '10%',
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,44,131,0.04) 0%, transparent 70%)',
        }} />
        {/* Gold top corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 280, height: 280,
          background: 'radial-gradient(circle at top right, rgba(212,175,55,0.06) 0%, transparent 60%)',
        }} />
      </div>

      {/* ── Floating Gold Particles ── */}
      {particles.map((p, i) => <Particle key={i} style={p} />)}

      {/* ── Main Content Grid ── */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: 'clamp(2rem,6vw,5rem) 1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,460px), 1fr))',
        gap: 'clamp(2rem,5vw,5rem)',
        alignItems: 'center',
        width: '100%',
        position: 'relative', zIndex: 1,
      }}>

        {/* ╔══════════════════════════════╗
            ║   LEFT — Text Content        ║
            ╚══════════════════════════════╝ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* ── Badge ── */}
          <motion.div variants={fadeDown}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.45rem 1.1rem',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(212,175,55,0.4)',
              boxShadow: '0 4px 16px rgba(212,175,55,0.12), 0 1px 4px rgba(0,0,0,0.04)',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: '0.9rem' }}>🙏</span>
              <span style={{
                fontFamily: 'Noto Sans Devanagari, sans-serif',
                fontWeight: 500, fontSize: '0.85rem',
                color: '#9A7A1A',
                letterSpacing: '0.02em',
              }}>
                श्री गणेशाय नमः
              </span>
              <span style={{ fontSize: '0.9rem' }}>🙏</span>
            </div>
          </motion.div>

          {/* ── Main Heading ── */}
          <motion.div variants={fadeUp}>
            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 3.85rem)',
              color: '#1F2937',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              <span style={{ display: 'block' }}>Morya</span>
              <span style={{ display: 'block' }}>
                Murti{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #5B2C83, #9B59B6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Ghar</span>
              </span>
            </h1>
          </motion.div>

          {/* ── Gold divider ── */}
          <motion.div variants={fadeIn}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <div style={{ height: 2, width: 36, background: 'linear-gradient(90deg, #D4AF37, #EBD076)', borderRadius: 2 }} />
              <span style={{ color: '#D4AF37', fontSize: '1rem' }}>✦</span>
              <div style={{ height: 2, width: 20, background: 'rgba(212,175,55,0.3)', borderRadius: 2 }} />
            </div>
          </motion.div>

          {/* ── Marathi Shloka ── */}
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'Noto Sans Devanagari, sans-serif',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              color: '#6B4F9A',
              lineHeight: 1.9,
              margin: 0,
              fontStyle: 'italic',
              borderLeft: '3px solid rgba(212,175,55,0.4)',
              paddingLeft: '1rem',
            }}>
              ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥<br />
              ॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>
          </motion.div>

          {/* ── Description ── */}
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
              color: '#6B7280',
              lineHeight: 1.8,
              margin: 0,
              maxWidth: '30rem',
            }}>
              Discover beautifully handcrafted Ganesh idols and contact us to reserve your Bappa. Celebrate this Ganesh Utsav with devotion and convenience.
            </p>
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center' }}
          >
            {/* Primary */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 32px rgba(91,44,131,0.45)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem',
                borderRadius: 9999,
                border: 'none',
                background: 'linear-gradient(135deg, #5B2C83 0%, #7E4BAA 100%)',
                color: 'white',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(91,44,131,0.35)',
                transition: 'background 0.25s',
              }}
            >
              Explore Collection
              <ArrowRight size={18} />
            </motion.button>

            {/* Secondary */}
            <motion.button
              whileHover={{ scale: 1.03, background: 'rgba(91,44,131,0.05)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem',
                borderRadius: 9999,
                border: '2px solid #5B2C83',
                background: 'white',
                color: '#5B2C83',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <Phone size={16} />
              Contact Us
            </motion.button>
          </motion.div>

          {/* ── Trust Indicators ── */}
          <motion.div
            variants={fadeIn}
            style={{
              display: 'flex', flexWrap: 'wrap', gap: '1rem 1.5rem',
              paddingTop: '0.5rem',
            }}
          >
            {['Premium Quality', 'Handcrafted Idols', 'Trusted by Families'].map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <CheckCircle size={15} style={{ color: '#22C55E', flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.85rem',
                  color: '#374151',
                  fontWeight: 500,
                }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ╔══════════════════════════════╗
            ║   RIGHT — Hero Image         ║
            ╚══════════════════════════════╝ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 460,
          }}
        >
          {/* Golden radial glow */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%', height: '80%',
            background: 'radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 65%)',
            borderRadius: '50%',
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Mandala watermark behind image */}
          <MandalaWatermark />

          {/* Floating image with parallax */}
          <motion.div
            style={{ rotateX, rotateY, perspective: 1200, zIndex: 2, position: 'relative' }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Outer ring glow */}
            <div style={{
              position: 'absolute', inset: -20, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
              animation: 'pulseGlow 3s ease-in-out infinite',
            }} />

            {/* Image Container */}
            <div style={{
              width: 'clamp(280px, 36vw, 460px)',
              height: 'clamp(280px, 36vw, 460px)',
              borderRadius: '40% 60% 55% 45% / 40% 45% 55% 60%',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(252,248,240,0.95))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative',
              boxShadow: `
                0 30px 80px rgba(91,44,131,0.12),
                0 10px 30px rgba(212,175,55,0.1),
                0 0 0 1px rgba(212,175,55,0.12),
                inset 0 1px 0 rgba(255,255,255,0.8)
              `,
            }}>
              <img
                src="/ganesh-hero.png"
                alt="Premium Ganesh Idol — Morya Murti Ghar"
                style={{
                  width: '90%', height: '90%', objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 40px rgba(91,44,131,0.18)) drop-shadow(0 8px 16px rgba(212,175,55,0.2))',
                }}
              />
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '0.72rem', color: '#9CA3AF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 24, height: 38, border: '2px solid rgba(91,44,131,0.25)',
            borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6,
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 4, height: 8, background: '#5B2C83', borderRadius: 2 }}
          />
        </motion.div>
      </motion.div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        /* ── Mobile Hero ── */
        @media (max-width: 640px) {
          section { padding-top: 64px !important; }
        }
        /* Ensure hero grid stacks on mobile */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-text-col {
            align-items: center !important;
          }
          .hero-text-col .shloka-border {
            margin: 0 auto;
          }
          .hero-text-col .trust-row {
            justify-content: center;
          }
          .hero-text-col .cta-row {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
