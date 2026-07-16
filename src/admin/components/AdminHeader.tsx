import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Sun, Moon, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/idols': 'Manage Idols',
  '/admin/bookings': 'Bookings',
  '/admin/offline-bookings': 'Offline Bookings',
  '/admin/customers': 'Customers',
  '/admin/invitation': 'Invitation Studio',
  '/admin/settings': 'Settings',
};

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
  pathname: string;
}

export function AdminHeader({ sidebarCollapsed, pathname }: AdminHeaderProps) {
  const { logoutAdmin } = useAuth();
  const [dark, setDark] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const navigate = useNavigate();

  const title = Object.entries(PAGE_TITLES).find(([k]) => pathname === k || (k !== '/admin' && pathname.startsWith(k)))?.[1] ?? 'Admin';

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const notifs = [
    { id: 1, msg: 'New booking: Meera Thakur', time: '5 min ago', unread: true },
    { id: 2, msg: 'Payment verified: MMG-2026-003', time: '2 hr ago', unread: true },
    { id: 3, msg: 'Idol delivered: Raja Ganapati', time: '2 days ago', unread: false },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, right: 0, zIndex: 100,
      left: sidebarCollapsed ? 72 : 240,
      height: 64,
      background: dark ? '#0F0F1A' : 'rgba(247,248,250,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px',
      transition: 'left 0.25s ease',
      gap: 16,
    }}>
      {/* Page Title + Date */}
      <div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: dark ? 'white' : '#1F2937', margin: 0 }}>
          {title}
        </h1>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: dark ? 'rgba(255,255,255,0.4)' : '#9CA3AF', margin: 0, marginTop: 1 }}>
          {today}
        </p>
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 14px', borderRadius: 10,
          background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
          minWidth: 200,
        }}>
          <Search size={15} color={dark ? 'rgba(255,255,255,0.4)' : '#9CA3AF'} />
          <input
            placeholder="Search bookings, customers..."
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem',
              color: dark ? 'rgba(255,255,255,0.8)' : '#374151',
              width: '100%',
            }}
          />
        </div>

        {/* Dark Mode */}
        <button
          onClick={() => setDark(d => !d)}
          style={{
            width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
            background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          {dark ? <Sun size={16} color="rgba(255,255,255,0.7)" /> : <Moon size={16} color="#6B7280" />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowNotifs(n => !n); setShowProfile(false); }}
            style={{
              width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}
          >
            <Bell size={16} color={dark ? 'rgba(255,255,255,0.7)' : '#6B7280'} />
            <span style={{
              position: 'absolute', top: 7, right: 7, width: 7, height: 7,
              borderRadius: '50%', background: '#EF4444',
              border: `1.5px solid ${dark ? '#0F0F1A' : '#F7F8FA'}`,
            }} />
          </button>
          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  width: 320, background: 'white', borderRadius: 14,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)',
                  overflow: 'hidden', zIndex: 500,
                }}
              >
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#1F2937' }}>Notifications</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#5B2C83', cursor: 'pointer' }}>Mark all read</span>
                </div>
                {notifs.map(n => (
                  <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid #F9FAFB', background: n.unread ? 'rgba(91,44,131,0.03)' : 'white', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                    onMouseLeave={e => (e.currentTarget.style.background = n.unread ? 'rgba(91,44,131,0.03)' : 'white')}
                  >
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B2C83', marginTop: 5, flexShrink: 0 }} />}
                      <div>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#1F2937', margin: 0 }}>{n.msg}</p>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9CA3AF', margin: '2px 0 0' }}>{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowProfile(p => !p); setShowNotifs(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px',
              borderRadius: 10, border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'}`,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)', cursor: 'pointer',
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, #5B2C83, #7E4BAA)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: 'white',
            }}>A</div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: dark ? 'rgba(255,255,255,0.8)' : '#374151', fontWeight: 500 }}>Admin</span>
            <ChevronDown size={13} color={dark ? 'rgba(255,255,255,0.4)' : '#9CA3AF'} />
          </button>
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  width: 200, background: 'white', borderRadius: 14,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)',
                  overflow: 'hidden', zIndex: 500,
                }}
              >
                {[
                  { icon: User, label: 'My Profile', onClick: () => setShowProfile(false) },
                  { icon: Settings, label: 'Settings', onClick: () => { navigate('/admin/settings'); setShowProfile(false); } },
                  { icon: LogOut, label: 'Logout', danger: true, onClick: () => { logoutAdmin(); navigate('/'); setShowProfile(false); } },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                      padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer',
                      textAlign: 'left', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = item.danger ? 'rgba(239,68,68,0.05)' : '#F9FAFB')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <item.icon size={15} color={item.danger ? '#EF4444' : '#6B7280'} />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.83rem', color: item.danger ? '#EF4444' : '#374151' }}>{item.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
