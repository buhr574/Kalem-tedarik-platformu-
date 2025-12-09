import { useNavigate } from 'react-router-dom'
import { useOffers } from '../../context/OfferContext'
import { useState } from 'react'
import OfferForm from '../../components/forms/OfferForm'
import Button from '../../components/ui/Button'

const OfferCreate = () => {
  const navigate = useNavigate()
  const { createOffer } = useOffers()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    setSuccessMessage(null)

    const result = await createOffer(formData)
    setIsLoading(false)

    if (result.success) {
      setSuccessMessage('Teklif talebi başarıyla oluşturuldu!')
      setTimeout(() => {
        navigate('/panel/teklifler')
      }, 1500)
    } else {
      setSuccessMessage(result.error || 'Bir hata oluştu')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/panel/teklifler')}>
            ← Geri
          </Button>
          <h1 className="text-3xl font-bold text-white">Yeni Teklif Talebi</h1>
        </div>
      </div>

      {successMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            successMessage.includes('başarıyla')
              ? 'bg-green-500/20 border border-green-500/50 text-green-300'
              : 'bg-red-500/20 border border-red-500/50 text-red-300'
          }`}
        >
          {successMessage}
        </div>
      )}

      <div className="glass-card max-w-3xl">
        <OfferForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default OfferCreate



