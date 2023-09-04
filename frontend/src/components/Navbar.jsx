import React, { useContext } from 'react'
import logo from '../assets/paper.png'
import { Link, useLocation } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function Navbar() {
  const location = useLocation()
  const {darkTheme, toggleTheme} = useContext(ThemeContext)

  const linkColor = darkTheme ? 'text-gray-200' : 'text-gray-700'

  return (
    <nav className={`navbar ${darkTheme ? 'text-white bg-gray-800' : 'text-gray-900'} font-inter py-2 px-3 flex justify-between items-center shadow-md transition duration-200`}>
      <section className="leftPart flex justify-between items-center">
        <div className="logoWrapper mr-3 cursor-pointer">
          <Link to='/'>
            <img src={logo} alt="notes logo" className="w-9" />
          </Link>
        </div>

        <div className="linksWrapper font-semibold flex items-center">
          <Link to='/' className={`${location.pathname === '/'? linkColor : 'text-gray-400'} linkTransition py-2 px-4 hover:bg-gray-300 rounded-md`}>Home</Link>
          <Link to='/about' className={`${location.pathname === '/about'? linkColor : 'text-gray-400'} linkTransition py-2 px-4 hover:bg-gray-300 rounded-md`}>About</Link>
        </div>
      </section>

      <section className="rightPart flex gap-3">
        <button className="w-12 h-11 p-2 font-bold text-white bg-gray-600 hover:bg-gray-700 rounded-full" onClick={toggleTheme}>{darkTheme? '☀️':'🌙'}</button>
        <button className="py-2 px-4 font-bold text-white bg-blue-400 hover:bg-blue-500 rounded-full"> Log in </button>
      </section>
    </nav>
  )
}

export default Navbar