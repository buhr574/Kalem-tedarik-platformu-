import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import PasswordStrength from "../../components/forms/PasswordStrength";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Real-time validation
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          newErrors.fullName = "Tam isim gereklidir";
        } else if (value.trim().length < 2) {
          newErrors.fullName = "İsim en az 2 karakter olmalıdır";
        } else if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(value.trim())) {
          newErrors.fullName = "İsim sadece harf içermelidir";
        } else {
          delete newErrors.fullName;
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "E-posta gereklidir";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Geçerli bir e-posta adresi giriniz";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ) {
          newErrors.email = "E-posta formatı geçersiz";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Şifre gereklidir";
        } else if (value.length < 8) {
          newErrors.password = "Şifre en az 8 karakter olmalıdır";
        } else {
          const checks = {
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            number: /[0-9]/.test(value),
            special: /[^a-zA-Z0-9]/.test(value),
          };

          const passedChecks = Object.values(checks).filter(Boolean).length;
          if (passedChecks < 3) {
            newErrors.password =
              "Şifre en az 3 farklı karakter türü içermelidir";
          } else {
            delete newErrors.password;
          }
        }
        break;

      case "passwordConfirm":
        if (!value) {
          newErrors.passwordConfirm = "Şifre tekrarı gereklidir";
        } else if (value !== formData.password) {
          newErrors.passwordConfirm = "Şifreler eşleşmiyor";
        } else {
          delete newErrors.passwordConfirm;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors = {};

    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      password: true,
      passwordConfirm: true,
    });

    // Validate all fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Tam isim gereklidir";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "İsim en az 2 karakter olmalıdır";
    } else if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "İsim sadece harf içermelidir";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "E-posta formatı geçersiz";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 8) {
      newErrors.password = "Şifre en az 8 karakter olmalıdır";
    } else {
      const checks = {
        lowercase: /[a-z]/.test(formData.password),
        uppercase: /[A-Z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        special: /[^a-zA-Z0-9]/.test(formData.password),
      };

      const passedChecks = Object.values(checks).filter(Boolean).length;
      if (passedChecks < 3) {
        newErrors.password = "Şifre en az 3 farklı karakter türü içermelidir";
      }
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "Şifre tekrarı gereklidir";
    } else if (formData.passwordConfirm !== formData.password) {
      newErrors.passwordConfirm = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
    setIsLoading(false);

    if (result.success) {
      navigate("/giris");
    } else {
      setErrors({ submit: result.error || "Kayıt başarısız" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative z-10 glass-strong p-8 w-full max-w-md animate-scale-in">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <span className="mr-2">←</span>
          <span>Geri</span>
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Kayıt Ol</h1>
        <p className="text-gray-400 mb-8">Yeni bir hesap oluşturun</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Tam İsim"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ad Soyad"
              error={touched.fullName ? errors.fullName : ""}
              required
            />
            {touched.fullName && !errors.fullName && formData.fullName && (
              <p className="mt-1 text-xs text-green-400 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Geçerli
              </p>
            )}
          </div>

          <div>
            <Input
              label="E-posta"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="ornek@sirket.com"
              error={touched.email ? errors.email : ""}
              required
            />
            {touched.email && !errors.email && formData.email && (
              <p className="mt-1 text-xs text-green-400 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Geçerli e-posta formatı
              </p>
            )}
          </div>

          <div>
            <Input
              label="Şifre"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              error={touched.password ? errors.password : ""}
              required
            />
            {formData.password && (
              <PasswordStrength password={formData.password} />
            )}
          </div>

          <div>
            <Input
              label="Şifre Tekrar"
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              error={touched.passwordConfirm ? errors.passwordConfirm : ""}
              required
            />
            {touched.passwordConfirm &&
              !errors.passwordConfirm &&
              formData.passwordConfirm &&
              formData.password === formData.passwordConfirm && (
                <p className="mt-1 text-xs text-green-400 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Şifreler eşleşiyor
                </p>
              )}
          </div>

          {errors.submit && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Oluşturuluyor..." : "Hesap Oluştur"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Zaten üye misiniz?{" "}
          <Link
            to="/giris"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
