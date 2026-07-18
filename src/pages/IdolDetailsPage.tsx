import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Heart, Share2, CheckCircle2, ShieldCheck, 
  Store, Camera, PhoneCall, MapPin, 
  CheckSquare
} from 'lucide-react';
import { useIdols } from '@/context/IdolContext';

/* ─────────────────────────────────────────
   Contact numbers
───────────────────────────────────────── */
const CONTACTS = [
  { name: 'Kunal Yerunkar', phone: '+919324193646' },
  { name: 'Sujal Kadam', phone: '+918850316730' },
  { name: 'Aditya Gunde', phone: '+917045777335' },
];

/* ─────────────────────────────────────────
   Component: Idol Details Page
───────────────────────────────────────── */
export function IdolDetailsPage() {
  const { id } = useParams();
  const { idols } = useIdols();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find the idol from context by id, fallback to first if not found
  const contextIdol = idols.find(i => i.id === id);

  // If not found, show a message
  if (!contextIdol) {
    return (
      <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', fontFamily: 'Poppins, sans-serif' }}>
        <div style={{ fontSize: '4rem' }}>🛕</div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#1F2937' }}>Idol Not Found</h2>
        <p style={{ color: '#6B7280' }}>The idol you are looking for does not exist.</p>
        <Link to="/catalog" style={{ color: '#5B2C83', fontWeight: 600, textDecoration: 'none' }}>← Back to Catalog</Link>
      </div>
    );
  }

  // Build display values from context idol
  const idol = {
    id: contextIdol.id,
    name: contextIdol.name,
    description: contextIdol.description,
    status: contextIdol.status === 'available' ? 'Available' : 'Sold Out',
    label: ['Premium', 'Luxury'].includes(contextIdol.category) ? 'Premium Collection' : 'Eco Friendly Collection',
    images: contextIdol.images?.length ? contextIdol.images : ['/ganesh-hero.png'],
    specs: {
      'Height': `${contextIdol.heightCm} cm`,
      'Material': contextIdol.material,
      'Category': contextIdol.category,
    }
  };

  const isSoldOut = idol.status === 'Sold Out';

  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '80px', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem 1rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#6B7280' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#6B7280' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/catalog" style={{ textDecoration: 'none', color: '#6B7280' }}>Collection</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#5B2C83', fontWeight: 500 }}>{idol.name}</span>
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
                src={idol.images[activeImage]}
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
            {idol.images.map((img, i) => (
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
            RIGHT COLUMN (40%) - Info & Contact
            ========================================= */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* ── Product Info ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEF3C7', color: '#B45309', padding: '0.3rem 0.8rem', borderRadius: 9999, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.75rem' }}>
                🌟 {idol.label}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'white', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', cursor: 'pointer' }}><Share2 size={16} /></button>
                <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'white', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', cursor: 'pointer' }}><Heart size={16} /></button>
              </div>
            </div>

            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#1F2937', marginBottom: '0.5rem', lineHeight: 1.1 }}>
              {idol.name}
            </h1>
            
            <p style={{ color: '#6B7280', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              "{idol.description}"
            </p>

            {/* Status Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ 
                background: isSoldOut ? '#FEE2E2' : '#ECFCCB', 
                color: isSoldOut ? '#991B1B' : '#4D7C0F', 
                padding: '0.4rem 1.2rem', 
                borderRadius: 9999, 
                fontFamily: 'Outfit, sans-serif', 
                fontWeight: 600, 
                fontSize: '0.9rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem' 
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: isSoldOut ? '#DC2626' : '#65A30D' }} />
                {idol.status}
              </span>
            </div>

            {/* Specs Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
              {Object.entries(idol.specs).map(([key, value]) => (
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

          {/* ── Contact Section ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}
          >
            {/* Top decorative line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #5B2C83, #D4AF37)' }} />

            <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(91,44,131,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <PhoneCall size={24} color="#5B2C83" />
              </div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.35rem', color: '#1F2937', marginBottom: '0.5rem' }}>
                {isSoldOut ? 'Inquire About Similar Idols' : 'Contact Us to Book'}
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                {isSoldOut 
                  ? "This idol is currently sold out. However, you can call us to check for similar models or custom orders."
                  : "We do not take online payments. Please call our team directly to book this beautiful Ganpati idol."}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {CONTACTS.map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.phone}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#F9FAFB', padding: '1rem 1.25rem', borderRadius: '16px',
                    textDecoration: 'none', color: 'inherit', border: '1px solid #E5E7EB',
                    transition: 'all 0.2s', cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#5B2C83';
                    e.currentTarget.style.background = '#F5F3FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = '#F9FAFB';
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#1F2937', fontSize: '1.05rem' }}>{contact.name}</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', color: '#6B7280', fontSize: '0.85rem' }}>{contact.phone}</div>
                  </div>
                  <div style={{ background: '#5B2C83', color: 'white', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(91,44,131,0.3)' }}>
                    <PhoneCall size={18} />
                  </div>
                </a>
              ))}
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: '#D4AF37', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>
              <MapPin size={16} /> Visit our showroom for more!
            </div>
          </motion.div>

          {/* ── Customer Info ── */}
          <div style={{ padding: '0 1rem' }}>
            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>Why choose us?</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}><CheckSquare size={16} color="#5B2C83" /> Authentic Craftsmanship</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}><CheckSquare size={16} color="#5B2C83" /> Direct Communication with Creators</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}><CheckSquare size={16} color="#5B2C83" /> Personalised Service</div>
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
                  <span style={{ fontWeight: 600, color: '#9CA3AF', fontSize: '0.9rem' }}>Shadu Mati</span>
                  <Link to={`/catalog/G${100+i}`} style={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
