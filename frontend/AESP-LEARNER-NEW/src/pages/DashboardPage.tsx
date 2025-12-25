import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout.tsx'
import Assessment from '../components/Assessment.tsx'
import Packages from '../components/Packages.tsx'
import Practice from '../components/Practice.tsx'
import Progress from '../components/Progress.tsx'
import Reports from '../components/Reports.tsx'

const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route path="assessment" element={<Assessment />} />
      <Route path="packages" element={<Packages />} />
      <Route path="practice" element={<Practice />} />
      <Route path="progress" element={<Progress />} />
      <Route path="reports" element={<Reports />} />
      <Route index element={<Navigate to="assessment" replace />} />
    </Route>
  </Routes>
)

export default DashboardPage