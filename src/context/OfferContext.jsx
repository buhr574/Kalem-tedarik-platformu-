import { createContext, useContext, useState, useEffect } from 'react'
import { offerService } from '../services/api/offers'

const OfferContext = createContext(null)

export const useOffers = () => {
  const context = useContext(OfferContext)
  if (!context) {
    throw new Error('useOffers must be used within OfferProvider')
  }
  return context
}

export const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await offerService.getAll()
      setOffers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createOffer = async (offerData) => {
    setIsLoading(true)
    setError(null)
    try {
      const newOffer = await offerService.create(offerData)
      setOffers((prev) => [newOffer, ...prev])
      return { success: true, data: newOffer }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const approveOffer = async (id) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedOffer = await offerService.approve(id)
      setOffers((prev) =>
        prev.map((offer) => (offer.id === id ? updatedOffer : offer))
      )
      return { success: true, data: updatedOffer }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const rejectOffer = async (id) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedOffer = await offerService.reject(id)
      setOffers((prev) =>
        prev.map((offer) => (offer.id === id ? updatedOffer : offer))
      )
      return { success: true, data: updatedOffer }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const getOfferById = (id) => {
    return offers.find((offer) => offer.id === id)
  }

  const value = {
    offers,
    isLoading,
    error,
    createOffer,
    approveOffer,
    rejectOffer,
    getOfferById,
    loadOffers,
  }

  return <OfferContext.Provider value={value}>{children}</OfferContext.Provider>
}



