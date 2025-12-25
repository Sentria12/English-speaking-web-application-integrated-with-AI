import Header from './Header.tsx'
import Sidebar from './Sidebar.tsx'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => (
  <div className="container">
    <Header />
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="card">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
)

export default DashboardLayout