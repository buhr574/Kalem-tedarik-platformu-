import { useState, useRef } from "react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

const ItemForm = ({
  onSubmit,
  initialData = null,
  isLoading = false,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    unit: initialData?.unit || "Adet",
    description: initialData?.description || "",
    image: initialData?.image || "",
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [imageSource, setImageSource] = useState(
    initialData?.image ? "url" : "file"
  ); // 'url' or 'file'
  const fileInputRef = useRef(null);

  const unitOptions = ["Adet", "Kutu", "Litre", "Kg", "Metre", "Paket"];

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

    // Update preview if image URL changes
    if (name === "image" && imageSource === "url") {
      setImagePreview(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Lütfen geçerli bir görsel dosyası seçin",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Dosya boyutu 5MB'dan küçük olmalıdır",
        }));
        return;
      }

      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData((prev) => ({
          ...prev,
          image: base64String,
        }));
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSourceChange = (source) => {
    setImageSource(source);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Kalem adı gereklidir";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Kategori gereklidir";
    }

    if (!formData.unit) {
      newErrors.unit = "Birim seçilmelidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Kalem Adı"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Örn: Dizüstü Bilgisayar"
          error={errors.name}
          required
        />

        <Input
          label="Kategori"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Örn: Elektronik"
          error={errors.category}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 mb-2">
            Birim <span className="text-red-400">*</span>
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="glass-input w-full"
            required
          >
            {unitOptions.map((unit) => (
              <option
                key={unit}
                value={unit}
                className="bg-slate-800 text-white"
              >
                {unit}
              </option>
            ))}
          </select>
          {errors.unit && (
            <p className="mt-1 text-sm text-red-400">{errors.unit}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 mb-2">
            Ürün Görseli
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleImageSourceChange("url")}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  imageSource === "url"
                    ? "bg-blue-600 text-white border border-blue-500/30"
                    : "glass-button text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 border border-white/10"
                }`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => handleImageSourceChange("file")}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  imageSource === "file"
                    ? "bg-blue-600 text-white border border-blue-500/30"
                    : "glass-button text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 border border-white/10"
                }`}
              >
                Dosya
              </button>
            </div>

            {imageSource === "url" ? (
              <Input
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                error={errors.image}
              />
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="glass-button cursor-pointer inline-flex items-center gap-2 w-full justify-center py-3"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  Görsel Seç
                </label>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-400">{errors.image}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {imagePreview && (
        <div>
          <label className="block text-sm font-medium text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 mb-2">
            Görsel Önizleme
          </label>
          <div
            className="relative w-full bg-black/20 rounded-lg border border-white/10 overflow-hidden flex items-center justify-center"
            style={{ minHeight: "300px" }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-[400px] w-auto h-auto object-contain rounded-lg"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {imageSource === "file" && (
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setFormData((prev) => ({ ...prev, image: "" }));
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-lg transition-colors backdrop-blur-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      <Textarea
        label="Açıklama"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Ürün açıklaması..."
        rows={3}
      />

      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            İptal
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Kaydediliyor..." : initialData ? "Güncelle" : "Oluştur"}
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;
