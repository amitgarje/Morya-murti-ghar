// ─── Mock Data for Admin Dashboard ───────────────────────────────────────────

export type IdolStatus = 'available' | 'sold out';
export type Material = 'Shadu Mati' | 'Plaster of Paris' | 'Fiber' | 'Eco-Friendly' | 'Marble';
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'delivered';

export interface Idol {
  id: string;
  name: string;
  category: string;
  heightCm: number;
  material: Material;
  status: IdolStatus;
  images: string[];
  description: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingId: string;  // alias displayed in UI
  idolId: string;
  idolName: string;
  customerName: string;
  phone: string;
  address: string;
  paymentAmount: number;
  status: BookingStatus;
  paymentProof: string;
  createdAt: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  bookingCount: number;
  totalSpent: number;
  lastBooking: string;
}

// ─── IDOLS ────────────────────────────────────────────────────────────────────
export const mockIdols: Idol[] = [
  { id: 'i1', name: 'Shree Siddhi Vinayak', category: 'Traditional', heightCm: 24, material: 'Shadu Mati', status: 'available', images: ['/ganesh-hero.png'], description: 'Beautifully handcrafted Siddhi Vinayak idol in eco-friendly Shadu Mati.', createdAt: '2026-07-01' },
  { id: 'i2', name: 'Mangalmurti Maharaj', category: 'Premium', heightCm: 36, material: 'Shadu Mati', status: 'sold out', images: ['/ganesh-hero.png'], description: 'Large premium Mangalmurti with intricate detailing.', createdAt: '2026-07-01' },
  { id: 'i3', name: 'Bal Ganesh', category: 'Children', heightCm: 12, material: 'Eco-Friendly', status: 'available', images: ['/ganesh-hero.png'], description: 'Cute Bal Ganesh idol, perfect for home puja.', createdAt: '2026-07-02' },
  { id: 'i4', name: 'Navaratna Ganesh', category: 'Luxury', heightCm: 48, material: 'Fiber', status: 'sold out', images: ['/ganesh-hero.png'], description: 'Jewel-studded Navaratna Ganesh, a collector\'s piece.', createdAt: '2026-07-03' },
  { id: 'i5', name: 'Peaceful Ekdanta', category: 'Traditional', heightCm: 18, material: 'Plaster of Paris', status: 'available', images: ['/ganesh-hero.png'], description: 'Serene and peaceful expression, ideal for meditation rooms.', createdAt: '2026-07-03' },
  { id: 'i6', name: 'Raja Ganapati', category: 'Premium', heightCm: 30, material: 'Shadu Mati', status: 'available', images: ['/ganesh-hero.png'], description: 'Royal posture with golden crown and ornaments.', createdAt: '2026-07-04' },
  { id: 'i7', name: 'Dhundi Vinayak', category: 'Traditional', heightCm: 21, material: 'Eco-Friendly', status: 'available', images: ['/ganesh-hero.png'], description: 'Classic Dhundi Vinayak in seated position.', createdAt: '2026-07-05' },
  { id: 'i8', name: 'Panchmukhi Ganesh', category: 'Luxury', heightCm: 42, material: 'Marble', status: 'sold out', images: ['/ganesh-hero.png'], description: 'Five-faced Panchmukhi Ganesh in white marble.', createdAt: '2026-07-05' },
];

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────
export const mockBookings: Booking[] = [
  { id: 'MMG-2026-001', bookingId: 'MMG-2026-001', idolId: 'i1', idolName: 'Shree Siddhi Vinayak', customerName: 'Ramesh Desai', phone: '+919876543210', address: 'Flat 3A, Anand Nagar, Kalyan East', paymentAmount: 3500, status: 'approved', paymentProof: '/ganesh-hero.png', createdAt: '2026-07-10', notes: 'Preferred afternoon delivery' },
  { id: 'MMG-2026-002', bookingId: 'MMG-2026-002', idolId: 'i3', idolName: 'Bal Ganesh', customerName: 'Sneha Patil', phone: '+919823456780', address: 'Plot 12, Shivaji Road, Dombivli', paymentAmount: 1200, status: 'pending', paymentProof: '/ganesh-hero.png', createdAt: '2026-07-11' },
  { id: 'MMG-2026-003', bookingId: 'MMG-2026-003', idolId: 'i6', idolName: 'Raja Ganapati', customerName: 'Kiran More', phone: '+919765432100', address: '203, Balaji Heights, Thane West', paymentAmount: 5000, status: 'approved', paymentProof: '/ganesh-hero.png', createdAt: '2026-07-12' },
  { id: 'MMG-2026-004', bookingId: 'MMG-2026-004', idolId: 'i5', idolName: 'Peaceful Ekdanta', customerName: 'Meera Thakur', phone: '+918765432100', address: 'Sector 5, Ulwe, Navi Mumbai', paymentAmount: 2200, status: 'pending', paymentProof: '/ganesh-hero.png', createdAt: '2026-07-14' },
  { id: 'MMG-2026-005', bookingId: 'MMG-2026-005', idolId: 'i7', idolName: 'Dhundi Vinayak', customerName: 'Ajay Sharma', phone: '+917654321000', address: '14, MG Road, Pune', paymentAmount: 2800, status: 'delivered', paymentProof: '/ganesh-hero.png', createdAt: '2026-07-08' },
  { id: 'MMG-2026-006', bookingId: 'MMG-2026-006', idolId: 'i1', idolName: 'Shree Siddhi Vinayak', customerName: 'Pooja Naik', phone: '+916543210000', address: 'B-7, Ganesh Colony, Nashik', paymentAmount: 3500, status: 'rejected', paymentProof: '/ganesh-hero.png', createdAt: '2026-07-09', notes: 'Invalid payment screenshot' },
];

// ─── CUSTOMERS ───────────────────────────────────────────────────────────────
export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Ramesh Desai', phone: '+919876543210', address: 'Flat 3A, Anand Nagar, Kalyan East', bookingCount: 3, totalSpent: 10500, lastBooking: '2026-07-10' },
  { id: 'c2', name: 'Sneha Patil', phone: '+919823456780', address: 'Plot 12, Shivaji Road, Dombivli', bookingCount: 1, totalSpent: 1200, lastBooking: '2026-07-11' },
  { id: 'c3', name: 'Kiran More', phone: '+919765432100', address: '203, Balaji Heights, Thane West', bookingCount: 2, totalSpent: 9800, lastBooking: '2026-07-12' },
  { id: 'c4', name: 'Meera Thakur', phone: '+918765432100', address: 'Sector 5, Ulwe, Navi Mumbai', bookingCount: 1, totalSpent: 2200, lastBooking: '2026-07-14' },
  { id: 'c5', name: 'Ajay Sharma', phone: '+917654321000', address: '14, MG Road, Pune', bookingCount: 4, totalSpent: 14500, lastBooking: '2026-07-08' },
  { id: 'c6', name: 'Pooja Naik', phone: '+916543210000', address: 'B-7, Ganesh Colony, Nashik', bookingCount: 1, totalSpent: 0, lastBooking: '2026-07-09' },
];

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
export const monthlyBookings = [
  { month: 'Jan', bookings: 2, revenue: 7000 },
  { month: 'Feb', bookings: 1, revenue: 3500 },
  { month: 'Mar', bookings: 3, revenue: 11500 },
  { month: 'Apr', bookings: 2, revenue: 8200 },
  { month: 'May', bookings: 5, revenue: 21000 },
  { month: 'Jun', bookings: 8, revenue: 34500 },
  { month: 'Jul', bookings: 14, revenue: 58000 },
  { month: 'Aug', bookings: 22, revenue: 92000 },
  { month: 'Sep', bookings: 45, revenue: 187000 },
  { month: 'Oct', bookings: 12, revenue: 51000 },
  { month: 'Nov', bookings: 4, revenue: 17500 },
  { month: 'Dec', bookings: 2, revenue: 8800 },
];

export const materialData = [
  { name: 'Shadu Mati', label: 'Shadu Mati', value: 42, color: '#5B2C83' },
  { name: 'Eco-Friendly', label: 'Eco-Friendly', value: 28, color: '#22C55E' },
  { name: 'Plaster of Paris', label: 'Plaster of Paris', value: 18, color: '#D4AF37' },
  { name: 'Fiber', label: 'Fiber', value: 8, color: '#EF4444' },
  { name: 'Marble', label: 'Marble', value: 4, color: '#3B82F6' },
];

export const heightData = [
  { label: '1 Ft', range: '1 Ft', value: 15, count: 15 },
  { label: '1.5 Ft', range: '1.5 Ft', value: 22, count: 22 },
  { label: '2 Ft', range: '2 Ft', value: 35, count: 35 },
  { label: '3 Ft', range: '3 Ft', value: 18, count: 18 },
  { label: '4 Ft', range: '4 Ft', value: 7, count: 7 },
  { label: '5 Ft+', range: '5 Ft+', value: 3, count: 3 },
];
