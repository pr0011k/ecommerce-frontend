import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details" element={<ProductDetails />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
