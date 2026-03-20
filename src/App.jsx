import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'
import NewDiagnosis from './pages/NewDiagnosis'
import Results from './pages/Results'

export default function App() {
  const [latestDiagnosis, setLatestDiagnosis] = useState(null)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/features"        element={<Features />} />
        <Route path="/pricing"         element={<Pricing />} />
        <Route path="/dashboard"       element={<Dashboard />} />
        <Route path="/new-diagnosis"   element={<NewDiagnosis onResult={setLatestDiagnosis} />} />
        <Route path="/results/demo"    element={<Results diagnosis={null} />} />
        <Route path="/results/latest"  element={<Results diagnosis={latestDiagnosis} />} />
      </Routes>
    </>
  )
}
