import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function LoginPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;

    setIsLoading(true);
    setTimeout(() => {
      const isAdmin = loginUser(name, mobile);
      setIsLoading(false);
      
      if (isAdmin) {
        navigate('/admin');
      } else {
        // Redirect to previous page or catalog
        const from = (location.state as any)?.from || '/catalog';
        navigate(from);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FCFCFC',
      padding: '40px 24px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(91, 44, 131, 0.08) 0%, rgba(212, 175, 55, 0.02) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #5B2C83 0%, #7E4BAA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(91, 44, 131, 0.25)'
          }}>
            <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '1.8rem', color: '#D4AF37' }}>ॐ</span>
          </div>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: '#1F2937',
            margin: 0,
            letterSpacing: '-0.5px'
          }}>
            Welcome Back
          </h2>
          <p style={{
            color: '#6B7280',
            fontSize: '0.9rem',
            marginTop: '8px',
          }}>
            Please enter your details to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'Poppins, sans-serif',
                  background: '#F9FAFB',
                  color: '#1F2937',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={e => { e.target.style.borderColor = '#5B2C83'; e.target.style.background = '#FFFFFF'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="tel"
                required
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'Poppins, sans-serif',
                  background: '#F9FAFB',
                  color: '#1F2937',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={e => { e.target.style.borderColor = '#5B2C83'; e.target.style.background = '#FFFFFF'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
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
              color: '#FFFFFF',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '10px',
              opacity: isLoading ? 0.8 : 1,
            }}
          >
            {isLoading ? 'Verifying...' : <><LogIn size={18} /> Continue</>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
