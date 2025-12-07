import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { OfferProvider } from './context/OfferContext'
import { ItemProvider } from './context/ItemContext'
import PublicLayout from './layouts/PublicLayout'
import PanelLayout from './layouts/PanelLayout'
import Landing from './pages/Landing/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import OfferList from './pages/Offers/OfferList'
import OfferDetail from './pages/Offers/OfferDetail'
import OfferCreate from './pages/Offers/OfferCreate'
import ItemList from './pages/Items/ItemList'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <ItemProvider>
          <OfferProvider>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/giris" element={<Login />} />
                <Route path="/kayit" element={<Register />} />
              </Route>

              {/* Protected Panel Routes */}
              <Route element={<ProtectedRoute><PanelLayout /></ProtectedRoute>}>
                <Route path="/panel" element={<Dashboard />} />
                <Route path="/panel/teklifler" element={<OfferList />} />
                <Route path="/panel/teklifler/:id" element={<OfferDetail />} />
                <Route path="/panel/teklifler/yeni" element={<OfferCreate />} />
                <Route path="/panel/kalemler" element={<ItemList />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OfferProvider>
        </ItemProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

