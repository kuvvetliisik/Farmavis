
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { ProductCategory } from '../types';
import { useProducts } from '../context/ProductContext';
import Button from '../components/Button';

const Catalog: React.FC = () => {
  const { products, brands } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = searchParams.get('kategori') as ProductCategory | null;
  const initialBrandId = searchParams.get('marka');

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(initialCategory || 'All');
  const [selectedBrandId, setSelectedBrandId] = useState<string | 'All'>(initialBrandId || 'All');
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Seçili markanın bilgilerini bul
  const currentBrand = brands.find(b => b.id === selectedBrandId);

  // SEO Title
  useEffect(() => {
    if (currentBrand) {
      document.title = `${currentBrand.name} Ürünleri | MedicoCore`;
    } else if (selectedCategory !== 'All') {
      document.title = `${selectedCategory} | MedicoCore`;
    } else {
      document.title = 'Ürün Kataloğu | MedicoCore';
    }
  }, [selectedCategory, selectedBrandId, currentBrand]);

  // URL değiştiğinde state'i güncelle
  useEffect(() => {
    const categoryParam = searchParams.get('kategori');
    const brandParam = searchParams.get('marka');

    if (categoryParam) {
      const matchedCategory = Object.values(ProductCategory).find(c => c === categoryParam);
      setSelectedCategory(matchedCategory || 'All');
      setSelectedBrandId('All'); // Kategori seçilirse marka filtresini kaldır
    } else if (brandParam) {
      setSelectedBrandId(brandParam);
      setSelectedCategory('All'); // Marka seçilirse kategori filtresini kaldır (veya birlikte çalıştırılabilir, şu an basitleştiriyoruz)
    } else {
      setSelectedCategory('All');
      setSelectedBrandId('All');
    }
  }, [searchParams]);

  const handleCategoryChange = (category: ProductCategory | 'All') => {
    setSelectedCategory(category);
    setSelectedBrandId('All'); // Kategori değişince markayı sıfırla
    setShowMobileFilters(false);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ kategori: category });
    }
  };

  const handleBrandChange = (brandId: string | 'All') => {
    setSelectedBrandId(brandId);
    setSelectedCategory('All'); // Marka değişince kategoriyi sıfırla
    setShowMobileFilters(false);
    if (brandId === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ marka: brandId });
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Kategori Filtresi
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Marka Filtresi
    if (selectedBrandId !== 'All') {
      filtered = filtered.filter(p => p.brandId === selectedBrandId);
    }

    return filtered;
  }, [selectedCategory, selectedBrandId, products]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedBrandId('All');
    setSearchParams({});
  };

  // Helper to get brand logo for a product using dynamic context
  const getBrandLogo = (id: string) => brands.find(b => b.id === id)?.logoUrl;
  const getBrandName = (id: string) => brands.find(b => b.id === id)?.name;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    e.currentTarget.src = `https://placehold.co/300x150/ffffff/333333?text=${encodeURIComponent(name)}&font=roboto`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          {currentBrand ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4">
              <img 
                src={currentBrand.logoUrl} 
                alt={currentBrand.name} 
                className="h-24 object-contain mb-4"
                onError={(e) => handleImageError(e, currentBrand.name)}
              />
              <h1 className="text-2xl font-bold text-slate-900">{currentBrand.name}</h1>
              <p className="text-slate-600 mt-2 max-w-2xl">{currentBrand.name} kalitesiyle sunulan tüm ürünlerimizi inceleyin.</p>
              <button onClick={clearFilters} className="mt-4 text-sm text-primary-600 hover:underline">
                 Tüm Markaları Göster
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {selectedCategory !== 'All' ? selectedCategory : 'Tüm Ürünler'}
              </h1>
              <p className="text-slate-600 text-sm max-w-2xl mx-auto">
                Toplam {filteredProducts.length} ürün listeleniyor.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            fullWidth 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showMobileFilters ? 'Filtreleri Gizle' : 'Filtreleri Göster'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          
          {/* Sidebar Filters */}
          <div className={`
            lg:w-64 flex-shrink-0 lg:block
            ${showMobileFilters ? 'block' : 'hidden'}
          `}>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 sticky top-24 space-y-8">
              
              {/* Markalar Filtresi */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <span>Markalar</span>
                  </div>
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                  <button
                    onClick={() => handleBrandChange('All')}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors flex items-center gap-2 ${
                      selectedBrandId === 'All' 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Tümü</span>
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => handleBrandChange(brand.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors flex items-center gap-3 ${
                        selectedBrandId === brand.id
                          ? 'bg-primary-50 text-primary-700 font-medium border border-primary-100'
                          : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <img 
                        src={brand.logoUrl} 
                        alt="" 
                        className="w-6 h-4 object-contain"
                        onError={(e) => handleImageError(e, brand.name)}
                      />
                      <span>{brand.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Kategoriler Filtresi */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Filter className="h-4 w-4" />
                    <span>Kategoriler</span>
                  </div>
                  {(selectedCategory !== 'All' || selectedBrandId !== 'All') && (
                    <button 
                      onClick={clearFilters}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Temizle
                    </button>
                  )}
                </div>
                
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors ${
                      selectedCategory === 'All' 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Tümü
                  </button>
                  {(Object.values(ProductCategory) as string[]).filter(c => c !== ProductCategory.ALL).map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category as ProductCategory)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => {
                const brandName = getBrandName(product.brandId) || '';
                return (
                  <Link 
                    key={product.id} 
                    to={`/urun/${product.id}`}
                    className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                  >
                    {/* Görsel alanı */}
                    <div className="aspect-[4/4] bg-white p-4 relative overflow-hidden flex items-center justify-center">
                      
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* İçerik alanı */}
                    <div className="p-3 flex flex-col flex-1 border-t border-slate-50">
                      <div className="mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          {brandName}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug min-h-[2.5em] group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg border border-dashed border-slate-300">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <X className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-slate-900 font-medium mb-1">Ürün Bulunamadı</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Bu filtrelemeye uygun ürün bulunmamaktadır.
                </p>
                <Button variant="outline" onClick={clearFilters}>Tüm Ürünleri Göster</Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Catalog;
