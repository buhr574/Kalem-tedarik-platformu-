// Mock items database
let mockItems = [
  {
    id: 1,
    name: 'Ergonomik Ofis Sandalyesi',
    category: 'Mobilya',
    unit: 'Adet',
    description: 'Fileli, ayarlanabilir ofis sandalyesi',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
  },
  {
    id: 2,
    name: 'Dizüstü Bilgisayar i7',
    category: 'Elektronik',
    unit: 'Adet',
    description: '16GB RAM, 512GB SSD İş Bilgisayarı',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
  },
  {
    id: 3,
    name: 'A4 Kağıt',
    category: 'Kırtasiye',
    unit: 'Kutu',
    description: '80gr 500lü Paket',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
  },
  {
    id: 4,
    name: 'Endüstriyel Temizlik Sıvısı',
    category: 'Temizlik',
    unit: 'Litre',
    description: 'Genel yüzey temizleyici',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
  },
]

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const itemService = {
  async getAll() {
    await delay(500)
    return [...mockItems]
  },

  async getById(id) {
    await delay(300)
    const item = mockItems.find((item) => item.id === parseInt(id))
    if (!item) {
      throw new Error('Kalem bulunamadı')
    }
    return item
  },

  async create(itemData) {
    await delay(800)
    const newItem = {
      id: mockItems.length > 0 ? Math.max(...mockItems.map((i) => i.id)) + 1 : 1,
      ...itemData,
      image: itemData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    }
    mockItems.push(newItem)
    return newItem
  },

  async update(id, itemData) {
    await delay(800)
    const index = mockItems.findIndex((item) => item.id === parseInt(id))
    if (index === -1) {
      throw new Error('Kalem bulunamadı')
    }
    mockItems[index] = { ...mockItems[index], ...itemData }
    return mockItems[index]
  },

  async delete(id) {
    await delay(600)
    const index = mockItems.findIndex((item) => item.id === parseInt(id))
    if (index === -1) {
      throw new Error('Kalem bulunamadı')
    }
    mockItems = mockItems.filter((item) => item.id !== parseInt(id))
    return { success: true }
  },
}





