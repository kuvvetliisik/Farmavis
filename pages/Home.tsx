
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import { COMPANY_INFO } from '../constants';
import { useProducts } from '../context/ProductContext';

const Home: React.FC = () => {
  const { products, brands } = useProducts();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  useEffect(() => {
    document.title = "Anasayfa | MedicoCore - Profesyonel Medikal Çözümler";
  }, []);

  const BLOG_POSTS = [
    {
      id: 1,
      title: "2024 Cilt Bakım Trendleri: Biyoteknoloji",
      excerpt: "Doğal içeriklerin bilimsel yöntemlerle güçlendirilmesi, bu yılın en önemli dermokozmetik trendi.",
      date: "15 Mart 2024",
      image: "https://picsum.photos/id/201/600/400"
    },
    {
      id: 2,
      title: "Kolajen Takviyesi Ne Zaman Kullanılmalı?",
      excerpt: "Yaşlanma karşıtı bakımda kolajenin rolü ve en etkili kullanım zamanlaması hakkında uzman görüşleri.",
      date: "02 Nisan 2024",
      image: "https://picsum.photos/id/302/600/400"
    },
    {
      id: 3,
      title: "Hassas Ciltler İçin Günlük Rutin Önerileri",
      excerpt: "Kızarıklık ve kuruluk problemi yaşayan ciltler için dermatolog onaylı basit ve etkili bakım adımları.",
      date: "10 Nisan 2024",
      image: "https://picsum.photos/id/403/600/400"
    }
  ];

  // Helper to find brand info from dynamic context
  const getBrand = (brandId: string) => brands.find(b => b.id === brandId);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    e.currentTarget.src = `https://placehold.co/300x150/ffffff/333333?text=${encodeURIComponent(name)}&font=roboto`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden">
        {/* Abstract Background Image */}
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            src="https://picsum.photos/id/20/1920/1080" 
            alt="Laboratory background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              {COMPANY_INFO.slogan}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Bilim ve doğanın mükemmel uyumuyla geliştirilen profesyonel çözümlerimizi keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/urunler">
                <Button className="h-12 px-8 text-base bg-primary-600 hover:bg-primary-500 border-none">
                  Markalarımızı Keşfet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Section (Updated: No Boxes) */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Güçlü Markalarımız</h2>
            <p className="text-slate-500 mt-2">Sektörün öncü markaları ile hizmetinizdeyiz.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {brands.map((brand) => (
              <Link 
                key={brand.id} 
                to={`/urunler?marka=${brand.id}`}
                className="group block p-4 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center"
              >
                <div className="h-20 w-full flex items-center justify-center mb-3">
                   <img 
                    src={brand.logoUrl} 
                    alt={brand.name} 
                    className="max-h-full max-w-full object-contain transition-all duration-500"
                    onError={(e) => handleImageError(e, brand.name)}
                   />
                </div>
                <span className="text-sm font-semibold text-slate-400 group-hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Öne Çıkan Ürünler</h2>
              <p className="mt-2 text-slate-600">En çok tercih edilen inovatif çözümlerimiz.</p>
            </div>
            <Link to="/urunler" className="hidden md:flex items-center text-primary-600 font-medium hover:text-primary-700 text-sm">
              Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => {
              const brand = getBrand(product.brandId);
              return (
                <Link 
                  key={product.id} 
                  to={`/urun/${product.id}`}
                  className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="aspect-[4/4] bg-white p-4 relative overflow-hidden flex items-center justify-center">
                    {/* Brand Logo on Card (Removed Box) */}
                    
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 border-t border-slate-50 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {brand && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{brand.name}</span>}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {product.shortDescription}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-8 md:hidden">
            <Link to="/urunler">
              <Button fullWidth variant="outline">Tüm Ürünleri Gör</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Blog / News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Sağlık ve Yaşam</h2>
            <p className="mt-2 text-slate-600">Uzmanlarımızdan son gelişmeler ve öneriler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl mb-4 h-48 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <BookOpen className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
