import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, BookOpen, ClipboardList, Users,
  Wand2, Settings, LogOut, ChevronLeft, ChevronRight,
  Zap, BarChart2, X,
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Manage Idols', to: '/admin/idols', icon: Package },
  { label: 'Bookings', to: '/admin/bookings', icon: BookOpen },
  { label: 'Offline Bookings', to: '/admin/offline-bookings', icon: ClipboardList },
  { label: 'Customers', to: '/admin/customers', icon: Users },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart2 },
  { label: 'Invitation Studio', to: '/admin/invitation', icon: Wand2 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  isMobile: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({ collapsed, onToggle, mobileOpen, isMobile, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAdmin } = useAuth();

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  // On mobile: sidebar is a drawer (slides in from left)
  // On desktop: sidebar is always visible, can be collapsed
  const showLabels = isMobile ? true : !collapsed;
  const sidebarWidth = isMobile ? 260 : (collapsed ? 72 : 240);
  const translateX = isMobile ? (mobileOpen ? 0 : -280) : 0;

  return (
    <motion.aside
      animate={{
        width: isMobile ? 260 : (collapsed ? 72 : 240),
        x: translateX,
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: isMobile ? 200 : 200,
        background: '#1F1F2E',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        width: sidebarWidth,
      }}
    >
      {/* Logo */}
      <div style={{
        height: 64, display: 'flex', alignItems: 'center',
        padding: showLabels ? '0 20px' : '0 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0, gap: 12,
        justifyContent: showLabels ? 'space-between' : 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #5B2C83, #7E4BAA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(91,44,131,0.5)',
          }}>
            <Zap size={18} color="#D4AF37" />
          </div>
          <AnimatePresence>
            {showLabels && (
              <motion.div
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'white', letterSpacing: '-0.3px' }}>Morya Murti Ghar</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Admin Dashboard</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Close button on mobile */}
        {isMobile && (
          <button
            onClick={onMobileClose}
            style={{
              background: 'rgba(255,255,255,0.08)', border: 'none',
              borderRadius: 8, width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.6)', flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(item => {
          const active = isActive(item.to, item.exact);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={!showLabels ? item.label : undefined}
              style={{
                display: 'flex', alignItems: 'center',
                gap: 12, padding: showLabels ? '11px 14px' : '10px 16px',
                borderRadius: 10, textDecoration: 'none',
                justifyContent: showLabels ? 'flex-start' : 'center',
                background: active ? 'rgba(91,44,131,0.3)' : 'transparent',
                borderLeft: active ? '2px solid #5B2C83' : '2px solid transparent',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <Icon size={18} color={active ? '#A78BDB' : 'rgba(255,255,255,0.5)'} style={{ flexShrink: 0 }} />
              <AnimatePresence>
                {showLabels && (
                  <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', whiteSpace: 'nowrap',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#C4A0E8' : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle + Logout */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Logout */}
        <button
          onClick={() => { logoutAdmin(); navigate('/'); }}
          title={!showLabels ? 'Logout' : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            padding: showLabels ? '11px 14px' : '10px 16px',
            borderRadius: 10, border: 'none', background: 'transparent',
            cursor: 'pointer', justifyContent: showLabels ? 'flex-start' : 'center',
            transition: 'background 0.18s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut size={18} color="rgba(239,68,68,0.7)" style={{ flexShrink: 0 }} />
          <AnimatePresence>
            {showLabels && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: 'rgba(239,68,68,0.7)', whiteSpace: 'nowrap' }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Collapse toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={onToggle}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '8px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)', background: 'transparent',
              cursor: 'pointer', color: 'rgba(255,255,255,0.35)', transition: 'background 0.18s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>
    </motion.aside>
  );
}
