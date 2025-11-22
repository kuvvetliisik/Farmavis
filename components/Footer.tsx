
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants';
import { Phone, Mail, MapPin, Shield, ArrowRight } from 'lucide-react';
import Button from './Button';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Company Info */}
          <div className="col-span-1">
            <span className="font-bold text-2xl text-white tracking-tight">{COMPANY_INFO.name}</span>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              {COMPANY_INFO.aboutShort}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary-400 transition-colors">Anasayfa</Link></li>
              <li><Link to="/kurumsal" className="text-sm hover:text-primary-400 transition-colors">Hakkımızda</Link></li>
              <li><Link to="/urunler" className="text-sm hover:text-primary-400 transition-colors">Ürün Kataloğu</Link></li>
              <li><Link to="/iletisim" className="text-sm hover:text-primary-400 transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Newsletter (New Feature) */}
          <div>
            <h3 className="text-white font-semibold mb-4">E-Bülten Aboneliği</h3>
            <p className="text-xs text-slate-400 mb-4">Yeni ürünler ve sağlık trendlerinden haberdar olmak için abone olun.</p>
            {subscribed ? (
              <div className="text-green-400 text-sm font-medium bg-green-400/10 p-2 rounded">
                Kaydınız alındı, teşekkürler!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="bg-slate-800 border border-slate-700 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-primary-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="h-8 text-xs" variant="primary">
                  Abone Ol <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Bize Ulaşın</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Tüm hakları saklıdır.
          </div>
          <Link to="/admin" className="text-xs text-slate-700 hover:text-slate-500 flex items-center gap-1">
            <Shield className="h-3 w-3" /> Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
