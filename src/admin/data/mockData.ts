// ─── Mock Data for Admin Dashboard ───────────────────────────────────────────

export type IdolStatus = 'available' | 'reserved' | 'booked' | 'delivered';
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'delivered';
export type Material = 'Shadu Mati' | 'Plaster of Paris' | 'Fiber' | 'Eco-Friendly' | 'Marble';

export interface Idol {
  id: string;
  name: string;
  category: string;
  heightCm: number;
  material: Material;
  price: number;
  discount: number;
  stock: number;
  status: IdolStatus;
  images: string[];
  description: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  totalBookings: number;
  totalAmount: number;
  lastBooking: string;
  isReturning: boolean;
  initials: string;
  color: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp: string;
  idolId: string;
  idolName: string;
  idolImage: string;
  idolHeight: number;
  idolMaterial: string;
  idolPrice: number;
  advancePaid: number;
  remainingAmount: number;
  transactionId: string;
  paymentMode: 'UPI' | 'Cash' | 'Card';
  pickupDate: string;
  bookingDate: string;
  status: BookingStatus;
  notes?: string;
  timeline: { action: string; time: string; by: string }[];
}

// ─── IDOLS ────────────────────────────────────────────────────────────────────
export const mockIdols: Idol[] = [
  { id: 'i1', name: 'Shree Siddhi Vinayak', category: 'Traditional', heightCm: 24, material: 'Shadu Mati', price: 4500, discount: 10, stock: 3, status: 'available', images: ['/ganesh-hero.png'], description: 'Beautifully handcrafted Siddhi Vinayak idol in eco-friendly Shadu Mati.', createdAt: '2026-07-01' },
  { id: 'i2', name: 'Mangalmurti Maharaj', category: 'Premium', heightCm: 36, material: 'Shadu Mati', price: 8500, discount: 0, stock: 2, status: 'booked', images: ['/ganesh-hero.png'], description: 'Large premium Mangalmurti with intricate detailing.', createdAt: '2026-07-01' },
  { id: 'i3', name: 'Bal Ganesh', category: 'Children', heightCm: 12, material: 'Eco-Friendly', price: 1800, discount: 15, stock: 8, status: 'available', images: ['/ganesh-hero.png'], description: 'Cute Bal Ganesh idol, perfect for home puja.', createdAt: '2026-07-02' },
  { id: 'i4', name: 'Navaratna Ganesh', category: 'Luxury', heightCm: 48, material: 'Fiber', price: 15000, discount: 5, stock: 1, status: 'reserved', images: ['/ganesh-hero.png'], description: 'Jewel-studded Navaratna Ganesh, a collector\'s piece.', createdAt: '2026-07-03' },
  { id: 'i5', name: 'Peaceful Ekdanta', category: 'Traditional', heightCm: 18, material: 'Plaster of Paris', price: 2200, discount: 0, stock: 5, status: 'available', images: ['/ganesh-hero.png'], description: 'Serene and peaceful expression, ideal for meditation rooms.', createdAt: '2026-07-03' },
  { id: 'i6', name: 'Raja Ganapati', category: 'Premium', heightCm: 30, material: 'Shadu Mati', price: 6800, discount: 8, stock: 0, status: 'delivered', images: ['/ganesh-hero.png'], description: 'Royal posture with golden crown and ornaments.', createdAt: '2026-07-04' },
  { id: 'i7', name: 'Dhundi Vinayak', category: 'Traditional', heightCm: 21, material: 'Eco-Friendly', price: 3200, discount: 12, stock: 4, status: 'available', images: ['/ganesh-hero.png'], description: 'Classic Dhundi Vinayak in seated position.', createdAt: '2026-07-05' },
  { id: 'i8', name: 'Panchmukhi Ganesh', category: 'Luxury', heightCm: 42, material: 'Marble', price: 22000, discount: 0, stock: 1, status: 'booked', images: ['/ganesh-hero.png'], description: 'Five-faced Panchmukhi Ganesh in white marble.', createdAt: '2026-07-05' },
];

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Rajesh Patil', phone: '9876543210', whatsapp: '9876543210', email: 'rajesh@example.com', totalBookings: 3, totalAmount: 14500, lastBooking: '2026-07-14', isReturning: true, initials: 'RP', color: '#5B2C83' },
  { id: 'c2', name: 'Sunita Deshmukh', phone: '9823456789', whatsapp: '9823456789', email: 'sunita@example.com', totalBookings: 1, totalAmount: 8500, lastBooking: '2026-07-13', isReturning: false, initials: 'SD', color: '#D4AF37' },
  { id: 'c3', name: 'Amit Kulkarni', phone: '9765432108', whatsapp: '9765432108', totalBookings: 5, totalAmount: 32000, lastBooking: '2026-07-15', isReturning: true, initials: 'AK', color: '#22C55E' },
  { id: 'c4', name: 'Priya Joshi', phone: '9654321087', whatsapp: '9654321087', totalBookings: 2, totalAmount: 6800, lastBooking: '2026-07-12', isReturning: true, initials: 'PJ', color: '#EF4444' },
  { id: 'c5', name: 'Vikram Shinde', phone: '9543210987', whatsapp: '9543210987', totalBookings: 1, totalAmount: 4500, lastBooking: '2026-07-11', isReturning: false, initials: 'VS', color: '#3B82F6' },
  { id: 'c6', name: 'Meera Thakur', phone: '9432109876', whatsapp: '9432109876', totalBookings: 4, totalAmount: 28000, lastBooking: '2026-07-15', isReturning: true, initials: 'MT', color: '#F97316' },
];

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────
export const mockBookings: Booking[] = [
  {
    id: 'b1', bookingId: 'MMG-2026-001',
    customerId: 'c1', customerName: 'Rajesh Patil', customerPhone: '9876543210', customerWhatsapp: '9876543210',
    idolId: 'i2', idolName: 'Mangalmurti Maharaj', idolImage: '/ganesh-hero.png', idolHeight: 36, idolMaterial: 'Shadu Mati', idolPrice: 8500,
    advancePaid: 2000, remainingAmount: 6500, transactionId: 'UPI2026071401', paymentMode: 'UPI',
    pickupDate: '2026-09-12', bookingDate: '2026-07-14', status: 'approved', notes: 'Customer prefers morning pickup.',
    timeline: [
      { action: 'Booking Created', time: '2026-07-14 10:30 AM', by: 'Customer' },
      { action: 'Payment Received ₹2000', time: '2026-07-14 10:32 AM', by: 'System' },
      { action: 'Booking Approved', time: '2026-07-14 11:00 AM', by: 'Admin' },
    ],
  },
  {
    id: 'b2', bookingId: 'MMG-2026-002',
    customerId: 'c2', customerName: 'Sunita Deshmukh', customerPhone: '9823456789', customerWhatsapp: '9823456789',
    idolId: 'i4', idolName: 'Navaratna Ganesh', idolImage: '/ganesh-hero.png', idolHeight: 48, idolMaterial: 'Fiber', idolPrice: 15000,
    advancePaid: 5000, remainingAmount: 10000, transactionId: 'UPI2026071301', paymentMode: 'UPI',
    pickupDate: '2026-09-14', bookingDate: '2026-07-13', status: 'pending', notes: '',
    timeline: [
      { action: 'Booking Created', time: '2026-07-13 03:15 PM', by: 'Customer' },
      { action: 'Payment Received ₹5000', time: '2026-07-13 03:17 PM', by: 'System' },
    ],
  },
  {
    id: 'b3', bookingId: 'MMG-2026-003',
    customerId: 'c3', customerName: 'Amit Kulkarni', customerPhone: '9765432108', customerWhatsapp: '9765432108',
    idolId: 'i8', idolName: 'Panchmukhi Ganesh', idolImage: '/ganesh-hero.png', idolHeight: 42, idolMaterial: 'Marble', idolPrice: 22000,
    advancePaid: 8000, remainingAmount: 14000, transactionId: 'CASH-001', paymentMode: 'Cash',
    pickupDate: '2026-09-13', bookingDate: '2026-07-15', status: 'approved', notes: 'Wants delivery at home.',
    timeline: [
      { action: 'Booking Created', time: '2026-07-15 09:00 AM', by: 'Admin (Offline)' },
      { action: 'Cash Payment ₹8000', time: '2026-07-15 09:05 AM', by: 'Admin' },
      { action: 'Booking Approved', time: '2026-07-15 09:05 AM', by: 'Admin' },
    ],
  },
  {
    id: 'b4', bookingId: 'MMG-2026-004',
    customerId: 'c4', customerName: 'Priya Joshi', customerPhone: '9654321087', customerWhatsapp: '9654321087',
    idolId: 'i6', idolName: 'Raja Ganapati', idolImage: '/ganesh-hero.png', idolHeight: 30, idolMaterial: 'Shadu Mati', idolPrice: 6800,
    advancePaid: 6800, remainingAmount: 0, transactionId: 'UPI2026071201', paymentMode: 'UPI',
    pickupDate: '2026-09-10', bookingDate: '2026-07-12', status: 'delivered', notes: '',
    timeline: [
      { action: 'Booking Created', time: '2026-07-12 06:00 PM', by: 'Customer' },
      { action: 'Full Payment ₹6800', time: '2026-07-12 06:02 PM', by: 'System' },
      { action: 'Booking Approved', time: '2026-07-12 07:00 PM', by: 'Admin' },
      { action: 'Idol Delivered', time: '2026-09-10 10:00 AM', by: 'Admin' },
    ],
  },
  {
    id: 'b5', bookingId: 'MMG-2026-005',
    customerId: 'c5', customerName: 'Vikram Shinde', customerPhone: '9543210987', customerWhatsapp: '9543210987',
    idolId: 'i1', idolName: 'Shree Siddhi Vinayak', idolImage: '/ganesh-hero.png', idolHeight: 24, idolMaterial: 'Shadu Mati', idolPrice: 4500,
    advancePaid: 1000, remainingAmount: 3500, transactionId: 'UPI2026071101', paymentMode: 'UPI',
    pickupDate: '2026-09-14', bookingDate: '2026-07-11', status: 'rejected', notes: 'Duplicate booking.',
    timeline: [
      { action: 'Booking Created', time: '2026-07-11 11:00 AM', by: 'Customer' },
      { action: 'Payment Received ₹1000', time: '2026-07-11 11:02 AM', by: 'System' },
      { action: 'Booking Rejected', time: '2026-07-11 12:00 PM', by: 'Admin' },
    ],
  },
  {
    id: 'b6', bookingId: 'MMG-2026-006',
    customerId: 'c6', customerName: 'Meera Thakur', customerPhone: '9432109876', customerWhatsapp: '9432109876',
    idolId: 'i3', idolName: 'Bal Ganesh', idolImage: '/ganesh-hero.png', idolHeight: 12, idolMaterial: 'Eco-Friendly', idolPrice: 1800,
    advancePaid: 500, remainingAmount: 1300, transactionId: 'UPI2026071501', paymentMode: 'UPI',
    pickupDate: '2026-09-14', bookingDate: '2026-07-15', status: 'pending', notes: '',
    timeline: [
      { action: 'Booking Created', time: '2026-07-15 02:30 PM', by: 'Customer' },
      { action: 'Payment Received ₹500', time: '2026-07-15 02:31 PM', by: 'System' },
    ],
  },
];

// ─── CHART DATA ───────────────────────────────────────────────────────────────
export const monthlyBookings = [
  { month: 'Jan', bookings: 0, revenue: 0 },
  { month: 'Feb', bookings: 0, revenue: 0 },
  { month: 'Mar', bookings: 0, revenue: 0 },
  { month: 'Apr', bookings: 0, revenue: 0 },
  { month: 'May', bookings: 2, revenue: 8000 },
  { month: 'Jun', bookings: 5, revenue: 22000 },
  { month: 'Jul', bookings: 6, revenue: 23100 },
  { month: 'Aug', bookings: 0, revenue: 0 },
  { month: 'Sep', bookings: 0, revenue: 0 },
];

export const materialData = [
  { name: 'Shadu Mati', value: 45 },
  { name: 'Eco-Friendly', value: 25 },
  { name: 'Fiber', value: 15 },
  { name: 'POP', value: 10 },
  { name: 'Marble', value: 5 },
];

export const heightData = [
  { range: '< 12"', count: 8 },
  { range: '12–18"', count: 15 },
  { range: '18–24"', count: 22 },
  { range: '24–36"', count: 18 },
  { range: '36–48"', count: 10 },
  { range: '48+"', count: 4 },
];

export const dailyBookings = [
  { day: 'Mon', bookings: 2 },
  { day: 'Tue', bookings: 1 },
  { day: 'Wed', bookings: 3 },
  { day: 'Thu', bookings: 2 },
  { day: 'Fri', bookings: 4 },
  { day: 'Sat', bookings: 6 },
  { day: 'Sun', bookings: 5 },
];

export const recentActivities = [
  { id: 1, type: 'booking', message: 'New booking by Meera Thakur — Bal Ganesh', time: '5 min ago', color: '#5B2C83' },
  { id: 2, type: 'payment', message: 'Advance ₹8000 received — Amit Kulkarni', time: '2 hours ago', color: '#22C55E' },
  { id: 3, type: 'approve', message: 'Booking MMG-2026-003 approved', time: '2 hours ago', color: '#3B82F6' },
  { id: 4, type: 'booking', message: 'New booking by Rajesh Patil — Mangalmurti', time: 'Yesterday', color: '#5B2C83' },
  { id: 5, type: 'deliver', message: 'Raja Ganapati delivered to Priya Joshi', time: '2 days ago', color: '#D4AF37' },
];
