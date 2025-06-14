import React from 'react'

const Navbar = () => {
  return (
    <nav className="relative text-white py-4 px-6 overflow-hidden">
      {/* Full background image */}
      <img
        src="./bg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
      />

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center"> 
        <span className="font-bold text-xl mx-8">Manage Your Todos At One Place</span>
      </div>
    </nav>
  )
}

export default Navbar
