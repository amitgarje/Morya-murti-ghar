import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBg?: string;
  trend?: number;
  trendLabel?: string;
  accent?: string;
  delay?: number;
}

export function StatCard({ title, value, icon, iconBg = '#5B2C83', trend, trendLabel, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
      style={{
        background: 'white', borderRadius: 16, padding: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.04)',
        cursor: 'default', transition: 'box-shadow 0.25s ease',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#9CA3AF', margin: 0, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </p>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.85rem', color: '#1F2937', margin: '6px 0 0', lineHeight: 1 }}>
            {value}
          </p>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: `${iconBg}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {trend > 0
            ? <TrendingUp size={13} color="#22C55E" />
            : trend < 0
            ? <TrendingDown size={13} color="#EF4444" />
            : <Minus size={13} color="#9CA3AF" />
          }
          <span style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem',
            color: trend > 0 ? '#22C55E' : trend < 0 ? '#EF4444' : '#9CA3AF',
            fontWeight: 500,
          }}>
            {trend > 0 ? '+' : ''}{trend}% {trendLabel ?? 'vs last week'}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
type StatusType = 'available' | 'reserved' | 'booked' | 'pending' | 'approved' | 'rejected' | 'delivered';

const STATUS_MAP: Record<StatusType, { label: string; bg: string; color: string }> = {
  available:  { label: 'Available',  bg: '#DCFCE7', color: '#16A34A' },
  reserved:   { label: 'Reserved',   bg: '#FEF3C7', color: '#D97706' },
  booked:     { label: 'Booked',     bg: '#EDE9FE', color: '#7C3AED' },
  pending:    { label: 'Pending',    bg: '#FEF9C3', color: '#CA8A04' },
  approved:   { label: 'Approved',   bg: '#DCFCE7', color: '#16A34A' },
  rejected:   { label: 'Rejected',   bg: '#FEE2E2', color: '#DC2626' },
  delivered:  { label: 'Delivered',  bg: '#DBEAFE', color: '#2563EB' },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status as StatusType] ?? { label: status, bg: '#F3F4F6', color: '#6B7280' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 9999,
      background: s.bg, color: s.color,
      fontFamily: 'Poppins, sans-serif', fontSize: '0.73rem', fontWeight: 600,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
      {s.label}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
      <div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1F2937', margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#9CA3AF', margin: '3px 0 0' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Action Button ────────────────────────────────────────────────────────────
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children: ReactNode;
}

const BTN_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  primary:   { bg: '#5B2C83', color: 'white', border: 'transparent' },
  secondary: { bg: 'white', color: '#5B2C83', border: '#5B2C83' },
  danger:    { bg: '#EF4444', color: 'white', border: 'transparent' },
  ghost:     { bg: 'rgba(0,0,0,0.04)', color: '#374151', border: 'rgba(0,0,0,0.08)' },
  success:   { bg: '#22C55E', color: 'white', border: 'transparent' },
};

export function Btn({ variant = 'primary', size = 'md', icon, children, style, ...rest }: BtnProps) {
  const s = BTN_STYLES[variant];
  return (
    <button
      {...rest}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: size === 'sm' ? '6px 12px' : '9px 18px',
        borderRadius: 10, border: `1.5px solid ${s.border}`,
        background: s.bg, color: s.color,
        fontFamily: 'Poppins, sans-serif', fontWeight: 600,
        fontSize: size === 'sm' ? '0.78rem' : '0.85rem',
        cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'opacity 0.15s, transform 0.15s',
        ...style,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
    >
      {icon}{children}
    </button>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ fontSize: '3rem' }}>{icon}</div>
      <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#1F2937', margin: 0 }}>{title}</h3>
      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#9CA3AF', margin: 0, maxWidth: 280 }}>{desc}</p>
    </div>
  );
}

// ─── Card shell ───────────────────────────────────────────────────────────────
export function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'white', borderRadius: 16,
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      border: '1px solid rgba(0,0,0,0.04)',
      overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps { open: boolean; onClose: () => void; title: string; children: ReactNode; width?: number }

export function Modal({ open, onClose, title, children, width = 560 }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900, padding: 16 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative', width: `min(${width}px, 100%)`,
              background: 'white', borderRadius: 20,
              boxShadow: '0 32px 80px rgba(0,0,0,0.18)', overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid #F3F4F6' }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1F2937', margin: 0 }}>{title}</h3>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '22px', overflowY: 'auto', maxHeight: '80vh' }}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ msg, type = 'success' }: { msg: string; type?: 'success' | 'error' | 'info' }) {
  const colors = { success: '#22C55E', error: '#EF4444', info: '#5B2C83' };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
        background: 'white', borderRadius: 12, padding: '14px 18px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.12)', borderLeft: `4px solid ${colors[type]}`,
        fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#1F2937',
        minWidth: 260,
      }}
    >
      {msg}
    </motion.div>
  );
}
