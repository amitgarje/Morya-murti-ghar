import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Mail, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #3E1B5C 0%, #5B2C83 100%)', color: 'white', paddingTop: '4rem', fontFamily: 'Poppins, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Top accent glow */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
      {/* Background texture */}
      <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        {/* Column 1: Brand */}
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: '#D4AF37', marginBottom: '0.5rem' }}>
            Morya Murti Ghar
          </h2>
          <p style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '1rem', color: '#E9D5FF', marginBottom: '1rem' }}>
            "घरामध्ये बाप्पा, आनंदाची खजिना!"
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            A trusted Ganesh idol showroom dedicated to providing beautifully handcrafted idols with devotion and traditional craftsmanship.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Quick Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[  { name: 'Home', path: '/' },
              { name: 'Collection', path: '/catalog' },
              { name: 'Invitation Studio', path: '/invitation' },
              { name: 'About & Contact', path: '/about' },
          ].map(link => (
            <Link key={link.name} to={link.path}
              style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.paddingLeft = '4px'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.paddingLeft = '0'; }}
            >
              <ChevronRight size={14} style={{ opacity: 0.5 }} /> {link.name}
            </Link>
          ))}
          </div>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <MapPin size={18} style={{ color: '#D4AF37', flexShrink: 0, marginTop: '2px' }} />
              <span>Shop No. 2, Trishul Apartment, Behind Nitinraj Hotel, Katemanivali, Kalyan (East)</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Phone size={18} style={{ color: '#D4AF37', flexShrink: 0 }} />
              <span>+91 93241 93646</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ color: '#D4AF37', flexShrink: 0, fontWeight: 'bold' }}>IG</span>
              <span>@moryamurtighar_30</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <ClockIcon />
              <span>Mon-Sun: 9:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>

        {/* Column 4: Need Help */}
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Need Help?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="https://wa.me/919324193646" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1rem', borderRadius: '12px', color: 'white', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.borderColor = '#25D366'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}>
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            <a href="tel:+919324193646" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1rem', borderRadius: '12px', color: 'white', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#5B2C83'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}>
              <Phone size={18} /> Call Us
            </a>
            <a href="mailto:contact@moryamurtighar.in" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '0.5rem 0' }}>
              <Mail size={18} /> contact@moryamurtighar.in
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <p style={{ marginBottom: '0.5rem' }}>© 2026 Morya Murti Ghar. All Rights Reserved.</p>
        <p>Designed with ❤️ for Ganesh Utsav.</p>
      </div>
    </footer>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}
