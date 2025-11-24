
import { CompanyInfo, Product, ProductCategory, Brand } from './types';

export const COMPANY_INFO: CompanyInfo = {
  name: "Farmavis",
  logoUrl: "", // Başlangıçta boş, adminden yüklenecek
  slogan: "Sağlık & Kozmetik Ürünleri",
  address: "İkitelli OSB, Enco Plaza, Başakşehir, İstanbul",
  phone: "+90 212 555 01 99",
  email: "info@farmavis.com.tr",
  whatsapp: "+905551234567",
  aboutShort: "Farmavis, kişisel bakım, anne-bebek ve medikal ürünler alanında Türkiye'nin en köklü markalarını bünyesinde barındıran, kalite ve güven odaklı bir kuruluştur.",
  mission: "Tüketicilerimizin yaşam kalitesini artıran, cilde ve doğaya dost, ulaşılabilir ve yüksek standartlı ürünler sunmak.",
  vision: "Temsil ettiğimiz köklü markalarla global pazarda yenilikçi ve lider konumumuzu sürdürmek."
};

// Yeni Marka Listesi - Gerçek ve En Yakın Logo Adresleri
export const BRANDS: Brand[] = [
  {
    id: "brand-cire-aseptine",
    name: "Cire Aseptine",
    // Cire Aseptine Resmi Sitesi
    logoUrl: "https://www.cireaseptine.com/assets/img/logo.png" 
  },
  {
    id: "brand-bebedor",
    name: "Bebedor",
    // Bebedor Resmi Sitesi (WP Uploads)
    logoUrl: "https://www.bebedor.com.tr/wp-content/uploads/2021/09/bebedor-logo-1.png" 
  },
  {
    id: "brand-foot-doctor",
    name: "Foot Doctor",
    // Tibet A.Ş. veya alternatif kaynak
    logoUrl: "https://tibet.com.tr/images/project/foot-doctor.png" 
  },
  {
    id: "brand-ligorix",
    name: "Ligorix",
    // Ligorix Resmi Domain
    logoUrl: "https://ligorix.com/wp-content/uploads/2021/01/ligorix-logo-1.png"
  },
  {
    id: "brand-super82",
    name: "Süper82",
    // Pereja (Üretici) Sitesi
    logoUrl: "https://www.pereja.com.tr/images/project/super82.png" 
  }
];

// Markalara Uygun Örnek Ürünler
export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Cire Aseptine Soft Nemlendirici Bakım Kremi",
    brandId: "brand-cire-aseptine",
    category: ProductCategory.SKINCARE,
    shortDescription: "Papatya özlü formülü ile günlük yoğun nemlendirme.",
    fullDescription: "Cire Aseptine Soft, prebiyotik içeriği sayesinde cildin doğal florasını korumaya yardımcı olur. Papatya özleri ile cildi yatıştırır ve 24 saate kadar nem desteği sağlar. Hızlı emilen formülü yağlı his bırakmaz.",
    ingredients: ["Aqua", "Glycerin", "Chamomilla Recutita Flower Extract", "Prebiotics", "Vitamin E"],
    usage: "İhtiyaç duyduğunuz her an el, yüz ve vücudunuza masaj yaparak uygulayınız.",
    imageUrl: "https://picsum.photos/id/101/600/600",
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "Bebedor Geniş Ağızlı PP Biberon 250ml",
    brandId: "brand-bebedor",
    category: ProductCategory.BABY_KIDS,
    shortDescription: "Kolik önleyici hava sistemi ile konforlu beslenme.",
    fullDescription: "BPA içermeyen güvenli polipropilen (PP) malzemeden üretilmiştir. Özel tasarlanmış emzik ucu, anne göğsüne en yakın hissi vererek bebeğin doğal emme hareketini destekler. Gaz sancısını azaltmaya yardımcı hava valfi bulunur.",
    ingredients: ["Polipropilen (PP) Gövde", "Silikon Emzik", "BPA-Free"],
    usage: "İlk kullanımdan önce 5 dakika kaynar suda sterilize ediniz. Her kullanımdan sonra fırça ile temizleyiniz.",
    imageUrl: "https://picsum.photos/id/102/600/600",
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Foot Doctor Topuk Çatlak Kremi",
    brandId: "brand-foot-doctor",
    category: ProductCategory.PERSONAL_CARE,
    shortDescription: "Sertleşmiş ve çatlamış topuklar için onarıcı bakım.",
    fullDescription: "Foot Doctor, içeriğindeki üre ve panthenol sayesinde sertleşmiş topuk derisini yumuşatır. Düzenli kullanımda çatlak görünümünü azaltır ve cildin elastikiyetini geri kazanmasına yardımcı olur.",
    ingredients: ["Urea", "Panthenol", "Shea Butter", "Allantoin"],
    usage: "Temiz ve kuru ayak topuklarına sabah akşam dairesel hareketlerle uygulayınız. Gece yatmadan önce uygulanması tavsiye edilir.",
    imageUrl: "https://picsum.photos/id/103/600/600",
    isFeatured: true
  },
  {
    id: "prod-4",
    name: "Ligorix At Kestanesi Balsamı",
    brandId: "brand-ligorix",
    category: ProductCategory.MEDICAL,
    shortDescription: "Yorgun bacaklar için rahatlatıcı masaj jeli.",
    fullDescription: "Ligorix, yüksek oranda at kestanesi özü, sarmaşık ve nane yağı içerir. Günün yorgunluğunu atmak, vücudu rahatlatmak ve ferahlık hissi vermek için özel olarak formüle edilmiştir. Kan dolaşımını destekleyici etkisiyle bilinir.",
    ingredients: ["Aesculus Hippocastanum Extract", "Mentha Piperita Oil", "Hedera Helix Extract"],
    usage: "İstenilen bölgeye yeterli miktarda jeli sürün ve emilene kadar masaj yapın. Günde 2 kez uygulanabilir.",
    imageUrl: "https://picsum.photos/id/104/600/600",
    isFeatured: false
  },
  {
    id: "prod-5",
    name: "Süper82 Klasik Limon Kolonyası 1Lt",
    brandId: "brand-super82",
    category: ProductCategory.PERSONAL_CARE,
    shortDescription: "Geleneksel ferahlık, 80 derece alkol oranı.",
    fullDescription: "Süper82, yılların değişmeyen formülüyle gerçek limon ferahlığını evinize getirir. 80 derece alkol oranı ile etkili hijyen sağlar. Misafirlerinize ikram edebileceğiniz nostaljik ve kalıcı bir koku deneyimi sunar.",
    ingredients: ["Alcohol Denat (80 Derece)", "Aqua", "Parfum", "Citral", "Limonene"],
    usage: "Avucunuza dökerek el ve yüz bölgesine uygulayınız. Serin yerde saklayınız.",
    imageUrl: "https://picsum.photos/id/106/600/600",
    isFeatured: true
  },
  {
    id: "prod-6",
    name: "Cire Aseptine İsviçre Formülü El Kremi",
    brandId: "brand-cire-aseptine",
    category: ProductCategory.SKINCARE,
    shortDescription: "Soğuk havalara karşı yoğun koruma kalkanı.",
    fullDescription: "Kış aylarında kuruyan ve çatlayan eller için özel İsviçre formülü. İçerdiği E vitamini sayesinde cildi besler ve dış etkenlere karşı koruyucu bir bariyer oluşturur.",
    ingredients: ["Paraffinum Liquidum", "Cera Alba", "Vitamin E"],
    usage: "Ellerinize fındık büyüklüğünde alıp iyice yediriniz.",
    imageUrl: "https://picsum.photos/id/107/600/600",
    isFeatured: false
  }
];