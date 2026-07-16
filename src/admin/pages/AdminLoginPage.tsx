import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Key, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AdminLoginPage() {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please provide the security key.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = loginAdmin(password);
      setIsLoading(false);
      if (success) {
        navigate('/admin');
      } else {
        setError('Unauthorized key. Access denied.');
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#13131A',
      padding: '40px 24px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      {/* Background radial highlight */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(91, 44, 131, 0.15) 0%, rgba(212, 175, 55, 0.02) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(26, 26, 38, 0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #2D2D44 0%, #1F1F2E 100%)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 30px rgba(212, 175, 55, 0.1)'
          }}>
            <ShieldAlert size={28} color="#D4AF37" />
          </div>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '0.5px'
          }}>
            ADMIN SECURE AREA
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.82rem',
            marginTop: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Access restricted to authorized personnel only
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              color: '#EF4444',
              fontSize: '0.85rem',
              textAlign: 'center',
              fontWeight: 500,
              marginBottom: '20px'
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>Security Authorization Key</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.4)'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  outline: 'none',
                  fontSize: '0.92rem',
                  fontFamily: 'Poppins, sans-serif',
                  background: 'rgba(255, 255, 255, 0.03)',
                  color: '#FFFFFF',
                  transition: 'all 0.2s'
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#D4AF37';
                  e.target.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(212, 175, 55, 0.2)' }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B29026 100%)',
              color: '#13131A',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '10px',
              letterSpacing: '0.5px'
            }}
          >
            {isLoading ? 'Verifying Authorization...' : 'ACCESS CONTROL PANEL'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
