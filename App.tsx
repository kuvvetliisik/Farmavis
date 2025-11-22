
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { ProductProvider } from './context/ProductContext';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => new URL(window.location.href), []);
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const App: React.FC = () => {
  return (
    <ProductProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans text-slate-900 antialiased">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kurumsal" element={<About />} />
              <Route path="/urunler" element={<Catalog />} />
              <Route path="/urun/:id" element={<ProductDetail />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProductProvider>
  );
};

export default App;
