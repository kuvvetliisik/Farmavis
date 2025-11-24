
import React, { useState, useRef, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product, ProductCategory, Brand } from '../types';
import Button from '../components/Button';
import { Trash2, Edit, Plus, X, Save, Lock, Upload, Image as ImageIcon, LayoutGrid, Tag, Settings } from 'lucide-react';

// Helper: Resize and Compress Image to avoid LocalStorage overflow
const processImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Max width/height 800px preserves quality but reduces size significantly
        const MAX_SIZE = 800; 
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to PNG to preserve transparency (logo support)
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const Admin: React.FC = () => {
  const { 
    products, addProduct, updateProduct, deleteProduct,
    brands, addBrand, updateBrand, deleteBrand,
    companyInfo, updateCompanyInfo
  } = useProducts();
  
  const [activeTab, setActiveTab] = useState<'products' | 'brands' | 'settings'>('products');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // --- Product Form State ---
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Product | null>(null);

  // --- Brand Form State ---
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [brandForm, setBrandForm] = useState<Brand | null>(null);

  // --- Company Settings State ---
  const [settingsForm, setSettingsForm] = useState(companyInfo);

  useEffect(() => {
    setSettingsForm(companyInfo);
  }, [companyInfo]);

  // File Input Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Hatalı şifre! (İpucu: admin)');
    }
  };

  // --- Image Upload Handler ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'product' | 'brand' | 'company') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64Image = await processImage(file);
      
      if (target === 'product' && productForm) {
        setProductForm({ ...productForm, imageUrl: base64Image });
      } else if (target === 'brand' && brandForm) {
        setBrandForm({ ...brandForm, logoUrl: base64Image });
      } else if (target === 'company') {
        setSettingsForm({ ...settingsForm, logoUrl: base64Image });
      }
    } catch (error) {
      console.error("Resim işleme hatası", error);
      alert("Resim yüklenirken bir hata oluştu.");
    }
  };

  // --- Product Handlers ---
  const handleProductEdit = (product?: Product) => {
    if (product) {
      setProductForm({ ...product });
    } else {
      setProductForm({
        id: `prod-${Date.now()}`,
        name: '',
        brandId: brands.length > 0 ? brands[0].id : '',
        category: ProductCategory.SKINCARE,
        shortDescription: '',
        fullDescription: '',
        ingredients: [],
        usage: '',
        imageUrl: '',
        isFeatured: false
      });
    }
    setIsEditingProduct(true);
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm) return;
    
    if (!productForm.imageUrl) {
      alert("Lütfen bir ürün görseli yükleyin.");
      return;
    }

    const exists = products.some(p => p.id === productForm.id);
    if (exists) updateProduct(productForm);
    else addProduct(productForm);

    setIsEditingProduct(false);
    setProductForm(null);
  };

  const deleteProductConfirm = (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) deleteProduct(id);
  };

  // --- Brand Handlers ---
  const handleBrandEdit = (brand?: Brand) => {
    if (brand) {
      setBrandForm({ ...brand });
    } else {
      setBrandForm({
        id: `brand-${Date.now()}`,
        name: '',
        logoUrl: ''
      });
    }
    setIsEditingBrand(true);
  };

  const saveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm) return;

    if (!brandForm.logoUrl) {
      alert("Lütfen bir marka logosu yükleyin.");
      return;
    }

    const exists = brands.some(b => b.id === brandForm.id);
    if (exists) updateBrand(brandForm);
    else addBrand(brandForm);

    setIsEditingBrand(false);
    setBrandForm(null);
  };

  const deleteBrandConfirm = (id: string) => {
    if (products.some(p => p.brandId === id)) {
      alert("Bu markaya ait ürünler var! Önce ürünleri silmelisiniz.");
      return;
    }
    if (window.confirm('Bu markayı silmek istediğinize emin misiniz?')) deleteBrand(id);
  };

  // --- Settings Handler ---
  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(settingsForm);
    alert('Ayarlar kaydedildi!');
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary-100 rounded-full">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">Yönetici Girişi</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Şifre (admin)"
            />
            <Button fullWidth type="submit">Giriş Yap</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-900">Yönetim Paneli</h1>
          
          {/* Tab Switcher */}
          <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-all ${
                activeTab === 'products' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Ürünler
            </button>
            <button
              onClick={() => setActiveTab('brands')}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-all ${
                activeTab === 'brands' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tag className="w-4 h-4" /> Markalar
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-all ${
                activeTab === 'settings' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" /> Genel Ayarlar
            </button>
          </div>
        </div>

        {/* --- PRODUCTS TAB CONTENT --- */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={() => handleProductEdit()} className="gap-2">
                <Plus className="w-4 h-4" /> Yeni Ürün Ekle
              </Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Görsel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Ürün</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Detay</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">İşlem</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt="" className="h-12 w-12 rounded-lg object-cover border border-slate-200" />
                        ) : (
                          <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center"><ImageIcon className="w-5 h-5 text-slate-400" /></div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{product.name}</div>
                        {product.isFeatured && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Öne Çıkan</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                         {brands.find(b => b.id === product.brandId)?.name || 'Markasız'} <br/>
                         <span className="text-xs opacity-75">{product.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleProductEdit(product)} className="text-primary-600 hover:text-primary-900 mr-4"><Edit className="w-5 h-5" /></button>
                        <button onClick={() => deleteProductConfirm(product.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- BRANDS TAB CONTENT --- */}
        {activeTab === 'brands' && (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={() => handleBrandEdit()} className="gap-2">
                <Plus className="w-4 h-4" /> Yeni Marka Ekle
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.map((brand) => (
                <div key={brand.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-24 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-2">
                       {brand.logoUrl ? (
                         <img src={brand.logoUrl} alt="" className="max-w-full max-h-full object-contain" />
                       ) : (
                         <span className="text-xs text-slate-400">Logo Yok</span>
                       )}
                    </div>
                    <span className="font-bold text-slate-700">{brand.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleBrandEdit(brand)} className="p-2 hover:bg-primary-50 text-primary-600 rounded-full"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => deleteBrandConfirm(brand.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-full"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SETTINGS TAB CONTENT --- */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
             <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
               <h2 className="text-xl font-bold text-slate-900 mb-6">Firma Bilgileri & Logo</h2>
               <form onSubmit={saveSettings} className="space-y-6">
                 
                 {/* Main Logo Upload */}
                 <div className="flex justify-center">
                   <div className="text-center w-full">
                     <label className="block text-sm font-bold text-slate-700 mb-2">Firma Logosu (Sol Üst Köşe)</label>
                     <div className="h-40 w-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        {settingsForm.logoUrl ? (
                          <img src={settingsForm.logoUrl} className="h-full object-contain p-4" alt="Company Logo" />
                        ) : (
                          <div className="text-slate-400 flex flex-col items-center">
                            <Upload className="w-8 h-8 mb-2" />
                            <span className="text-xs">Logo Yükle (PNG Önerilir)</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium">Logoyu Değiştir</span>
                        </div>
                     </div>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'company')}
                     />
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Firma Adı</label>
                   <input type="text" value={settingsForm.name} onChange={e => setSettingsForm({...settingsForm, name: e.target.value})} className="w-full border rounded p-2" />
                 </div>

                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Slogan</label>
                   <input type="text" value={settingsForm.slogan} onChange={e => setSettingsForm({...settingsForm, slogan: e.target.value})} className="w-full border rounded p-2" />
                 </div>

                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">E-Posta</label>
                   <input type="text" value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} className="w-full border rounded p-2" />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Telefon</label>
                   <input type="text" value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} className="w-full border rounded p-2" />
                 </div>

                 <div className="flex justify-end pt-4">
                    <Button type="submit" className="gap-2"><Save className="w-4 h-4" /> Ayarları Kaydet</Button>
                 </div>
               </form>
             </div>
          </div>
        )}

        {/* --- PRODUCT EDIT MODAL --- */}
        {isEditingProduct && productForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Ürün Düzenle</h2>
                <button onClick={() => setIsEditingProduct(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={saveProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                
                {/* Image Upload Area */}
                <div className="flex justify-center">
                   <div className="text-center">
                     <div className="h-40 w-40 mx-auto bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        {productForm.imageUrl ? (
                          <img src={productForm.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <div className="text-slate-400 flex flex-col items-center">
                            <Upload className="w-8 h-8 mb-2" />
                            <span className="text-xs">Görsel Yükle</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium">Değiştir</span>
                        </div>
                     </div>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'product')}
                     />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ürün Adı</label>
                    <input required type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full border rounded p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Marka</label>
                    <select value={productForm.brandId} onChange={e => setProductForm({...productForm, brandId: e.target.value})} className="w-full border rounded p-2 text-sm">
                      {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                  <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value as ProductCategory})} className="w-full border rounded p-2 text-sm">
                    {(Object.values(ProductCategory) as string[]).filter(c => c !== 'Tümü').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kısa Açıklama</label>
                  <input required type="text" value={productForm.shortDescription} onChange={e => setProductForm({...productForm, shortDescription: e.target.value})} className="w-full border rounded p-2 text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detaylı Açıklama</label>
                  <textarea rows={3} value={productForm.fullDescription} onChange={e => setProductForm({...productForm, fullDescription: e.target.value})} className="w-full border rounded p-2 text-sm" />
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1">İçindekiler (Virgülle ayırın)</label>
                   <input type="text" value={productForm.ingredients.join(', ')} onChange={e => setProductForm({...productForm, ingredients: e.target.value.split(',').map(s => s.trim())})} className="w-full border rounded p-2 text-sm" />
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1">Kullanım Şekli</label>
                   <input type="text" value={productForm.usage} onChange={e => setProductForm({...productForm, usage: e.target.value})} className="w-full border rounded p-2 text-sm" />
                </div>

                <div className="flex items-center gap-2 pt-2">
                   <input type="checkbox" checked={productForm.isFeatured} onChange={e => setProductForm({...productForm, isFeatured: e.target.checked})} id="isFeatured" />
                   <label htmlFor="isFeatured" className="text-sm text-slate-700">Anasayfada Öne Çıkar</label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsEditingProduct(false)} type="button">İptal</Button>
                  <Button type="submit">Kaydet</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- BRAND EDIT MODAL --- */}
        {isEditingBrand && brandForm && (
           <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Marka Düzenle</h2>
                  <button onClick={() => setIsEditingBrand(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={saveBrand} className="p-6 space-y-6">
                   {/* Logo Upload */}
                   <div className="flex justify-center">
                     <div className="text-center w-full">
                       <div className="h-32 w-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          {brandForm.logoUrl ? (
                            <img src={brandForm.logoUrl} className="h-full object-contain p-2" alt="Preview" />
                          ) : (
                            <div className="text-slate-400 flex flex-col items-center">
                              <Upload className="w-8 h-8 mb-2" />
                              <span className="text-xs">Logo Yükle</span>
                            </div>
                          )}
                       </div>
                       <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, 'brand')}
                       />
                     </div>
                   </div>

                   <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Marka Adı</label>
                      <input required type="text" value={brandForm.name} onChange={e => setBrandForm({...brandForm, name: e.target.value})} className="w-full border rounded p-2 text-sm" />
                   </div>

                   <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsEditingBrand(false)} type="button">İptal</Button>
                    <Button type="submit">Kaydet</Button>
                   </div>
                </form>
             </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default Admin;