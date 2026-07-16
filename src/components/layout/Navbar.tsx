import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/catalog' },
  { label: 'Invitation', to: '/invitation' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const { isCustomerLoggedIn, currentCustomer, logoutCustomer } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ─── Main Header ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: isScrolled ? 72 : 80,
          transition: 'height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
          background: isScrolled ? 'rgba(252, 252, 252, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
          boxShadow: isScrolled ? '0 1px 0 rgba(0,0,0,0.03), 0 4px 30px rgba(0,0,0,0.04)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.04)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>

          {/* ─── LEFT: Logo + Brand ─── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              {/* Ganesh Icon */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #5B2C83 0%, #7E4BAA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(91,44,131,0.3)',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: 'Noto Sans Devanagari, sans-serif',
                  fontSize: '1.3rem',
                  color: '#D4AF37',
                  lineHeight: 1,
                  userSelect: 'none',
                }}>ॐ</span>
              </div>

              {/* Brand Text */}
              <div>
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#5B2C83',
                  letterSpacing: '-0.4px',
                  lineHeight: 1.2,
                }}>
                  Morya Murti Ghar
                </div>
                <div style={{
                  fontFamily: 'Noto Sans Devanagari, sans-serif',
                  fontSize: '0.72rem',
                  color: '#9CA3AF',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  letterSpacing: '0.01em',
                }}>
                  घरामध्ये बाप्पा, आनंदाची खजिना!
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ─── CENTER: Nav Links (Desktop) ─── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="mmg-desktop-nav">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                >
                  <NavLink to={link.to} label={link.label} isActive={isActive} />
                </motion.div>
              );
            })}
          </nav>

          {/* ─── RIGHT: Action Buttons (Desktop) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            className="mmg-desktop-actions"
          >
            {/* WhatsApp Button */}
            <WhatsAppButton />

            {/* Book Now Button */}
            <BookNowButton />

            {/* Customer Auth Button */}
            {isCustomerLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#5B2C83', background: 'rgba(91,44,131,0.08)', padding: '6px 12px', borderRadius: '20px', fontFamily: 'Outfit, sans-serif' }}>
                  Hi, {currentCustomer?.name.split(' ')[0]}
                </span>
                <button
                  onClick={logoutCustomer}
                  title="Logout"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, border: 'none', background: 'rgba(239, 68, 68, 0.08)',
                    borderRadius: '50%', color: '#EF4444', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '0.6rem 1.2rem', border: '1px solid rgba(91,44,131,0.2)',
                  borderRadius: 9999, background: 'none', color: '#5B2C83',
                  fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s'
                }}
              >
                <User size={14} />
                Login
              </Link>
            )}
          </motion.div>

          {/* ─── Hamburger (Mobile) ─── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setMobileOpen(true)}
            style={{
              background: 'none',
              border: '1.5px solid rgba(91,44,131,0.2)',
              borderRadius: '10px',
              cursor: 'pointer',
              color: '#5B2C83',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            className="mmg-mobile-menu-btn"
            whileHover={{ scale: 1.05, borderColor: 'rgba(91,44,131,0.4)' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </motion.button>
        </div>
      </motion.header>

      {/* ─── Mobile Drawer Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 1100,
                background: 'rgba(15, 5, 25, 0.5)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            {/* Slide-in Panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                zIndex: 1200,
                width: 'min(320px, 85vw)',
                background: '#FCFCFC',
                boxShadow: '-20px 0 80px rgba(0,0,0,0.15)',
                borderRadius: '24px 0 0 24px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Drawer Header */}
              <div style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '10px',
                    background: 'linear-gradient(135deg, #5B2C83, #7E4BAA)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(91,44,131,0.25)',
                  }}>
                    <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '1.1rem', color: '#D4AF37' }}>ॐ</span>
                  </div>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#5B2C83' }}>
                    Morya Murti Ghar
                  </span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    background: 'rgba(91,44,131,0.08)',
                    border: 'none', cursor: 'pointer',
                    borderRadius: '8px', padding: '0.4rem',
                    color: '#5B2C83',
                    display: 'flex',
                  }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Drawer Nav Links */}
              <nav style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                    >
                      <Link
                        to={link.to}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.875rem 1rem',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          background: isActive ? 'rgba(91,44,131,0.08)' : 'transparent',
                          color: isActive ? '#5B2C83' : '#374151',
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '1.05rem',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'rgba(91,44,131,0.05)';
                            e.currentTarget.style.color = '#5B2C83';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#374151';
                          }
                        }}
                      >
                        {isActive && (
                          <span style={{
                            width: 4, height: '1.1rem', background: '#D4AF37',
                            borderRadius: 2, display: 'inline-block', flexShrink: 0,
                          }} />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer Footer Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  padding: '1.25rem 1.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {isCustomerLoggedIn && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151', fontFamily: 'Outfit, sans-serif' }}>
                      Hi, {currentCustomer?.name}
                    </span>
                    <button
                      onClick={() => { logoutCustomer(); setMobileOpen(false); }}
                      style={{
                        background: 'none', border: 'none', color: '#EF4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer'
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
                <WhatsAppButton fullWidth />
                <BookNowButton fullWidth />
                {!isCustomerLoggedIn && (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '0.65rem', border: '1.5px solid rgba(91,44,131,0.2)',
                      borderRadius: 9999, background: 'none', color: '#5B2C83',
                      fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', cursor: 'pointer',
                      fontFamily: 'Outfit, sans-serif', width: '100%', textAlign: 'center'
                    }}
                  >
                    <User size={15} />
                    Login / Sign Up
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Responsive CSS ─── */}
      <style>{`
        @media (min-width: 900px) {
          .mmg-desktop-nav { display: flex !important; }
          .mmg-desktop-actions { display: flex !important; }
          .mmg-mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 899px) {
          .mmg-desktop-nav { display: none !important; }
          .mmg-desktop-actions { display: none !important; }
          .mmg-mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ─── Sub-Components ─── */

function NavLink({ to, label, isActive }: { to: string; label: string; isActive: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '0.5rem 0.875rem',
        textDecoration: 'none',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: isActive ? 600 : 500,
        fontSize: '0.95rem',
        color: isActive ? '#5B2C83' : hovered ? '#D4AF37' : '#374151',
        transition: 'color 0.25s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {/* Underline */}
      <span style={{
        position: 'absolute',
        bottom: 2, left: '0.875rem', right: '0.875rem',
        height: 2,
        borderRadius: 2,
        background: isActive ? '#5B2C83' : '#D4AF37',
        transform: (isActive || hovered) ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: isActive ? 'left' : 'center',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'block',
      }} />
    </Link>
  );
}

function WhatsAppButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.45rem',
        padding: '0.6rem 1.25rem',
        borderRadius: 9999,
        border: '1.5px solid #5B2C83',
        background: hovered ? 'rgba(91,44,131,0.06)' : 'white',
        color: '#5B2C83',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
        fontSize: '0.9rem',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.22s ease',
        whiteSpace: 'nowrap',
        width: fullWidth ? '100%' : 'auto',
        boxShadow: '0 1px 4px rgba(91,44,131,0.1)',
      }}
    >
      {/* WhatsApp icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      WhatsApp
    </motion.a>
  );
}

function BookNowButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.45rem',
        padding: '0.6rem 1.35rem',
        borderRadius: 9999,
        border: 'none',
        background: hovered
          ? 'linear-gradient(135deg, #3E1B5C, #5B2C83)'
          : 'linear-gradient(135deg, #5B2C83, #7E4BAA)',
        color: 'white',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
        fontSize: '0.9rem',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        width: fullWidth ? '100%' : 'auto',
        boxShadow: hovered
          ? '0 8px 24px rgba(91,44,131,0.45)'
          : '0 4px 14px rgba(91,44,131,0.35)',
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      <Calendar size={15} />
      Book Now
    </motion.button>
  );
}
