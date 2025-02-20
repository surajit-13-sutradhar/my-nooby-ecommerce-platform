import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {

  return (
    <div className="min-h-screen text-darkBlue-700 relative overflow-hidden">
        {/* Gradient */}
        <div className="absolute inset-0 overflow-hidden">
				<div className="absolute inset-0">
                    <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[150vh] 
                            bg-[radial-gradient(ellipse_at_top,_rgba(180,200,255,0.5)_0%,_rgba(11,78,155,0.4)_55%,_rgba(0,0,0,0)_100%)] 
                            opacity-100 z-[1]"
                    />
				</div>
		</div>

        <div className="relative z-50 pt-20">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
        
    </div>
  )
}

export default App
