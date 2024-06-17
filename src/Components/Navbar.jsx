import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between bg-indigo-900 text-white py-2'>
        <div className='logo'>
            <span className='font-bold text-2xl mx-8 hover:cursor-pointer'>iTodo</span>
        </div>
        <ul  className="flex gap-8 mx-11">
            <li  className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
