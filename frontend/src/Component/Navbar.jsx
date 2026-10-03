import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketCheck, TicketPlus, XIcon, ShieldCheck } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useUser()
  const { backendUser } = useAuth()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  // Open Clerk sign-in with forgot password mode
  const handleForgotPassword = () => {
    openSignIn({
      initialPath: '/forgot-password'
    })
  }
  return (
    <div className='fixed top-0 left-0 z-50 w-full h-20 flex items-center justify-between px-6 md:px-16 lg:px-20'>

      {/* Logo */}
      <Link to='/' className='flex items-center'>
        <img src={assets.logo} alt="" className='h-[150px] md:h-[160px] lg:h-[160px] w-auto object-contain' />
      </Link>

      {/* Center Navbar (Desktop) */}
      <div className='
        hidden lg:flex
        absolute left-1/2 -translate-x-1/2
        items-center justify-center
        gap-8 px-8
        h-12 rounded-full
        backdrop-blur bg-white/10
        border border-gray-300/20
      '>
        <Link to='/'>Home</Link>
        <Link to='/movies'>Movies</Link>
        {/* <Link to='/'>Theaters</Link> */}
        {/* <Link to='/'>Releases</Link> */}
        <Link to='/favorite'>Favorites</Link>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-6'>
        <SearchIcon className='hidden md:block w-6 h-6 cursor-pointer' />

        {/* Admin Panel Button for Admins */}
        {backendUser?.role === 'admin' && (
          <Link
            to='/admin'
            className='hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold tracking-wide transition shadow-lg shadow-red-900/40 border border-red-500/30'
          >
            <ShieldCheck size={14} />
            Admin Panel
          </Link>
        )}

        {
          !user ? ( <button onClick={openSignIn} className='h-10 px-6 bg-primary hover:bg-primary-dull transition rounded-full font-medium'>
          Login
        </button>) :( <UserButton>
          <UserButton.MenuItems >
          <UserButton.Action label='My Bookings' labelIcon={<TicketPlus  width={15}/>} onClick={() => navigate('/my-bookings') } />
          {backendUser?.role === 'admin' && (
            <UserButton.Action label='Admin Panel' labelIcon={<ShieldCheck width={15}/>} onClick={() => navigate('/admin') } />
          )}
        </UserButton.MenuItems>
        </UserButton>)
        }
       
      </div>

      {/* Hamburger */}
      <MenuIcon
        className='ml-4 lg:hidden w-8 h-8 cursor-pointer'
        onClick={() => setIsOpen(true)}
      />

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 left-0 w-full h-screen bg-black/90
        flex flex-col items-center justify-center gap-8 text-lg
        transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>

        <XIcon
          className='absolute top-6 right-6 w-6 h-6 cursor-pointer'
          onClick={() => setIsOpen(false)}
        />

        <Link onClick={() => { scrollTo(0,0); setIsOpen(false)}} to='/'>Home</Link>
        <Link onClick={() => { scrollTo(0,0); setIsOpen(false)}} to='/movies'>Movies</Link>
        <Link onClick={() => { scrollTo(0,0); setIsOpen(false)}} to='/'>Theaters</Link>
        <Link onClick={() => { scrollTo(0,0); setIsOpen(false)}} to='/'>Releases</Link>
        <Link onClick={() => { scrollTo(0,0); setIsOpen(false)}} to='/favorite'>Favorites</Link>
        {backendUser?.role === 'admin' && (
          <Link
            onClick={() => { scrollTo(0,0); setIsOpen(false)}}
            to='/admin'
            className='text-red-400 font-semibold flex items-center gap-2'
          >
            <ShieldCheck size={20} />
            Admin Panel
          </Link>
        )}
      </div>

    </div>
  )
}

export default Navbar