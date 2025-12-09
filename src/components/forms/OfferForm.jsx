import { useState, useEffect } from 'react'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import { useItems } from '../../context/ItemContext'

const OfferForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const { items } = useItems()
  const [formData, setFormData] = useState({
    itemId: initialData?.itemId || '',
    quantity: initialData?.quantity || 1,
    targetUnitPrice: initialData?.targetUnitPrice || 0,
    currency: initialData?.currency || 'TRY',
    description: initialData?.description || '',
  })
  const [errors, setErrors] = useState({})

  const itemOptions = items.map((item) => ({
    value: item.id,
    label: `${item.name} (${item.category})`,
  }))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'targetUnitPrice' ? parseFloat(value) || 0 : value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.itemId) {
      newErrors.itemId = 'Alım kalemi seçilmelidir'
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Miktar 0\'dan büyük olmalıdır'
    }

    if (formData.targetUnitPrice < 0) {
      newErrors.targetUnitPrice = 'Fiyat negatif olamaz'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const selectedItem = items.find((item) => item.id === parseInt(formData.itemId))
      onSubmit({
        ...formData,
        itemId: parseInt(formData.itemId),
        itemName: selectedItem?.name || '',
        itemImage: selectedItem?.image || '',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Select
        label="Alım Kalemi"
        name="itemId"
        value={formData.itemId}
        onChange={handleChange}
        options={itemOptions}
        placeholder="Seçiniz..."
        error={errors.itemId}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Miktar"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          error={errors.quantity}
          required
          min="1"
        />

        <div>
          <Input
            label="Hedef Birim Fiyat"
            type="number"
            name="targetUnitPrice"
            value={formData.targetUnitPrice}
            onChange={handleChange}
            error={errors.targetUnitPrice}
            required
            min="0"
            step="0.01"
          />
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-300 text-gray-600 dark:text-gray-300">Birim: {formData.currency}</p>
        </div>
      </div>

      <Textarea
        label="Açıklama / Notlar"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Örn: En geç haftaya teslim edilmeli."
        rows={4}
      />

      <div className="flex gap-4 justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Oluşturuluyor...' : initialData ? 'Güncelle' : 'Talebi Oluştur'}
        </Button>
      </div>
    </form>
  )
}

export default OfferForm



