import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919324193646" target="_blank" rel="noreferrer"
        whileHover={{ scale: 1.12, boxShadow: '0 16px 32px rgba(37,211,102,0.5)' }} whileTap={{ scale: 0.9 }}
        title="Chat on WhatsApp"
        style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(37,211,102,0.35)', textDecoration: 'none' }}
      >
        <MessageCircle size={26} />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href="tel:+919324193646"
        whileHover={{ scale: 1.12, boxShadow: '0 16px 32px rgba(91,44,131,0.5)' }} whileTap={{ scale: 0.9 }}
        title="Call Us"
        style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #5B2C83, #7E4BAA)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(91,44,131,0.35)', textDecoration: 'none' }}
      >
        <Phone size={22} />
      </motion.a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            style={{ width: 48, height: 48, borderRadius: '50%', background: 'white', color: '#1F2937', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #E5E7EB', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
