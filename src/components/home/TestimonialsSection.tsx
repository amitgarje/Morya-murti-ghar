import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Kulkarni',
    location: 'Pune',
    text: 'Absolutely stunning idol! The craftsmanship is extraordinary and the delivery was well before Chaturthi. Morya Murti Ghar is our family\'s go-to every year.',
    rating: 5,
    avatar: 'PK',
  },
  {
    name: 'Rahul Desai',
    location: 'Mumbai',
    text: 'The online booking experience is so smooth and premium. The 3-foot Panchamukhi idol we ordered was beyond our expectations in quality.',
    rating: 5,
    avatar: 'RD',
  },
  {
    name: 'Sunita Joshi',
    location: 'Nashik',
    text: 'We\'ve been ordering from Morya Murti Ghar for 5 years. The consistency in quality and service is unmatched. Ganpati Bappa Morya!',
    rating: 5,
    avatar: 'SJ',
  },
];

export function TestimonialsSection() {
  return (
    <section style={{ background: '#FCFCFC', padding: '6rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.8rem',
            color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem',
          }}>Testimonials</span>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#1F2937' }}>
            Families That Trust Us
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                background: 'white', borderRadius: '1.25rem', padding: '2rem',
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} style={{ color: '#D4AF37', fontSize: '1rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', color: '#374151',
                lineHeight: 1.75, marginBottom: '1.5rem', fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #5B2C83, #7E4BAA)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.875rem',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#1F2937', fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9CA3AF' }}>{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
