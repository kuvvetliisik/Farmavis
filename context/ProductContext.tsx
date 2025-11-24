
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Product, Brand, CompanyInfo } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS, BRANDS as DEFAULT_BRANDS, COMPANY_INFO as DEFAULT_COMPANY_INFO } from '../constants';

interface ProductContextType {
  products: Product[];
  brands: Brand[];
  companyInfo: CompanyInfo;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  // Brand Actions
  addBrand: (brand: Brand) => void;
  updateBrand: (brand: Brand) => void;
  deleteBrand: (id: string) => void;
  // Company Actions
  updateCompanyInfo: (info: CompanyInfo) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(DEFAULT_COMPANY_INFO);
  const [isLoaded, setIsLoaded] = useState(false);

  // Uygulama açıldığında LocalStorage'dan veriyi çek
  useEffect(() => {
    // Load Products
    const storedProducts = localStorage.getItem('medico_products');
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        console.error("Ürün veri okuma hatası", e);
        setProducts(DEFAULT_PRODUCTS);
      }
    } else {
      setProducts(DEFAULT_PRODUCTS);
    }

    // Load Brands
    const storedBrands = localStorage.getItem('medico_brands');
    if (storedBrands) {
      try {
        setBrands(JSON.parse(storedBrands));
      } catch (e) {
        console.error("Marka veri okuma hatası", e);
        setBrands(DEFAULT_BRANDS);
      }
    } else {
      setBrands(DEFAULT_BRANDS);
    }

    // Load Company Info
    const storedCompany = localStorage.getItem('medico_company');
    if (storedCompany) {
       try {
         setCompanyInfo(JSON.parse(storedCompany));
       } catch (e) {
         console.error("Şirket veri okuma hatası", e);
         setCompanyInfo(DEFAULT_COMPANY_INFO);
       }
    } else {
      setCompanyInfo(DEFAULT_COMPANY_INFO);
    }

    setIsLoaded(true);
  }, []);

  // Veriler her değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('medico_products', JSON.stringify(products));
      } catch (e) {
        console.error("LocalStorage Kotası Doldu (Ürünler)", e);
        alert("Hafıza doldu! Lütfen bazı ürünleri silin veya daha küçük görseller kullanın.");
      }
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('medico_brands', JSON.stringify(brands));
      } catch (e) {
        console.error("LocalStorage Kotası Doldu (Markalar)", e);
      }
    }
  }, [brands, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('medico_company', JSON.stringify(companyInfo));
      } catch (e) {
        console.error("Şirket bilgisi kaydedilemedi", e);
      }
    }
  }, [companyInfo, isLoaded]);

  // Product Actions
  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  // Brand Actions
  const addBrand = (newBrand: Brand) => {
    setBrands(prev => [...prev, newBrand]);
  };

  const updateBrand = (updatedBrand: Brand) => {
    setBrands(prev => prev.map(b => b.id === updatedBrand.id ? updatedBrand : b));
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(b => b.id !== id));
  };

  // Company Actions
  const updateCompanyInfo = (info: CompanyInfo) => {
    setCompanyInfo(info);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <ProductContext.Provider value={{ 
      products, 
      brands,
      companyInfo,
      addProduct, 
      updateProduct, 
      deleteProduct, 
      getProductById,
      addBrand,
      updateBrand,
      deleteBrand,
      updateCompanyInfo
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};