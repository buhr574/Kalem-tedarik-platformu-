# Tedarik Platformu - Online Fiyat Teklifi Toplama Platformu

Modern, kullanıcı dostu bir B2B tedarik ve teklif yönetim platformu. Şirketlerin alım kalemlerini yönetebileceği, teklif talepleri oluşturabileceği ve gelen teklifleri onaylayabileceği kapsamlı bir web uygulaması.

##  Özellikler

### Genel Özellikler
-  **Glassmorphism Tasarım**: Modern ve şık kullanıcı arayüzü
-  **Tam Responsive**: Mobil, tablet ve masaüstü uyumlu
-  **Dark Theme**: Göz yormayan karanlık tema
-  **Hızlı ve Performanslı**: Optimize edilmiş React yapısı

### Kullanıcı Özellikleri
-  **Kimlik Doğrulama**: Güvenli giriş ve kayıt sistemi
-  **Dashboard**: Genel bakış ve istatistikler
-  **Teklif Yönetimi**: 
  - Teklif listeleme ve filtreleme
  - Teklif detay görüntüleme
  - Yeni teklif talebi oluşturma
  - Teklif onaylama/reddetme
-  **Alım Kalemleri Yönetimi**:
  - Kalem listeleme
  - Yeni kalem ekleme
  - Kalem düzenleme
  - Kalem silme

##  Teknoloji Stack

- **React 18.2** - UI kütüphanesi
- **Vite 5.0** - Build tool ve dev server
- **React Router 6.20** - Routing
- **Tailwind CSS 3.3** - Styling
- **Context API** - State management
- **Mock API** - Backend simülasyonu

##  Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── ui/             # Temel UI bileşenleri (Button, Input, Modal, Card)
│   ├── cards/          # Kart bileşenleri (OfferCard, ItemCard)
│   ├── forms/          # Form bileşenleri (OfferForm, ItemForm)
│   └── auth/           # Auth bileşenleri (ProtectedRoute)
├── context/            # Context API providers
│   ├── AuthContext.jsx
│   ├── OfferContext.jsx
│   └── ItemContext.jsx
├── layouts/            # Layout bileşenleri
│   ├── PublicLayout.jsx
│   └── PanelLayout.jsx
├── pages/              # Sayfa bileşenleri
│   ├── Landing/        # Anasayfa
│   ├── Auth/           # Giriş/Kayıt
│   ├── Offers/         # Teklif sayfaları
│   └── Items/          # Alım kalemleri sayfası
├── services/            # API servisleri
│   └── api/
│       ├── auth.js
│       ├── offers.js
│       └── items.js
├── styles/             # CSS dosyaları
│   └── glass.css       # Glassmorphism stilleri
├── App.jsx             # Ana uygulama bileşeni
├── main.jsx            # Entry point
└── index.css           # Global stiller
```

##  Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 16+ 
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

3. **Tarayıcıda açın:**
```
http://localhost:5173
```

### Build

Production build oluşturmak için:
```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulacaktır.

### Preview

Build'i önizlemek için:
```bash
npm run preview
```

##  Kullanım

### Demo Giriş Bilgileri
- **E-posta:** demo@tedarik.com
- **Şifre:** demo123

### Yeni Hesap Oluşturma
1. Ana sayfada "Hemen Başla" butonuna tıklayın
2. Kayıt formunu doldurun
3. Hesabınız otomatik olarak oluşturulur ve giriş yapılır

### Teklif Oluşturma
1. Panel'de "Yeni Teklif" menüsüne gidin
2. Alım kalemi seçin
3. Miktar ve hedef fiyat bilgilerini girin
4. Açıklama ekleyin (opsiyonel)
5. "Talebi Oluştur" butonuna tıklayın

### Alım Kalemi Ekleme
1. "Alım Kalemleri" menüsüne gidin
2. "+ Yeni Kalem Ekle" butonuna tıklayın
3. Formu doldurun
4. "Oluştur" butonuna tıklayın

##  Tasarım Sistemi

### Glassmorphism
Proje, modern glassmorphism tasarım prensiplerini kullanır:
- Yarı saydam arka planlar
- Backdrop blur efektleri
- Yumuşak gölgeler ve kenarlıklar

### Renk Paleti
- **Primary:** Mavi-Mor gradient (#6366f1 - #8b5cf6)
- **Success:** Yeşil (#10b981)
- **Danger:** Kırmızı (#ef4444)
- **Warning:** Sarı (#f59e0b)

##  Mock API

Proje, gerçek bir backend olmadan çalışmak için mock API servisleri kullanır. Tüm veriler bellekte saklanır ve sayfa yenilendiğinde sıfırlanır.

### API Servisleri
- `auth.js` - Kimlik doğrulama
- `offers.js` - Teklif yönetimi
- `items.js` - Alım kalemleri yönetimi

##  Güvenlik

- Form validasyonları
- Protected routes
- XSS koruması
- Güvenli şifre gereksinimleri

##  Geliştirme Notları
- Tüm state yönetimi Context API ile yapılmaktadır
- Bileşenler Single Responsibility prensibine uygundur
- Kod ESLint kurallarına uygundur
- Performans optimizasyonları uygulanmıştır

## Lisans

Bu proje test amaçlı geliştirilmiştir.

##  Geliştirici Notları

- Proje tamamen frontend odaklıdır
- Backend entegrasyonu için API servisleri değiştirilebilir
- Mock data gerçek API'ye kolayca dönüştürülebilir
- Tüm bileşenler modüler ve yeniden kullanılabilir yapıdadır

---

**Not:** Bu proje, modern React geliştirme pratiklerini ve kullanıcı deneyimi odaklı tasarım anlayışını göstermek için geliştirilmiştir.

