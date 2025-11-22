
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    document.title = "İletişim | MedicoCore";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">İletişim</h1>
          <p className="text-slate-600">Sorularınız, iş birlikleri ve görüşleriniz için bize ulaşın.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Adres</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed ml-14">
                {COMPANY_INFO.address}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Telefon</h3>
              </div>
              <p className="text-slate-600 text-sm ml-14">
                {COMPANY_INFO.phone}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900">E-Posta</h3>
              </div>
              <p className="text-slate-600 text-sm ml-14">
                {COMPANY_INFO.email}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Bize Yazın</h2>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-green-800 font-semibold text-lg mb-2">Mesajınız Alındı!</h3>
                  <p className="text-green-600">En kısa sürede size dönüş yapacağız. Teşekkür ederiz.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setFormStatus('idle')}
                  >
                    Yeni Mesaj Gönder
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">Adınız</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required 
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Soyadınız</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required 
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-posta Adresi</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mesajınız</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      required 
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Size nasıl yardımcı olabiliriz?"
                    ></textarea>
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Fake Map */}
        <div className="mt-12 rounded-xl overflow-hidden border border-slate-200 h-96 bg-slate-200 relative">
             <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                 <p className="text-slate-500 font-medium">Google Maps Embed Alanı (41.0082° N, 28.9784° E)</p>
             </div>
             {/* Note: In a real app, use an iframe here: 
                 <iframe src="..." width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe> 
             */}
        </div>

      </div>
    </div>
  );
};

export default Contact;
