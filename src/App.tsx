import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { IdolDetailsPage } from '@/pages/IdolDetailsPage';
import { InvitationStudioPage } from '@/pages/InvitationStudioPage';
import { InvitationViewPage } from '@/pages/InvitationViewPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { Loader } from '@/components/layout/Loader';

// Auth Provider & Guard
import { AuthProvider, useAuth } from '@/context/AuthContext';

// Admin Imports
import { AdminLoginPage } from '@/admin/pages/AdminLoginPage';
import { AdminDashboardPage } from '@/admin/pages/AdminDashboardPage';
import { ManageIdolsPage } from '@/admin/pages/ManageIdolsPage';
import { BookingsPage } from '@/admin/pages/BookingsPage';
import { BookingDetailsPage } from '@/admin/pages/BookingDetailsPage';
import { OfflineBookingsPage } from '@/admin/pages/OfflineBookingsPage';
import { CustomersPage } from '@/admin/pages/CustomersPage';
import { InvitationStudioPage as AdminInvitationStudioPage } from '@/admin/pages/InvitationStudioPage';
import { SettingsPage } from '@/admin/pages/SettingsPage';

function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const { isAdminLoggedIn } = useAuth();
  
  if (!isAdminLoggedIn) {
    // If not logged in as admin, redirect to home page. 
    // This hides the admin paths from guessing.
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div style={{ minHeight: '100vh', background: '#FCFCFC', fontFamily: 'Poppins, sans-serif' }}>
      <Loader />
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<IdolDetailsPage />} />
          <Route path="/invitation" element={<InvitationStudioPage />} />
          <Route path="/invitation/view/:id" element={<InvitationViewPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Secret Admin Login Route */}
          <Route path="/morya-admin-secure" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminRouteGuard><AdminDashboardPage /></AdminRouteGuard>} />
          <Route path="/admin/idols" element={<AdminRouteGuard><ManageIdolsPage /></AdminRouteGuard>} />
          <Route path="/admin/bookings" element={<AdminRouteGuard><BookingsPage /></AdminRouteGuard>} />
          <Route path="/admin/bookings/:id" element={<AdminRouteGuard><BookingDetailsPage /></AdminRouteGuard>} />
          <Route path="/admin/offline-bookings" element={<AdminRouteGuard><OfflineBookingsPage /></AdminRouteGuard>} />
          <Route path="/admin/customers" element={<AdminRouteGuard><CustomersPage /></AdminRouteGuard>} />
          <Route path="/admin/invitation" element={<AdminRouteGuard><AdminInvitationStudioPage /></AdminRouteGuard>} />
          <Route path="/admin/settings" element={<AdminRouteGuard><SettingsPage /></AdminRouteGuard>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingButtons />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
