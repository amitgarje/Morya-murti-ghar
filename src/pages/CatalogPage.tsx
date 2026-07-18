import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  RotateCcw, 
  ChevronDown
} from 'lucide-react';
import { useIdols } from '@/context/IdolContext';

/* ─────────────────────────────────────────
   Helper: convert Idol (from context) to card-display shape
───────────────────────────────────────── */
function heightLabel(cm: number): string {
  if (cm <= 12) return '1 Ft';
  if (cm <= 18) return '1.5 Ft';
  if (cm <= 24) return '2 Ft';
  if (cm <= 36) return '3 Ft';
  if (cm <= 48) return '4 Ft';
  return '5 Ft+';
}

const HEIGHTS = ['All', '1 Ft', '1.5 Ft', '2 Ft', '3 Ft', '4 Ft', '5 Ft+'];
const MATERIALS = ['All', 'Shadu Mati', 'Plaster of Paris', 'Fiber', 'Eco-Friendly', 'Marble'];
const AVAILABILITIES = ['All', 'Available', 'Sold Out'];

/* ─────────────────────────────────────────
   Animation Variants
───────────────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }
};

/* ─────────────────────────────────────────
   Catalog Page Component
───────────────────────────────────────── */
export function CatalogPage() {
  const { idols: rawIdols, resolvedImages } = useIdols();
  const [searchTerm, setSearchTerm] = useState('');
  const [heightFilter, setHeightFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky filter bar shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resetFilters = () => {
    setSearchTerm('');
    setHeightFilter('All');
    setMaterialFilter('All');
    setAvailabilityFilter('All');
  };

  // Map Idol context data to display-friendly shape
  const ALL_IDOLS = rawIdols.map(idol => ({
    id: idol.id,
    name: idol.name,
    height: heightLabel(idol.heightCm),
    material: idol.material,
    status: idol.status === 'available' ? 'Available' : 'Sold Out',
    label: ['Premium', 'Luxury'].includes(idol.category) ? 'Premium' : 'Eco Friendly',
    image: resolvedImages[idol.id] || idol.images?.[0] || '/ganesh-hero.png',
  }));

  // Filter Logic
  let filteredIdols = ALL_IDOLS.filter(idol => {
    if (searchTerm && !idol.name.toLowerCase().includes(searchTerm.toLowerCase()) && !idol.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (heightFilter !== 'All' && idol.height !== heightFilter) return false;
    if (materialFilter !== 'All' && idol.material !== materialFilter) return false;
    if (availabilityFilter !== 'All' && idol.status !== availabilityFilter) return false;
    return true;
  });

  // Sort so that Sold Out idols appear at the end
  filteredIdols.sort((a, b) => {
    if (a.status === 'Available' && b.status === 'Sold Out') return -1;
    if (a.status === 'Sold Out' && b.status === 'Available') return 1;
    return 0;
  });

  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '80px', paddingBottom: '4rem' }}>
      
      {/* =========================================
          SECTION HEADER
          ========================================= */}
      <section style={{ padding: '4rem 1.5rem', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(212,175,55,0.35)',
            padding: '0.4rem 1.2rem', borderRadius: 9999, marginBottom: '1.5rem',
            boxShadow: '0 4px 16px rgba(212,175,55,0.1), 0 1px 4px rgba(0,0,0,0.04)',
            backdropFilter: 'blur(8px)',
          }}>
            <span>🛕</span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Premium Ganesh Collection
            </span>
          </div>
          
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#1F2937', marginBottom: '1.25rem', lineHeight: 1.1 }}>
            Choose Your Bappa
          </h1>
          
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', color: '#6B7280', margin: '0 auto', lineHeight: 1.7 }}>
            Browse our handcrafted Ganesh idols and contact us to reserve your favorite one.
          </p>
        </motion.div>
      </section>

      {/* =========================================
          FILTER SECTION (Sticky)
          ========================================= */}
      <div style={{
        position: 'sticky', top: '72px', zIndex: 50,
        padding: '1rem 1.5rem', transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(252, 252, 252, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.03)' : 'none',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          background: 'white', borderRadius: '20px',
          padding: '1rem',
          display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)',
        }}>
          {/* Search */}
          <div style={{ flex: '1 1 200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input 
              type="text" placeholder="Search Ganesh Idol..." 
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: '12px', border: '1px solid #E5E7EB',
                fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', outline: 'none',
                background: '#F9FAFB', transition: 'border 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#5B2C83'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Dropdowns */}
          <FilterSelect label="Height" value={heightFilter} options={HEIGHTS} onChange={setHeightFilter} />
          <FilterSelect label="Material" value={materialFilter} options={MATERIALS} onChange={setMaterialFilter} />
          <FilterSelect label="Status" value={availabilityFilter} options={AVAILABILITIES} onChange={setAvailabilityFilter} />

          {/* Reset Button */}
          <button 
            onClick={resetFilters}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.25rem', borderRadius: '12px',
              border: '1px solid #E5E7EB', background: 'white',
              color: '#6B7280', fontFamily: 'Outfit, sans-serif', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#1F2937'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#6B7280'; }}
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* =========================================
          COLLECTION GRID
          ========================================= */}
      <div style={{ maxWidth: 1280, margin: '3rem auto', padding: '0 1.5rem' }}>
        <AnimatePresence mode="popLayout">
          {filteredIdols.length > 0 ? (
            <motion.div 
              variants={staggerContainer} initial="hidden" animate="show"
              className="idol-grid"
            >
              {filteredIdols.map((idol) => (
                <IdolCard key={idol.id} idol={idol} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '4rem 0', color: '#6B7280', fontFamily: 'Poppins, sans-serif' }}
            >
              <Search size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1F2937', marginBottom: '0.5rem' }}>No idols found</h3>
              <p>Try adjusting your filters or search term.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================
          BOTTOM CTA
          ========================================= */}
      <div style={{ maxWidth: 1280, margin: '4rem auto 0', padding: '0 1.5rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, #3E1B5C 0%, #5B2C83 100%)',
            borderRadius: '24px', padding: '4rem 2rem', textAlign: 'center',
            boxShadow: '0 20px 40px rgba(91,44,131,0.2)', position: 'relative', overflow: 'hidden'
          }}
        >
          {/* Background glow */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% -20%, rgba(212,175,55,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'white', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
            Didn't Find Your Preferred Ganpati?
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', margin: '0 auto 2.5rem', maxWidth: '600px', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
            Visit our showroom to explore many more exclusive handcrafted Ganesh idols.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{
              background: 'white', color: '#5B2C83', border: 'none', borderRadius: 9999,
              padding: '0.875rem 2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <MapPin size={18} /> Visit Showroom
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{
              background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 9999,
              padding: '0.875rem 2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem',
              cursor: 'pointer', transition: 'border-color 0.2s'
            }} onMouseEnter={e => e.currentTarget.style.borderColor = 'white'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'}>
              Contact on WhatsApp
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
        .idol-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        @media (max-width: 1024px) {
          .idol-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        }
        @media (max-width: 640px) {
          .idol-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   Sub-Components
───────────────────────────────────────── */

function FilterSelect({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) {
  return (
    <div style={{ position: 'relative', flex: '1 1 120px' }}>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '0.75rem 2rem 0.75rem 1rem',
          borderRadius: '12px', border: '1px solid #E5E7EB',
          fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', outline: 'none',
          background: '#F9FAFB', cursor: 'pointer', appearance: 'none',
          color: value === 'All' || value === 'Default' ? '#6B7280' : '#1F2937',
          fontWeight: value === 'All' || value === 'Default' ? 400 : 500,
        }}
      >
        <option value={options[0]} disabled style={{ display: 'none' }}>{label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={14} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
    </div>
  );
}

function IdolCard({ idol }: { idol: any }) {
  const isSoldOut = idol.status === 'Sold Out';

  return (
    <motion.div 
      variants={cardVariant}
      whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(91,44,131,0.13), 0 8px 16px rgba(0,0,0,0.04)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'white', borderRadius: '20px', overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        display: 'flex', flexDirection: 'column', position: 'relative',
      }}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', height: '280px', background: 'linear-gradient(145deg, #FAF9FF, #F5F3FF)', overflow: 'hidden' }}>
        
        {/* Label Badge */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
          <span style={{
            background: idol.label === 'Premium'
              ? 'linear-gradient(135deg, #D4AF37, #C49D25)'
              : 'linear-gradient(135deg, #22C55E, #16A34A)',
            color: 'white',
            padding: '0.3rem 0.85rem', borderRadius: 9999,
            fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.72rem',
            boxShadow: idol.label === 'Premium' ? '0 4px 12px rgba(212,175,55,0.35)' : '0 4px 12px rgba(34,197,94,0.3)',
            letterSpacing: '0.03em', textTransform: 'uppercase',
          }}>
            {idol.label}
          </span>
        </div>

        {/* Status Badge */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
          <span style={{
            background: isSoldOut ? 'rgba(239,68,68,0.9)' : 'rgba(255,255,255,0.92)',
            color: isSoldOut ? 'white' : '#5B2C83',
            padding: '0.3rem 0.85rem', borderRadius: 9999,
            fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.72rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: isSoldOut ? 'none' : '1px solid rgba(91,44,131,0.15)',
            backdropFilter: 'blur(8px)', letterSpacing: '0.03em',
          }}>
            {idol.status}
          </span>
        </div>

        {/* Image with smooth zoom */}
        <motion.div
          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={idol.image || '/ganesh-hero.png'}
            alt={idol.name}
            loading="lazy"
            style={{ width: '75%', height: '75%', objectFit: 'contain',
              filter: isSoldOut
                ? 'grayscale(100%) opacity(0.6)'
                : 'drop-shadow(0 15px 30px rgba(91,44,131,0.18)) drop-shadow(0 5px 10px rgba(212,175,55,0.12))'
            }}
          />
        </motion.div>

        {/* Booked Overlay */}
        {isSoldOut && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
            <div style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', padding: '0.5rem 2rem', transform: 'rotate(-8deg)', borderRadius: '10px', boxShadow: '0 8px 20px rgba(239,68,68,0.35)', letterSpacing: '0.1em' }}>
              SOLD OUT
            </div>
          </div>
        )}
      </div>

      {/* Info Container */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0' }}>
        
        {/* Name & ID */}
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1F2937', margin: '0 0 0.3rem', lineHeight: 1.3 }}>
          {idol.name}
        </h3>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#9CA3AF', margin: '0 0 1.1rem', letterSpacing: '0.02em' }}>
          #{idol.id}
        </p>

        {/* Specs Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#F5F3FF', color: '#5B2C83', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500 }}>
            📏 {idol.height}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#FEFCE8', color: '#92400E', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500 }}>
            🏺 {idol.material}
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
          <Link to={`/catalog/${idol.id}`} style={{ textDecoration: 'none' }}>
            <motion.button 
              disabled={isSoldOut}
              whileHover={!isSoldOut ? { scale: 1.02, boxShadow: '0 6px 20px rgba(91,44,131,0.35)' } : {}}
              whileTap={!isSoldOut ? { scale: 0.98 } : {}}
              style={{
                width: '100%',
                background: isSoldOut ? '#F3F4F6' : 'linear-gradient(135deg, #5B2C83, #7E4BAA)',
                color: isSoldOut ? '#9CA3AF' : 'white', border: 'none', borderRadius: '12px',
                padding: '0.8rem 1rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.95rem',
                cursor: isSoldOut ? 'not-allowed' : 'pointer',
                boxShadow: isSoldOut ? 'none' : '0 4px 14px rgba(91,44,131,0.25)',
                letterSpacing: '0.01em',
              }}
            >
              {isSoldOut ? 'Sold Out' : 'Contact Us'}
            </motion.button>
          </Link>
          
          <Link to={`/catalog/${idol.id}`} style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, borderColor: '#5B2C83', background: '#F5F3FF' }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'white', color: '#5B2C83', border: '1.5px solid rgba(91,44,131,0.25)', borderRadius: '12px',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              aria-label="View Details"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </motion.button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
