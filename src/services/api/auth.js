// Mock users database
const mockUsers = [
  {
    id: 1,
    fullName: 'Demo Kullanıcı',
    email: 'demo@tedarik.com',
    password: 'demo123',
  },
]

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  async login(email, password) {
    await delay(800)
    
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return {
        success: false,
        error: 'E-posta veya şifre hatalı',
      }
    }

    const { password: _, ...userWithoutPassword } = user
    return {
      success: true,
      user: userWithoutPassword,
    }
  },

  async register(userData) {
    await delay(1000)

    const { fullName, email, password } = userData

    // Check if user already exists
    if (mockUsers.find((u) => u.email === email)) {
      return {
        success: false,
        error: 'Bu e-posta adresi zaten kullanılıyor',
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Geçersiz e-posta formatı',
      }
    }

    // Validate password length
    if (password.length < 6) {
      return {
        success: false,
        error: 'Şifre en az 6 karakter olmalıdır',
      }
    }

    const newUser = {
      id: mockUsers.length + 1,
      fullName,
      email,
      password,
    }

    mockUsers.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    return {
      success: true,
      user: userWithoutPassword,
    }
  },
}





