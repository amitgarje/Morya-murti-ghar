import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Secret admin credentials
const ADMIN_NAME = 'admin@2006';
const ADMIN_MOBILE = '9029263731';

export function LoginPage() {
  const { loginCustomer, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/catalog';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // Check for secret admin credentials
      if (name.trim().toLowerCase() === ADMIN_NAME && mobile === ADMIN_MOBILE) {
        // Log in as admin silently
        loginAdmin('morya@2026');
        setIsLoading(false);
        navigate('/admin', { replace: true });
        return;
      }

      // Normal customer login
      loginCustomer(name, mobile);
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 10% 20%, rgba(91, 44, 131, 0.05) 0%, rgba(212, 175, 55, 0.03) 90.1%)',
      padding: '100px 16px 40px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '24px',
          padding: 'clamp(24px, 5vw, 40px)',
          boxShadow: '0 20px 50px rgba(91, 44, 131, 0.06)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top decorative bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
          background: 'linear-gradient(90deg, #5B2C83 0%, #D4AF37 100%)'
        }} />

        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 4vw, 32px)' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #5B2C83 0%, #7E4BAA 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 8px 20px rgba(91, 44, 131, 0.25)'
          }}>
            <User size={26} color="#D4AF37" />
          </div>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 800, color: '#1F2937', margin: 0
          }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{ color: '#6B7280', fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', marginTop: '8px' }}>
            {isSignUp ? 'Sign up to reserve your custom Ganesha idol' : 'Log in to manage bookings and customize invitations'}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#FEE2E2', border: '1px solid #FCA5A5',
              borderRadius: '12px', padding: '10px 14px',
              color: '#DC2626', fontSize: '0.83rem', fontWeight: 500,
              marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <span>⚠️</span> {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block', fontSize: '0.8rem', fontWeight: 600,
              color: '#4B5563', marginBottom: '6px',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)', color: '#9CA3AF'
              }} />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%', padding: '11px 14px 11px 40px',
                  borderRadius: '12px', border: '1px solid #E5E7EB',
                  outline: 'none', fontSize: '0.9rem',
                  fontFamily: 'Poppins, sans-serif',
                  background: '#F9FAFB', color: '#1F2937',
                  transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#5B2C83'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block', fontSize: '0.8rem', fontWeight: 600,
              color: '#4B5563', marginBottom: '6px',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>Mobile Number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)', color: '#9CA3AF'
              }} />
              <input
                type="tel"
                placeholder="10-digit number"
                value={mobile}
                onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                style={{
                  width: '100%', padding: '11px 14px 11px 40px',
                  borderRadius: '12px', border: '1px solid #E5E7EB',
                  outline: 'none', fontSize: '0.9rem',
                  fontFamily: 'Poppins, sans-serif',
                  background: '#F9FAFB', color: '#1F2937',
                  transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#5B2C83'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, boxShadow: '0 8px 24px rgba(91, 44, 131, 0.25)' }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            style={{
              background: 'linear-gradient(135deg, #5B2C83 0%, #7E4BAA 100%)',
              color: 'white', padding: '13px',
              borderRadius: '12px', border: 'none',
              fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px', marginTop: '6px',
              transition: 'opacity 0.2s'
            }}
          >
            {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
            {!isLoading && <ArrowRight size={18} />}
          </motion.button>
        </form>

        <div style={{
          marginTop: '24px', textAlign: 'center',
          borderTop: '1px solid #F3F4F6', paddingTop: '18px'
        }}>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none', border: 'none', color: '#5B2C83',
              fontWeight: 600, fontSize: '0.86rem', cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
