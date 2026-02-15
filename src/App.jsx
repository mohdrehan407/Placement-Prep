import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Analyzer from './pages/Analyzer';
import Results from './pages/Results';
import History from './pages/History';
import Practice from './pages/Practice';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import PRPTest from './pages/PRPTest';
import PRPShip from './pages/PRPShip';
import PRPProof from './pages/PRPProof';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="analyzer" element={<Analyzer />} />
        <Route path="history" element={<History />} />
        <Route path="results/:id" element={<Results />} />
        <Route path="practice" element={<Practice />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="resources" element={<Resources />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      {/* PRP Build Routes */}
      <Route path="/prp/07-test" element={<PRPTest />} />
      <Route path="/prp/08-ship" element={<PRPShip />} />
      <Route path="/prp/proof" element={<PRPProof />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;