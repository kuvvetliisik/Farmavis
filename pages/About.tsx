
import React, { useEffect } from 'react';
import { COMPANY_INFO } from '../constants';

const About: React.FC = () => {
  
  useEffect(() => {
    document.title = "Hakkımızda | MedicoCore";
  }, []);

  return (
    <div className="bg-white">
      
      {/* Header */}
      <div className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Hakkımızda</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Geleceği şekillendiren vizyonumuz ve insan odaklı yaklaşımımızla tanışın.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Biz Kimiz?</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {COMPANY_INFO.aboutShort}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Kurulduğumuz günden bu yana, etik değerlerden ödün vermeden, bilimsel araştırmaları merkeze alarak kozmetik ve medikal sektöründe fark yaratan ürünler geliştirmekteyiz. Uzman kadromuz ve son teknoloji laboratuvarlarımızda geliştirdiğimiz her formül, titiz kalite kontrol süreçlerinden geçmektedir.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://picsum.photos/id/180/800/600" 
              alt="Office Interior" 
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Misyonumuz</h3>
            <p className="text-slate-600 leading-relaxed">
              {COMPANY_INFO.mission}
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Vizyonumuz</h3>
            <p className="text-slate-600 leading-relaxed">
              {COMPANY_INFO.vision}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
