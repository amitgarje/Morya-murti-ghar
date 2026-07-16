import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, ShieldCheck, Heart, Star, 
  MapPin, Phone, MessageCircle, 
  ChevronLeft, ChevronRight, Wand2
} from 'lucide-react';

export function AboutPage() {
  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '80px', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* =========================================
          SECTION 1 : ABOUT US
          ========================================= */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ flex: '1 1 500px', position: 'relative' }}
        >
          <div style={{ width: '100%', paddingBottom: '100%', borderRadius: '24px', background: 'linear-gradient(145deg, #F9FAFB, #F3F4F6)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
            <img src="/ganesh-hero.png" alt="Morya Murti Ghar Showroom" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '2rem' }} />
          </div>
          {/* Decorative Badge */}
          <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(91,44,131,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309', fontWeight: 'bold', fontSize: '1.5rem' }}>10+</div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#1F2937' }}>Years of</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Trust & Devotion</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ flex: '1 1 500px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#F9FAFB', border: '1px solid #E5E7EB', padding: '0.4rem 1.2rem', borderRadius: 9999, marginBottom: '1.5rem' }}>
            <span>🏵️</span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#5B2C83', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About Us</span>
          </div>

          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#1F2937', marginBottom: '0.5rem', lineHeight: 1.1 }}>Morya Murti Ghar</h2>
          <h3 style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '1.25rem', color: '#D4AF37', marginBottom: '1.5rem' }}>"घरामध्ये बाप्पा, आनंदाची खजिना!"</h3>

          <p style={{ color: '#6B7280', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '2rem' }}>
            Morya Murti Ghar is a trusted Ganesh idol showroom dedicated to providing beautifully handcrafted Ganesh idols with devotion, quality, and traditional craftsmanship. Every idol is carefully selected to bring joy and blessings to every home during Ganesh Utsav.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: Heart, title: 'Premium Handcrafted Idols', color: '#EF4444' },
              { icon: ShieldCheck, title: 'Trusted Local Shop', color: '#5B2C83' },
              { icon: CheckCircle2, title: 'QR Based Easy Booking', color: '#25D366' },
              { icon: Star, title: 'Customer Satisfaction', color: '#D4AF37' },
            ].map((feature, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', cursor: 'default' }}>
                <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${feature.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: feature.color }}>
                  <feature.icon size={20} />
                </div>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#374151', lineHeight: 1.3 }}>{feature.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* =========================================
          SECTION 2 : WHY CHOOSE US
          ========================================= */}
      <section style={{ background: '#F9FAFB', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#1F2937', marginBottom: '1rem' }}>Why Families Choose Morya Murti Ghar</h2>
            <p style={{ color: '#6B7280', maxWidth: 600, margin: '0 auto' }}>We strive to make your Ganesh Utsav celebrations memorable by offering the best idols and a hassle-free booking experience.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: ShieldCheck, title: 'Premium Quality', desc: 'Every idol is handcrafted with attention to detail.' },
              { icon: CheckCircle2, title: 'Easy Booking', desc: 'Reserve your idol online in a few simple steps.' },
              { icon: Heart, title: 'Trusted Shop', desc: 'Serving families with devotion and honesty.' },
              { icon: ShieldCheck, title: 'Secure Verification', desc: 'Manual payment verification ensures booking accuracy.' },
              { icon: Wand2, title: 'Digital Invitation', desc: 'Create and share a personalized invitation website.' },
              { icon: MessageCircle, title: 'Festival Support', desc: 'Quick WhatsApp assistance for booking-related queries.' },
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(91,44,131,0.08)' }}
                style={{ background: 'white', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.3s ease' }}
              >
                <div style={{ width: 56, height: 56, borderRadius: '16px', background: '#F3F4F6', color: '#5B2C83', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <card.icon size={28} />
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#1F2937' }}>{card.title}</h3>
                <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3 : CUSTOMER REVIEWS
          ========================================= */}
      <ReviewSlider />

      {/* =========================================
          SECTION 4 : VISIT OUR SHOWROOM
          ========================================= */}
      <section style={{ maxWidth: 1280, margin: '6rem auto', padding: '0 1.5rem' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#1F2937', textAlign: 'center', marginBottom: '4rem' }}>Visit Our Showroom</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', background: 'white', borderRadius: '32px', padding: '1rem', border: '1px solid #E5E7EB', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)' }}>
          
          {/* Map (Placeholder) */}
          <div style={{ flex: '1 1 400px', minHeight: 400, background: '#F3F4F6', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: '#9CA3AF' }}>
              <MapPin size={48} />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>Google Map Placeholder</span>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ flex: '1 1 400px', padding: '2rem 2rem 2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Address */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1F2937', marginBottom: '0.5rem' }}>Address</h4>
                <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '0.95rem' }}>Shop No. 2, Trishul Apartment,<br/>Behind Nitinraj Hotel, Katemanivali,<br/>Kalyan (East)</p>
              </div>
            </div>

            {/* Persons */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#E0E7FF', color: '#4338CA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1F2937', marginBottom: '0.5rem' }}>Contact Persons</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#4B5563', fontSize: '0.95rem' }}>Kunal Yerunkar</span>
                    <span style={{ color: '#1F2937', fontWeight: 500, fontSize: '0.95rem' }}>+91 9324193646</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#4B5563', fontSize: '0.95rem' }}>Sujal Kadam</span>
                    <span style={{ color: '#1F2937', fontWeight: 500, fontSize: '0.95rem' }}>+91 8850316730</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#4B5563', fontSize: '0.95rem' }}>Aditya Gunde</span>
                    <span style={{ color: '#1F2937', fontWeight: 500, fontSize: '0.95rem' }}>+91 7045777335</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials & Hours */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1F2937', marginBottom: '0.5rem' }}>Instagram</h4>
                <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>@moryamurtighar_30</p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1F2937', marginBottom: '0.5rem' }}>Opening Hours</h4>
                <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Mon-Sun: 9:00 AM – 9:00 PM</p>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 'auto' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1, background: '#5B2C83', color: 'white', padding: '0.8rem', borderRadius: '12px', border: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <MapPin size={18} /> Get Directions
              </motion.button>
              <motion.a href="tel:+919324193646" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1, background: 'white', color: '#1F2937', padding: '0.8rem', borderRadius: '12px', border: '1px solid #E5E7EB', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <Phone size={18} /> Call Now
              </motion.a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5 : FINAL CTA
          ========================================= */}
      <section style={{ maxWidth: 1280, margin: '6rem auto 4rem', padding: '0 1.5rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg, #5B2C83, #3E1B5C)', borderRadius: '32px', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(91,44,131,0.25)' }}
        >
          {/* Background Elements */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20rem', opacity: 0.03, pointerEvents: 'none' }}>🪔</div>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
          
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
            Bring Bappa Home with Devotion
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', margin: '0 auto 2.5rem', maxWidth: '600px', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
            Reserve your preferred Ganesh idol today and celebrate this Ganesh Utsav with happiness and peace.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <Link to="/catalog" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'white', color: '#5B2C83', border: 'none', borderRadius: 9999, padding: '1rem 2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
                Explore Collection
              </motion.button>
            </Link>
            <motion.a href="https://wa.me/919324193646" target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 9999, padding: '1rem 2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer', transition: 'border-color 0.2s', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'white'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'}>
              <MessageCircle size={20} /> Contact on WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

const REVIEWS = [
  { name: 'Ramesh Desai', rating: 5, text: 'Absolutely beautiful Ganesh idols! We have been booking our Bappa from here for the last 3 years. The quality is unmatched and the service is great.' },
  { name: 'Sneha Patil', rating: 5, text: 'Very seamless booking experience and the owner is very polite. The idol was exactly as shown in the pictures. Highly recommended.' },
  { name: 'Karan Sharma', rating: 5, text: 'The eco-friendly murti collection is fantastic. Morya Murti Ghar has earned my trust for all future Ganesh festivals.' },
];

function ReviewSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % REVIEWS.length);
  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section style={{ padding: '6rem 1.5rem', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,44,131,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#1F2937', textAlign: 'center', marginBottom: '3rem' }}>What Our Customers Say</h2>
      
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}
            style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', textAlign: 'center' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem', color: '#D4AF37', marginBottom: '1.5rem' }}>
              {[1,2,3,4,5].map(star => <Star key={star} size={24} fill="#D4AF37" />)}
            </div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.25rem', color: '#374151', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '2rem' }}>
              "{REVIEWS[index].text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 600, color: '#9CA3AF' }}>
                {REVIEWS[index].name.charAt(0)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#1F2937' }}>{REVIEWS[index].name}</div>
                <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Verified Customer</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4B5563', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}><ChevronLeft size={20}/></button>
          <button onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4B5563', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}><ChevronRight size={20}/></button>
        </div>
      </div>
    </section>
  );
}
