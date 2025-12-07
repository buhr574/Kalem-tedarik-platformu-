import { useState, useEffect } from 'react'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

const ItemForm = ({ onSubmit, initialData = null, isLoading = false, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    unit: initialData?.unit || 'Adet',
    description: initialData?.description || '',
    image: initialData?.image || '',
  })
  const [errors, setErrors] = useState({})

  const unitOptions = ['Adet', 'Kutu', 'Litre', 'Kg', 'Metre', 'Paket']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Kalem adı gereklidir'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Kategori gereklidir'
    }

    if (!formData.unit) {
      newErrors.unit = 'Birim seçilmelidir'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

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
          <label className="block text-sm font-medium text-gray-300 mb-2">
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
              <option key={unit} value={unit} className="bg-slate-800 text-white">
                {unit}
              </option>
            ))}
          </select>
          {errors.unit && (
            <p className="mt-1 text-sm text-red-400">{errors.unit}</p>
          )}
        </div>

        <Input
          label="Ürün Görseli (URL)"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      {formData.image && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Görsel Önizleme
          </label>
          <img
            src={formData.image}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-white/20"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
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
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Kaydediliyor...' : initialData ? 'Güncelle' : 'Oluştur'}
        </Button>
      </div>
    </form>
  )
}

export default ItemForm

