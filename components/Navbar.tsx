
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hexagon, ChevronDown } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { brands, companyInfo } = useProducts();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    e.currentTarget.src = `https://placehold.co/300x150/ffffff/333333?text=${encodeURIComponent(name)}&font=roboto`;
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              {companyInfo.logoUrl ? (
                // Eğer admin panelinden logo yüklendiyse bunu göster
                <img 
                  src={companyInfo.logoUrl} 
                  alt={companyInfo.name} 
                  className="h-16 w-auto object-contain"
                />
              ) : (
                // Logo yoksa varsayılan ikon ve yazı göster
                <>
                  <Hexagon className="h-9 w-9 text-primary-600 group-hover:rotate-90 transition-transform duration-500" />
                  <div className="flex flex-col">
                    <span className="font-bold text-2xl tracking-tight text-slate-900 leading-none">
                      {companyInfo.name}
                    </span>
                    <span className="text-[10px] text-slate-500 tracking-widest uppercase">Kurumsal</span>
                  </div>
                </>
              )}
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
              }`}
            >
              Anasayfa
            </Link>

            <Link
              to="/kurumsal"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/kurumsal') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
              }`}
            >
              Kurumsal
            </Link>

            {/* Mega Dropdown Menu for Brands */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none ${
                  isActive('/urunler') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 group-hover:text-primary-600 group-hover:bg-slate-50'
                }`}
              >
                Ürünlerimiz
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Content with Logos */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[700px] bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-bold text-slate-900">Markalarımız</span>
                    <Link to="/urunler" className="text-xs text-primary-600 hover:underline">Tümünü Gör</Link>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    {brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/urunler?marka=${brand.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group/brand"
                      >
                        {/* Logo Container - Cleaned up */}
                        <div className="w-24 h-14 flex items-center justify-center shrink-0">
                          <img 
                            src={brand.logoUrl} 
                            alt={brand.name} 
                            className="max-w-full max-h-full object-contain opacity-90 group-hover/brand:opacity-100 transition-opacity"
                            onError={(e) => handleImageError(e, brand.name)}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                  <Link to="/urunler" className="text-xs font-medium text-slate-500 hover:text-primary-600 transition-colors block w-full h-full">
                    Tüm Ürün Kataloğunu İncele &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/iletisim"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/iletisim') ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
              }`}
            >
              İletişim
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-primary-600 hover:bg-slate-100 focus:outline-none"
            >
              <span className="sr-only">Menüyü aç</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
            >
              Anasayfa
            </Link>
            <Link
              to="/kurumsal"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
            >
              Kurumsal
            </Link>
            
            <div className="px-3 py-2">
              <div className="font-medium text-slate-900 mb-3 px-3">Markalarımız</div>
              <div className="grid grid-cols-2 gap-2">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/urunler?marka=${brand.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center p-2 border border-slate-100 rounded-lg bg-slate-50 hover:border-primary-200 hover:bg-primary-50 transition-all"
                  >
                    <img 
                      src={brand.logoUrl} 
                      alt={brand.name} 
                      className="h-8 object-contain mb-2"
                      onError={(e) => handleImageError(e, brand.name)}
                    />
                    <span className="text-xs font-medium text-slate-700">{brand.name}</span>
                  </Link>
                ))}
              </div>
              <Link 
                to="/urunler" 
                onClick={() => setIsOpen(false)}
                className="block mt-3 text-center text-sm text-primary-600 font-medium underline"
              >
                Tüm Ürünleri Gör
              </Link>
            </div>

            <Link
              to="/iletisim"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
            >
              İletişim
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;