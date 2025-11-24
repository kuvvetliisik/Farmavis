export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Product {
  id: string;
  name: string;
  brandId: string; // Yeni: Ürünün ait olduğu marka
  category: ProductCategory;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  usage: string;
  imageUrl: string;
  isFeatured: boolean;
}

export enum ProductCategory {
  ALL = 'Tümü',
  SKINCARE = 'Cilt Bakımı',
  SUPPLEMENTS = 'Vitaminler & Takviyeler',
  MEDICAL = 'Medikal Ürünler',
  PERSONAL_CARE = 'Kişisel Bakım',
  BABY_KIDS = 'Bebek & Çocuk'
}

export interface CompanyInfo {
  name: string;
  logoUrl: string; // Yeni: Logo URL
  slogan: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  aboutShort: string;
  mission: string;
  vision: string;
}