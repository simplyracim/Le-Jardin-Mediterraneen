import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import AIChatWidget from '@/components/chat/AIChatWidget';
import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import StoryPage from '@/pages/StoryPage';
import GalleryPage from '@/pages/GalleryPage';
import EventsPage from '@/pages/EventsPage';
import GiftCardsPage from '@/pages/GiftCardsPage';
import ContactPage from '@/pages/ContactPage';
import ReservationsPage from '@/pages/ReservationsPage';
import CareersPage from '@/pages/CareersPage';
import OrderOnlinePage from '@/pages/OrderOnlinePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminPage from '@/pages/AdminPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfUsePage from '@/pages/TermsOfUsePage';
import AccessibilityPage from '@/pages/AccessibilityPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/our-story" element={<StoryPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/order-online" element={<OrderOnlinePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
        </Routes>
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}

export default App;
