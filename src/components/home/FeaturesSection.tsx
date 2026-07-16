import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

/* ─────────────────────────────────────────
   Animation Variants
───────────────────────────────────────── */


/* ─────────────────────────────────────────
   Component: Features Section
───────────────────────────────────────── */
export function FeaturesSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Ganesh Chaturthi 2026 is around September 14, 2026
  useEffect(() => {
    const targetDate = new Date('2026-09-14T00:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);


  const bookingSteps = [
    {
      icon: Search,
      title: 'Choose Your Idol',
      desc: 'Browse our premium collection online.'
    },
    {
      icon: QrCode,
      title: 'Pay Advance',
      desc: 'Pay advance securely using our UPI QR code.'
    },
    {
      icon: ShieldCheck,
      title: 'Admin Verification',
      desc: 'Payment is manually verified by our team.'
    },
    {
      icon: CheckCircle2,
      title: 'Booking Confirmed',
      desc: 'Receive confirmation on WhatsApp instantly.'
    }
  ];

  return (
    <section style={{ background: '#FCFCFC', padding: '5rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        
        {/* =========================================
            SECTION 1: FESTIVAL COUNTDOWN
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #3E1B5C 0%, #5B2C83 100%)',
            borderRadius: '24px',
            padding: '4rem 2rem',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(91,44,131,0.15)',
          }}
        >
          {/* Subtle animated background glow */}
          <motion.div
            animate={{ x: [-50, 50, -50], y: [-20, 20, -20] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '-20%', left: '-10%',
              width: '50%', height: '150%',
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '3rem' }}>
            {/* Left Content */}
            <div style={{ flex: '1 1 500px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(212,175,55,0.3)',
                padding: '0.4rem 1rem', borderRadius: 9999, marginBottom: '1.5rem',
                backdropFilter: 'blur(8px)',
              }}>
                <span>🪔</span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#D4AF37', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Ganesh Utsav 2026
                </span>
              </div>
              
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', lineHeight: 1.2, marginBottom: '2rem' }}>
                Ganesh Chaturthi<br />Begins In
              </h2>
              
              {/* Countdown Timer */}
              <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1.25rem)', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    padding: '1rem',
                    minWidth: 'clamp(70px, 15vw, 90px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  }}>
                    <motion.span
                      key={value}
                      initial={{ opacity: 0.5, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'white', lineHeight: 1 }}
                    >
                      {value.toString().padStart(2, '0')}
                    </motion.span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize', marginTop: '0.4rem' }}>
                      {unit}
                    </span>
                  </div>
                ))}
              </div>
              
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', margin: 0, maxWidth: '400px', lineHeight: 1.6 }}>
                Book your Ganpati before your favorite idol is reserved.
              </p>
            </div>
            
            {/* Right — Premium Ganesh Motif */}
            <div className="countdown-illustration" style={{ flex: '0 0 320px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 320 }}>
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', width: 300, height: 300, borderRadius: '50%',
                  border: '1px dashed rgba(212,175,55,0.35)',
                }}
              />
              {/* Inner rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', width: 240, height: 240, borderRadius: '50%',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              />
              {/* Glow */}
              <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)' }} />
              {/* Center OM */}
              <div style={{
                width: 140, height: 140, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))',
                border: '2px solid rgba(212,175,55,0.5)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 0 40px rgba(212,175,55,0.15)',
              }}>
                <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '4rem', color: '#D4AF37', lineHeight: 1, filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.7))' }}>ॐ</span>
              </div>
              {/* 8 petal dots */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                return (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                    style={{
                      position: 'absolute',
                      width: 8, height: 8, borderRadius: '50%', background: '#D4AF37',
                      top: '50%', left: '50%',
                      transform: `translate(calc(-50% + ${Math.cos(angle) * 145}px), calc(-50% + ${Math.sin(angle) * 145}px))`,
                      boxShadow: '0 0 8px rgba(212,175,55,0.6)',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>



        {/* =========================================
            SECTION 3: BOOKING PROCESS
            ========================================= */}
        <div style={{ paddingTop: '2rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#1F2937', marginBottom: '1rem' }}>
              Book Your Bappa in 4 Simple Steps
            </h2>
            <div style={{ height: 3, width: 60, background: 'linear-gradient(90deg, #5B2C83, #D4AF37)', borderRadius: 2, margin: '0 auto' }} />
          </motion.div>

          <div className="timeline-container" style={{ position: 'relative' }}>
            {/* Horizontal Line for Desktop */}
            <div className="timeline-line" style={{
              position: 'absolute', top: '40px', left: '10%', right: '10%',
              height: 2, background: 'rgba(91,44,131,0.1)', zIndex: 0
            }} />

            <div className="timeline-grid">
              {bookingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(212,175,55,0.25)' }}
                    style={{
                      width: 80, height: 80, borderRadius: '50%',
                      background: 'white', border: '3px solid white',
                      boxShadow: '0 8px 25px rgba(91,44,131,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.5rem',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 2, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FCFCFC, #F3F4F6)', zIndex: -1
                    }} />
                    <step.icon size={32} style={{ color: '#D4AF37' }} />
                    
                    {/* Step Number Badge */}
                    <div style={{
                      position: 'absolute', top: -5, right: -5,
                      width: 26, height: 26, borderRadius: '50%',
                      background: '#5B2C83', color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.85rem',
                      boxShadow: '0 2px 8px rgba(91,44,131,0.3)'
                    }}>
                      {index + 1}
                    </div>
                  </motion.div>
                  
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1F2937', marginBottom: '0.5rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#6B7280', margin: 0, lineHeight: 1.5, maxWidth: '240px' }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================
            SECTION 4: BOTTOM CALL TO ACTION
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            border: '2px solid rgba(91,44,131,0.08)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.04)',
            maxWidth: '800px',
            margin: '2rem auto 0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative accents */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #5B2C83, #D4AF37)' }} />
          
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', color: '#1F2937', marginBottom: '1rem' }}>
            Reserve Your Ganpati Before It's Booked
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', color: '#6B7280', margin: '0 auto 2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
            Our handcrafted idols are available in limited quantity. Reserve yours today with a simple QR-based booking process.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 25px rgba(91,44,131,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: '#5B2C83', color: 'white',
                border: 'none', borderRadius: 9999,
                padding: '0.875rem 2rem',
                fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                cursor: 'pointer', transition: 'background 0.2s',
              }}
            >
              Explore Collection
              <ArrowRight size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, background: 'rgba(91,44,131,0.04)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'white', color: '#5B2C83',
                border: '1.5px solid #5B2C83', borderRadius: 9999,
                padding: '0.875rem 2rem',
                fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem',
                cursor: 'pointer', transition: 'background 0.2s',
              }}
            >
              Contact on WhatsApp
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
        .trust-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        
        @media (max-width: 1024px) {
          .trust-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .countdown-illustration { display: none !important; }
        }
        
        @media (max-width: 768px) {
          .trust-stats-grid { grid-template-columns: 1fr; }
          .timeline-grid { 
            grid-template-columns: 1fr; 
            gap: 3rem;
          }
          .timeline-line {
            top: 0 !important;
            bottom: 0 !important;
            left: 50% !important;
            width: 2px !important;
            height: 100% !important;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
