import { createContext, useContext, useState, useEffect } from 'react'
import { itemService } from '../services/api/items'

const ItemContext = createContext(null)

export const useItems = () => {
  const context = useContext(ItemContext)
  if (!context) {
    throw new Error('useItems must be used within ItemProvider')
  }
  return context
}

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await itemService.getAll()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createItem = async (itemData) => {
    setIsLoading(true)
    setError(null)
    try {
      const newItem = await itemService.create(itemData)
      setItems((prev) => [newItem, ...prev])
      return { success: true, data: newItem }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const updateItem = async (id, itemData) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedItem = await itemService.update(id, itemData)
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      )
      return { success: true, data: updatedItem }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteItem = async (id) => {
    setIsLoading(true)
    setError(null)
    try {
      await itemService.delete(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const getItemById = (id) => {
    return items.find((item) => item.id === id)
  }

  const value = {
    items,
    isLoading,
    error,
    createItem,
    updateItem,
    deleteItem,
    getItemById,
    loadItems,
  }

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
}





