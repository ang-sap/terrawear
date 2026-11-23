
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function StoreLayout() {
  return (
    <div className="min-h-screen bg-[#f5f4ee] text-[#1b1c19]">

      {/* Shared Navigation Header */}
      <Header />

      {/* Page Content */}
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>

    </div>
  )
}

export default StoreLayout
