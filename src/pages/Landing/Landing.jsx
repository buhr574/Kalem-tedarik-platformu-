import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full">
        {/* Tagline */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="glass-strong px-5 py-2.5 rounded-full flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-sm font-semibold">
              Yeni Nesil Tedarik Yönetimi
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 leading-tight animate-fade-in">
          Online Fiyat Teklifi Toplama Platformu
        </h1>

        {/* Subtitle */}
        <p className="text-gray-200 text-lg md:text-xl text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          Mail veya Telefon ile günlerce fiyat teklifi toplamaya çalışmaktan
          kurtulun.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/kayit">
            <Button
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
            >
              Hemen Başla
              <span>→</span>
            </Button>
          </Link>
          <Link to="/giris">
            <Button variant="secondary" size="lg">
              Demo Görüntüle
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="glass-strong text-center hover:scale-105 transition-transform duration-500">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                <svg
                  className="w-10 h-10 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Hızlı Teklif</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Saniyeler içinde yeni alım talebi oluşturun ve tedarikçilerden
              teklif bekleyin.
            </p>
          </div>

          <div className="glass-strong text-center hover:scale-105 transition-transform duration-500">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <svg
                  className="w-10 h-10 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Güvenli Onay</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Gelen teklifleri inceleyin, karşılaştırın ve tek tıkla güvenle
              onaylayın veya reddedin.
            </p>
          </div>

          <div className="glass-strong text-center hover:scale-105 transition-transform duration-500">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <svg
                  className="w-10 h-10 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Global Erişim</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Farklı para birimleri ve birim türleri ile uluslararası
              standartlarda çalışın.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 text-center text-gray-400 text-sm">
        <p>© 2024 Tedarik Platformu. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default Landing;
