import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const idols = [
  { name: 'Siddhivinayak', height: '2 feet', material: 'Premium POP', tag: 'Bestseller', color: '#5B2C83', image: '/idol-siddhivinayak.png' },
  { name: 'Panchamukhi', height: '3 feet', material: 'Natural Clay', tag: 'Eco-Friendly', color: '#22C55E', image: '/idol-panchamukhi.png' },
  { name: 'Swarnamukhi', height: '1.5 feet', material: 'Gold-Painted POP', tag: 'Premium', color: '#D4AF37', image: '/idol-golden.png' },
  { name: 'Mahaganesha', height: '4 feet', material: 'Fiber Glass', tag: 'Exclusive', color: '#EF4444', image: '/idol-mahaganesha.png' },
  { name: 'Bal Ganesh', height: '1 foot', material: 'Natural Clay', tag: 'Popular', color: '#5B2C83', image: '/idol-bal.png' },
  { name: 'Shahi Ganesh', height: '3.5 feet', material: 'Premium POP', tag: 'New', color: '#D4AF37', image: '/idol-golden.png' },
];

export function CatalogPreviewSection() {
  return (
    <section style={{ background: '#F9F7FC', padding: '6rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <div>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.8rem',
              color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem',
            }}>Our Collection</span>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#1F2937' }}>
              Featured Idols
            </h2>
          </div>
          <a href="/catalog" style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#5B2C83',
            textDecoration: 'none', fontSize: '0.95rem',
          }}>
            View All <ArrowRight size={16} />
          </a>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {idols.map((idol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -10, boxShadow: '0 20px 50px rgba(91,44,131,0.12)' }}
              style={{
                background: 'white', borderRadius: '1.25rem', overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease', cursor: 'pointer',
              }}
            >
              {/* Image Area */}
              <div style={{
                height: 240, position: 'relative',
                background: `linear-gradient(135deg, ${idol.color}15, ${idol.color}08)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  background: idol.color, color: 'white',
                  padding: '0.25rem 0.75rem', borderRadius: 9999,
                  fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.75rem',
                  zIndex: 10
                }}>
                  {idol.tag}
                </div>
                {/* Image */}
                <img src={idol.image} alt={idol.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Info */}
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1F2937', marginBottom: '0.5rem' }}>
                  {idol.name}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>📏 {idol.height}</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>🏺 {idol.material}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <a href="/catalog" style={{
                    background: '#5B2C83', color: 'white', border: 'none', borderRadius: 9999,
                    padding: '0.5rem 1.25rem', cursor: 'pointer',
                    fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '0.875rem',
                    transition: 'all 0.2s', textDecoration: 'none'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#3E1B5C'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#5B2C83'; }}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
