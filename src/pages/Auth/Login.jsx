import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçersiz e-posta formatı";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const result = await login(formData.email, formData.password);
    setIsLoading(false);

    if (result.success) {
      navigate("/panel/teklifler");
    } else {
      setErrors({ submit: result.error || "Giriş başarısız" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-strong rounded-2xl p-8 w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <span className="mr-2">←</span>
          <span>Geri</span>
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Giriş Yap</h1>
        <p className="text-gray-400 mb-8">Hesabınıza giriş yapın</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="E-posta"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ornek@sirket.com"
            error={errors.email}
            required
          />

          <Input
            label="Şifre"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
            required
          />

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
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Hesabınız yok mu?{" "}
          <Link
            to="/kayit"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Kayıt Ol
          </Link>
        </p>

        <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
          <p className="text-sm text-blue-300">
            <strong>Demo Giriş:</strong> demo@tedarik.com / demo123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
