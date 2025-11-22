
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Maximize2, X } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { useProducts } from '../context/ProductContext';
import Button from '../components/Button';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products, brands } = useProducts();
  const product = id ? getProductById(id) : undefined;
  
  const [openSection, setOpenSection] = useState<'ingredients' | 'usage' | 'description' | null>('description');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Brand Info from dynamic context
  const brand = product ? brands.find(b => b.id === product.brandId) : null;

  // SEO Title Update
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | MedicoCore`;
    }
  }, [product]);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ürün Bulunamadı</h2>
        <p className="text-slate-600 mb-6">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <Link to="/urunler">
          <Button>Kataloğa Dön</Button>
        </Link>
      </div>
    );
  }

  const toggleSection = (section: 'ingredients' | 'usage' | 'description') => {
    setOpenSection(openSection === section ? null : section);
  };

  // Related Products Logic: Same Brand or Same Category
  const relatedProducts = products
    .filter(p => (p.brandId === product.brandId || p.category === product.category) && p.id !== product.id)
    .slice(0, 4);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    e.currentTarget.src = `https://placehold.co/300x150/ffffff/333333?text=${encodeURIComponent(name)}&font=roboto`;
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link to="/urunler" className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Ürünlere Dön
          </Link>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          
          {/* Image Section - Sticky & Height Constrained */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div 
                className="bg-white rounded-xl border border-slate-100 p-6 flex items-center justify-center h-[400px] lg:h-[500px] relative group cursor-zoom-in shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setIsLightboxOpen(true)}
              >
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/5 text-slate-700 p-2 rounded-full">
                  <Maximize2 className="h-5 w-5" />
                </div>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-7">
            
            {/* Brand Logo & Category Tag */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
               {brand && (
                 <img 
                  src={brand.logoUrl} 
                  alt={brand.name} 
                  className="h-8 object-contain"
                  onError={(e) => handleImageError(e, brand.name)}
                 />
               )}
               <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-700 text-xs font-bold tracking-wide uppercase">
                  {product.category}
               </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            {/* Modern Tab/Accordion Structure */}
            <div className="space-y-3 mb-10">
              
              {/* Ürün Detayı */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection('description')}
                  className={`w-full flex justify-between items-center p-4 text-left transition-colors ${openSection === 'description' ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
                >
                  <span className="font-semibold text-slate-900">Ürün Hakkında</span>
                  {openSection === 'description' ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                </button>
                {openSection === 'description' && (
                  <div className="p-5 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-200">
                    {product.fullDescription}
                  </div>
                )}
              </div>

              {/* Usage */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection('usage')}
                  className={`w-full flex justify-between items-center p-4 text-left transition-colors ${openSection === 'usage' ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
                >
                  <span className="font-semibold text-slate-900">Kullanım Şekli</span>
                  {openSection === 'usage' ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                </button>
                {openSection === 'usage' && (
                  <div className="p-5 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-200">
                    {product.usage}
                  </div>
                )}
              </div>

              {/* Ingredients */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection('ingredients')}
                  className={`w-full flex justify-between items-center p-4 text-left transition-colors ${openSection === 'ingredients' ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
                >
                  <span className="font-semibold text-slate-900">İçindekiler / Teknik Detaylar</span>
                  {openSection === 'ingredients' ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                </button>
                {openSection === 'ingredients' && (
                  <div className="p-5 bg-white text-slate-600 text-sm border-t border-slate-200">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-100">
              <Link to="/iletisim">
                <Button fullWidth className="h-12 text-base">
                  İletişim Formu / Bilgi Al
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400 text-center sm:text-left">
              * Bu ürün ilaç değildir. Medikal tavsiye için doktorunuza danışınız.
            </p>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-200 pt-16">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-bold text-slate-900">Bunları da İnceleyebilirsiniz</h2>
               <Link to="/urunler" className="text-primary-600 text-sm font-medium hover:underline">Tümünü Gör</Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => {
                const relBrand = brands.find(b => b.id === relProduct.brandId);
                return (
                  <Link 
                    key={relProduct.id} 
                    to={`/urun/${relProduct.id}`} 
                    onClick={() => window.scrollTo(0,0)}
                    className="group block"
                  >
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="aspect-square bg-white p-6 relative overflow-hidden border-b border-slate-50 flex items-center justify-center">
                        
                        <img 
                          src={relProduct.imageUrl} 
                          alt={relProduct.name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{relBrand?.name || relProduct.category}</p>
                         <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {relProduct.name}
                         </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setIsLightboxOpen(false)}>
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
          >
            <X className="h-8 w-8" />
          </button>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
