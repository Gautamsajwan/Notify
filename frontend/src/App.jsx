import './App.css'
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <BrowserRouter>
      <div className="sm:h-screen overflow-hidden">
        <ContextProvider>
          <Navbar />

          <Routes>
            <Route exact index element={<Home />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </ContextProvider>
      </div>
    </BrowserRouter>
  )
}

export default App