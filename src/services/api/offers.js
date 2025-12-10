// Mock offers database
let mockOffers = [
  {
    id: 101,
    itemId: 1,
    itemName: 'Ergonomik Ofis Sandalyesi',
    itemImage: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
    quantity: 10,
    targetUnitPrice: 3500,
    currency: 'TRY',
    description: 'Ofis için ergonomik sandalye ihtiyacı',
    status: 'approved',
    submittedBy: 'Ayşe Demir',
    submittedDate: '2023-10-20',
    createdAt: '2023-10-20',
  },
  {
    id: 102,
    itemId: 2,
    itemName: 'Dizüstü Bilgisayar i7',
    itemImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    quantity: 5,
    targetUnitPrice: 25000,
    currency: 'TRY',
    description: 'İş bilgisayarı ihtiyacı',
    status: 'pending',
    submittedBy: 'Ahmet Yılmaz',
    submittedDate: '2023-10-25',
    createdAt: '2023-10-25',
  },
  {
    id: 103,
    itemId: 3,
    itemName: 'A4 Kağıt',
    itemImage: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
    quantity: 50,
    targetUnitPrice: 120,
    currency: 'TRY',
    description: 'Ofis kırtasiye ihtiyacı',
    status: 'rejected',
    submittedBy: 'Ahmet Yılmaz',
    submittedDate: '2023-10-15',
    createdAt: '2023-10-15',
  },
  {
    id: 104,
    itemId: 4,
    itemName: 'Endüstriyel Temizlik Sıvısı',
    itemImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    quantity: 20,
    targetUnitPrice: 150,
    currency: 'TRY',
    description: 'Temizlik malzemesi ihtiyacı',
    status: 'pending',
    submittedBy: 'Ayşe Demir',
    submittedDate: '2023-10-26',
    createdAt: '2023-10-26',
  },
]

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const offerService = {
  async getAll() {
    await delay(600)
    return [...mockOffers]
  },

  async getById(id) {
    await delay(300)
    const offer = mockOffers.find((offer) => offer.id === parseInt(id))
    if (!offer) {
      throw new Error('Teklif bulunamadı')
    }
    return offer
  },

  async create(offerData) {
    await delay(1000)
    const newOffer = {
      id: mockOffers.length > 0 ? Math.max(...mockOffers.map((o) => o.id)) + 1 : 101,
      ...offerData,
      status: 'pending',
      submittedBy: 'Demo Kullanıcı',
      submittedDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
    }
    mockOffers.push(newOffer)
    return newOffer
  },

  async approve(id) {
    await delay(800)
    const index = mockOffers.findIndex((offer) => offer.id === parseInt(id))
    if (index === -1) {
      throw new Error('Teklif bulunamadı')
    }
    mockOffers[index] = { ...mockOffers[index], status: 'approved' }
    return mockOffers[index]
  },

  async reject(id) {
    await delay(800)
    const index = mockOffers.findIndex((offer) => offer.id === parseInt(id))
    if (index === -1) {
      throw new Error('Teklif bulunamadı')
    }
    mockOffers[index] = { ...mockOffers[index], status: 'rejected' }
    return mockOffers[index]
  },
}





