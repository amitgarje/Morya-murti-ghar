import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  FileText, 
  Share2, 
  Copy, 
  ExternalLink,
  QrCode,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────
   Themes Configuration
───────────────────────────────────────── */
const THEMES = [
  { id: 'purple', name: 'Classic Purple', bg: 'linear-gradient(135deg, #5B2C83, #3E1B5C)', color: 'white', accent: '#D4AF37' },
  { id: 'gold', name: 'Royal Gold', bg: 'linear-gradient(135deg, #D4AF37, #EBD076)', color: '#5B2C83', accent: '#ffffff' },
  { id: 'red', name: 'Traditional Red', bg: 'linear-gradient(135deg, #991B1B, #7F1D1D)', color: '#FEF3C7', accent: '#D4AF37' },
  { id: 'minimal', name: 'Minimal White', bg: '#ffffff', color: '#1F2937', accent: '#5B2C83' },
];

/* ─────────────────────────────────────────
   Studio Page Component
───────────────────────────────────────── */
export function InvitationStudioPage() {
  // Form State
  const [formData, setFormData] = useState({
    familyName: 'Garje Family',
    hostName: 'Rahul Garje',
    mobile: '',
    address: 'Pune, Maharashtra',
    arrivalDate: '2026-09-14',
    duration: '5 Days',
    hasPooja: false,
    poojaDate: '',
    poojaTime: '',
    message: 'आपण सहकुटुंब सहपरिवार\nश्री गणरायाच्या दर्शनासाठी\nआग्रहाचे निमंत्रण.',
    contactNum: '',
    theme: 'purple'
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const activeTheme = THEMES.find(t => t.id === formData.theme) || THEMES[0];

  const handleGenerate = () => {
    setGeneratedId('GRJ2026' + Math.floor(Math.random() * 1000));
    setIsGenerated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '80px', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* ── Page Header ── */}
      <section style={{ padding: '4rem 1.5rem 2rem', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'white', border: '1px solid rgba(91,44,131,0.2)',
            padding: '0.4rem 1.2rem', borderRadius: 9999, marginBottom: '1.5rem',
            boxShadow: '0 4px 12px rgba(91,44,131,0.05)',
          }}>
            <span>✨</span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#5B2C83', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Digital Ganesh Invitation
            </span>
          </div>
          
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', color: '#1F2937', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Create Your Personalized<br/>Ganesh Utsav Invitation
          </h1>
          
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', color: '#6B7280', margin: '0 auto', lineHeight: 1.7, maxWidth: 600 }}>
            Design a beautiful invitation website for your family in just a few minutes and share it instantly with your loved ones.
          </p>
        </motion.div>
      </section>

      {/* ── Main Layout ── */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1rem 1.5rem 4rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', position: 'relative' }}>
        
        {/* =========================================
            LEFT COLUMN (40%) - Form
            ========================================= */}
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {!isGenerated ? (
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ background: 'white', borderRadius: '24px', padding: '2.5rem 2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#1F2937', marginBottom: '2rem' }}>Invitation Details</h2>

              {/* Section 1: Family */}
              <FormSection title="1. Family Details">
                <Input icon={User} placeholder="Family Name (e.g. Garje Family)" value={formData.familyName} onChange={v => setFormData({...formData, familyName: v})} />
                <Input icon={User} placeholder="Host Name" value={formData.hostName} onChange={v => setFormData({...formData, hostName: v})} />
                <Input icon={Phone} placeholder="Mobile Number" value={formData.mobile} onChange={v => setFormData({...formData, mobile: v})} />
                <Input icon={MapPin} placeholder="Address / Location" value={formData.address} onChange={v => setFormData({...formData, address: v})} />
              </FormSection>

              {/* Section 2: Festival */}
              <FormSection title="2. Festival Details">
                <Input icon={Calendar} type="date" placeholder="Arrival Date" value={formData.arrivalDate} onChange={v => setFormData({...formData, arrivalDate: v})} />
                <div style={{ position: 'relative' }}>
                  <Clock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <select 
                    value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', background: '#F9FAFB', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#1F2937', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="1.5 Days">1.5 Days</option>
                    <option value="5 Days">5 Days</option>
                    <option value="7 Days">7 Days</option>
                    <option value="11 Days">11 Days</option>
                  </select>
                </div>
              </FormSection>

              {/* Section 3: Pooja */}
              <FormSection title="3. Satyanarayan Pooja">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '1rem' }}>
                  <input type="checkbox" checked={formData.hasPooja} onChange={e => setFormData({...formData, hasPooja: e.target.checked})} style={{ width: 18, height: 18, accentColor: '#5B2C83' }} />
                  <span style={{ fontSize: '0.95rem', color: '#374151', fontWeight: 500 }}>Organizing Satyanarayan Pooja?</span>
                </label>
                {formData.hasPooja && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input icon={Calendar} type="date" placeholder="Pooja Date" value={formData.poojaDate} onChange={v => setFormData({...formData, poojaDate: v})} />
                    <Input icon={Clock} type="time" placeholder="Pooja Time" value={formData.poojaTime} onChange={v => setFormData({...formData, poojaTime: v})} />
                  </motion.div>
                )}
              </FormSection>

              {/* Section 4: Message */}
              <FormSection title="4. Invitation Message">
                <div style={{ position: 'relative' }}>
                  <FileText size={16} style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#9CA3AF' }} />
                  <textarea 
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', background: '#F9FAFB', fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '0.95rem', color: '#1F2937', minHeight: 120, resize: 'vertical' }}
                  />
                </div>
              </FormSection>

              {/* Section 5: Theme */}
              <FormSection title="5. Theme Selection">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {THEMES.map(theme => (
                    <div 
                      key={theme.id}
                      onClick={() => setFormData({...formData, theme: theme.id})}
                      style={{
                        padding: '1rem', borderRadius: '12px', cursor: 'pointer',
                        background: theme.bg, color: theme.color,
                        border: formData.theme === theme.id ? `3px solid ${theme.accent}` : '3px solid transparent',
                        boxShadow: formData.theme === theme.id ? '0 4px 15px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.2s', textAlign: 'center'
                      }}
                    >
                      <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>{theme.name}</span>
                    </div>
                  ))}
                </div>
              </FormSection>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <motion.button 
                  onClick={handleGenerate}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{ flex: 1, background: '#5B2C83', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Wand2 size={18} /> Generate Invitation
                </motion.button>
              </div>

            </motion.div>
          ) : (
            // Success Card
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              style={{ background: 'white', borderRadius: '24px', padding: '3rem 2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} style={{ width: 80, height: 80, borderRadius: '50%', background: '#ECFCCB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CheckCircle2 size={40} color="#65A30D" />
              </motion.div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#1F2937', marginBottom: '0.5rem' }}>Your Invitation is Ready!</h2>
              <p style={{ color: '#6B7280', marginBottom: '2rem', lineHeight: 1.6 }}>Share this beautiful digital invitation with your loved ones.</p>

              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', color: '#4B5563', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://moryamurtighar.in/invitation/view/{generatedId}</span>
                <button style={{ background: 'white', border: '1px solid #D1D5DB', borderRadius: '8px', padding: '0.4rem 0.6rem', color: '#4B5563', cursor: 'pointer' }}><Copy size={14}/></button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ width: 140, height: 140, background: 'white', border: '2px solid #E5E7EB', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                  <QrCode size={100} color="#374151" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ background: '#25D366', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Share2 size={18} /> Share on WhatsApp
                </motion.button>
                <Link to={`/invitation/view/${generatedId}`} target="_blank" style={{ textDecoration: 'none' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ width: '100%', background: 'white', color: '#5B2C83', padding: '1rem', borderRadius: '12px', border: '2px solid #5B2C83', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <ExternalLink size={18} /> Open Invitation
                  </motion.button>
                </Link>
                <button onClick={() => setIsGenerated(false)} style={{ background: 'none', border: 'none', color: '#9CA3AF', marginTop: '1rem', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>Create another one</button>
              </div>
            </motion.div>
          )}

        </div>

        {/* =========================================
            RIGHT COLUMN (60%) - Live Preview
            ========================================= */}
        <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'sticky', top: '100px', height: 'calc(100vh - 120px)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              width: '380px', height: '760px',
              background: 'white',
              borderRadius: '40px',
              border: '12px solid #1F2937',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* The Live Mobile Preview */}
            <div style={{ 
              width: '100%', height: '100%', 
              background: activeTheme.bg, color: activeTheme.color,
              transition: 'all 0.5s ease',
              padding: '2rem 1.5rem',
              overflowY: 'auto',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}>
              
              {/* Decorative Header */}
              <div style={{ fontSize: '3rem', margin: '1rem 0 0.5rem', opacity: 0.9 }}>🪔</div>
              <div style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '1.2rem', color: activeTheme.accent, marginBottom: '2rem' }}>
                || श्री गणेशाय नमः ||
              </div>

              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '2rem', marginBottom: '0.2rem', lineHeight: 1.1 }}>
                {formData.familyName || 'Your Family Name'}
              </h2>
              <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '2rem' }}>invites you to seek the blessings of Lord Ganesha</p>

              {/* Decorative Border Box */}
              <div style={{ border: `1px solid ${activeTheme.accent}`, padding: '1.5rem', borderRadius: '16px', width: '100%', marginBottom: '2rem', background: formData.theme === 'minimal' ? '#F9FAFB' : 'rgba(0,0,0,0.1)' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Arrival Date</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem' }}>{formData.arrivalDate || '14th September 2026'}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Festival Duration</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem' }}>{formData.duration}</div>
                </div>
                {formData.hasPooja && (
                  <div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Satyanarayan Pooja</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem' }}>{formData.poojaDate || 'Date'} at {formData.poojaTime || 'Time'}</div>
                  </div>
                )}
              </div>

              {/* Marathi Text */}
              <div style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', whiteSpace: 'pre-line' }}>
                {formData.message}
              </div>

              {/* Footer */}
              <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: `1px dashed ${activeTheme.accent}` }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.5rem' }}>Venue</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '0.9rem', marginBottom: '1rem' }}>{formData.address || 'Your Address'}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.5rem' }}>Warm Regards</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem' }}>{formData.hostName || 'Host Name'}</div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

function FormSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#374151', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {children}
      </div>
    </div>
  );
}

function Input({ icon: Icon, placeholder, type = 'text', value, onChange }: { icon: any, placeholder: string, type?: string, value?: string, onChange?: (val: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <Icon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: focused ? '#5B2C83' : '#9CA3AF', transition: 'color 0.2s' }} />
      <input 
        type={type} placeholder={placeholder} value={value}
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
