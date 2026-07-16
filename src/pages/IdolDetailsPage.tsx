import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Heart, Share2, CheckCircle2, ShieldCheck, 
  Store, Camera, QrCode, User, Phone, MapPin, Calendar, 
  FileText, Hash, CheckSquare, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ─────────────────────────────────────────
   Mock Data for the Idol
───────────────────────────────────────── */
const MOCK_IDOL = {
  id: 'G101',
  name: 'Shree Ganesh Idol',
  description: 'Beautifully handcrafted Ganesh idol designed with devotion, elegance and traditional craftsmanship. Perfect for bringing peace and prosperity to your home.',
  price: '₹ 2,500',
  advanceAmount: '₹ 1,000',
  stock: 2,
  status: 'Available',
  label: 'Premium Collection',
  images: [
    '/ganesh-hero.png',
    '/ganesh-hero.png',
    '/ganesh-hero.png',
    '/ganesh-hero.png'
  ],
  specs: {
    'Height': '2 Ft',
    'Material': 'Eco Friendly (Shadu Mati)',
    'Painting Style': 'Natural Colors',
    'Category': 'Home Ganpati'
  }
};

/* ─────────────────────────────────────────
   Component: Idol Details & Booking Page
───────────────────────────────────────── */
export function IdolDetailsPage() {
  const { id } = useParams();
  const { isCustomerLoggedIn } = useAuth();
  const location = useLocation();
  const [activeImage, setActiveImage] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', mobile: '', whatsapp: '', address: '', pickupDate: '', notes: '', utr: '', paidAmount: '', consent: false
  });

  const handleScroll = () => {
    // Optionally trigger animations on scroll
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0); // scroll to top on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.consent) {
      setIsSuccess(true);
    }
  };

  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '80px', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem 1rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#6B7280' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#6B7280' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/catalog" style={{ textDecoration: 'none', color: '#6B7280' }}>Collection</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#5B2C83', fontWeight: 500 }}>{MOCK_IDOL.name} - {id || MOCK_IDOL.id}</span>
        </nav>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '1rem 1.5rem 4rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', position: 'relative' }}>
        
        {/* =========================================
            LEFT COLUMN (60%) - Image Showcase
            ========================================= */}
        <div style={{ flex: '1 1 600px', minWidth: '0' }}>
          
          {/* Main Hero Image */}
          <div style={{
            position: 'relative', width: '100%', height: 'clamp(350px, 50vw, 550px)',
            background: 'linear-gradient(145deg, #F9FAFB, #F3F4F6)',
            borderRadius: '24px', overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
            marginBottom: '1rem'
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={MOCK_IDOL.images[activeImage]}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2rem', filter: 'drop-shadow(0 20px 30px rgba(91,44,131,0.15))' }}
                whileHover={{ scale: 1.1, cursor: 'zoom-in' }} // Simple zoom on hover
              />
            </AnimatePresence>

            {/* Badges */}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '0.4rem 1rem', borderRadius: 9999, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <Camera size={14} style={{ color: '#5B2C83' }} />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#1F2937' }}>Hover to zoom</span>
            </div>
          </div>

          {/* Thumbnails Gallery */}
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
            {MOCK_IDOL.images.map((img, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveImage(i)}
                whileHover={{ y: -3 }}
                style={{
                  width: '80px', height: '80px', borderRadius: '16px',
                  background: '#F3F4F6', cursor: 'pointer',
                  border: activeImage === i ? '2px solid #5B2C83' : '2px solid transparent',
                  boxShadow: activeImage === i ? '0 4px 12px rgba(91,44,131,0.2)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', flexShrink: 0
                }}
              >
                <img src={img} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </motion.div>
            ))}
          </div>

        </div>


        {/* =========================================
            RIGHT COLUMN (40%) - Info & Booking
            ========================================= */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* ── Product Info ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEF3C7', color: '#B45309', padding: '0.3rem 0.8rem', borderRadius: 9999, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.75rem' }}>
                🌟 {MOCK_IDOL.label}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'white', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', cursor: 'pointer' }}><Share2 size={16} /></button>
                <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'white', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', cursor: 'pointer' }}><Heart size={16} /></button>
              </div>
            </div>

            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#1F2937', marginBottom: '0.5rem', lineHeight: 1.1 }}>
              {MOCK_IDOL.name} - {id || MOCK_IDOL.id}
            </h1>
            
            <p style={{ color: '#6B7280', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              "{MOCK_IDOL.description}"
            </p>

            {/* Price Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#5B2C83' }}>{MOCK_IDOL.price}</span>
              <span style={{ background: '#ECFCCB', color: '#4D7C0F', padding: '0.3rem 0.8rem', borderRadius: 9999, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#65A30D' }} />
                {MOCK_IDOL.status}
              </span>
              {MOCK_IDOL.stock <= 3 && (
                <span style={{ color: '#EF4444', fontWeight: 600, fontSize: '0.85rem' }}>Only {MOCK_IDOL.stock} left</span>
              )}
            </div>

            {/* Specs Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
              {Object.entries(MOCK_IDOL.specs).map(([key, value]) => (
                <div key={key} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', padding: '0.5rem 1rem', borderRadius: 9999, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{key}:</span>
                  <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Trust Icons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', padding: '1.5rem', background: '#F9FAFB', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4B5563', fontSize: '0.85rem', fontWeight: 500 }}><CheckCircle2 size={16} color="#22C55E"/> Handcrafted</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4B5563', fontSize: '0.85rem', fontWeight: 500 }}><ShieldCheck size={16} color="#D4AF37"/> Premium Quality</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4B5563', fontSize: '0.85rem', fontWeight: 500 }}><Store size={16} color="#5B2C83"/> Trusted Shop</div>
            </div>
          </motion.div>

          {/* ── Booking Section ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}
          >
            {/* Top decorative line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #5B2C83, #D4AF37)' }} />

            {!isCustomerLoggedIn ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(91,44,131,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <User size={24} color="#5B2C83" />
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.35rem', color: '#1F2937', marginBottom: '0.5rem' }}>Reserve Your Ganesha</h2>
                <p style={{ color: '#6B7280', fontSize: '0.88rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                  Please login or sign up first to proceed with checking out and securing this Ganesha idol.
                </p>
                <Link
                  to="/login"
                  state={{ from: location }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #5B2C83, #7E4BAA)', color: 'white', padding: '0.8rem 1.6rem',
                    borderRadius: '12px', textDecoration: 'none', fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(91,44,131,0.25)', transition: 'all 0.2s'
                  }}
                >
                  Log In / Sign Up <ArrowRight size={16} />
                </Link>
              </div>
            ) : !isSuccess ? (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#1F2937', marginBottom: '0.25rem' }}>Reserve Your Ganpati</h2>
                <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '2rem' }}>Reserve this idol by paying the advance amount through the QR code below.</p>

                {/* Step 1: QR Code */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#5B2C83', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>1</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1F2937' }}>Payment</h3>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', background: '#F9FAFB', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E5E7EB', alignItems: 'center' }}>
                    <div style={{ width: 100, height: 100, background: 'white', border: '2px dashed #D1D5DB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={40} color="#9CA3AF" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.25rem' }}>Advance Amount</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#5B2C83', marginBottom: '0.5rem' }}>{MOCK_IDOL.advanceAmount}</div>
                      <div style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>UPI ID: moryamurti@upi <button type="button" style={{ background: 'none', border: 'none', color: '#5B2C83', cursor: 'pointer' }}><Share2 size={12}/></button></div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#9CA3AF', textAlign: 'center', marginTop: '0.75rem' }}>Scan using any UPI application.</p>
                </div>

                {/* Step 2: Form */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#5B2C83', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>2</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1F2937' }}>Your Details</h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Input icon={User} placeholder="Full Name" required onChange={v => setFormData({...formData, name: v})} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <Input icon={Phone} placeholder="Mobile No." required onChange={v => setFormData({...formData, mobile: v})} />
                      <Input icon={Phone} placeholder="WhatsApp No." required onChange={v => setFormData({...formData, whatsapp: v})} />
                    </div>
                    <Input icon={MapPin} placeholder="Address / Location" required onChange={v => setFormData({...formData, address: v})} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <Input icon={Calendar} placeholder="Pickup Date" type="date" required onChange={v => setFormData({...formData, pickupDate: v})} />
                      <Input icon={FileText} placeholder="Notes (Optional)" onChange={v => setFormData({...formData, notes: v})} />
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment Verification */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#5B2C83', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>3</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1F2937' }}>Verify Payment</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <Input icon={Hash} placeholder="Transaction (UTR) No." required onChange={v => setFormData({...formData, utr: v})} />
                    <Input icon={Hash} placeholder="Amount Paid (₹)" required onChange={v => setFormData({...formData, paidAmount: v})} />
                  </div>
                  
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" required onChange={e => setFormData({...formData, consent: e.target.checked})} style={{ marginTop: '0.2rem', accentColor: '#5B2C83' }} />
                    <span style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5 }}>I have successfully completed the payment of the advance amount to the provided UPI ID.</span>
                  </label>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(91,44,131,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{ width: '100%', background: '#5B2C83', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  Submit Booking <ArrowRight size={18} />
                </motion.button>
              </form>
            ) : (
              // ── Success State ──
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} style={{ width: 80, height: 80, borderRadius: '50%', background: '#ECFCCB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle2 size={40} color="#65A30D" />
                </motion.div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#1F2937', marginBottom: '0.5rem' }}>Booking Submitted</h2>
                <p style={{ color: '#6B7280', marginBottom: '1.5rem', lineHeight: 1.6 }}>Your booking is under verification.<br/>Our team will verify your payment and contact you on WhatsApp shortly.</p>
                
                <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#92400E', fontWeight: 500, fontSize: '0.9rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D97706' }} />
                  Status: Pending Verification
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── Customer Info ── */}
          <div style={{ padding: '0 1rem' }}>
            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>Why book with us?</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}><CheckSquare size={16} color="#5B2C83" /> Secure Manual Verification</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}><CheckSquare size={16} color="#5B2C83" /> No Online Payment Gateway Required</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}><CheckSquare size={16} color="#5B2C83" /> Instant WhatsApp Confirmation</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}><CheckSquare size={16} color="#5B2C83" /> Trusted Ganesh Idol Shop</div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================
          BOTTOM SECTION: You May Also Like
          ========================================= */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem', borderTop: '1px solid #E5E7EB' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '2rem', color: '#1F2937', marginBottom: '2rem' }}>You May Also Like</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ background: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <div style={{ height: 220, background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600, color: '#5B2C83' }}>Available</span>
                <img src="/ganesh-hero.png" style={{ height: '80%', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Eco Ganesh G{100+i}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#5B2C83', fontSize: '1.1rem' }}>₹ 1,800</span>
                  <Link to={`/catalog/G${100+i}`} style={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Input({ icon: Icon, placeholder, type = 'text', required = false, onChange }: { icon: any, placeholder: string, type?: string, required?: boolean, onChange?: (val: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <Icon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: focused ? '#5B2C83' : '#9CA3AF', transition: 'color 0.2s' }} />
      <input 
        type={type} placeholder={placeholder} required={required}
        onChange={e => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', background: '#F9FAFB', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#1F2937', transition: 'all 0.2s' }}
        onMouseEnter={e => !focused && (e.currentTarget.style.borderColor = '#D1D5DB')}
        onMouseLeave={e => !focused && (e.currentTarget.style.borderColor = '#E5E7EB')}
        onInput={e => (e.currentTarget.style.borderColor = '#5B2C83')}
      />
    </div>
  );
}
