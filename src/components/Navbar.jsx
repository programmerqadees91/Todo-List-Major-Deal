import React from 'react'

const Navbar = () => {
  return (
    <div>
       <nav className='flex justify-between bg-slate-900 text-white py-3'>
        <div className="logo">
            <span className='font-bold text-xl mx-3'>Air•Task</span>
        </div>
       <ul className="flex gap-12 mx-9 ">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Tasks</li>
        </ul>
       </nav>
    </div>
  )
}

export default Navbar
