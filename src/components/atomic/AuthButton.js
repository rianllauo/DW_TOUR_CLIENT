import React from 'react'

const AuthButton = ({handleShowLogin, handleShowRegister}) => {
  return (
    <div className='flex items-center gap-3'>
        <button className='px-4 py-1 rounded-md text-sm border-[1.5px] border-amber-400 font-semibold text-amber-400 hover:bg-amber-400 hover:text-white transition duration-300' onClick={handleShowLogin}>Login</button>
        <button className='px-4 py-1.5 rounded-md text-sm text-white bg-amber-400 font-medium hover:bg-amber-600 hover:text-white transition duration-300' onClick={handleShowRegister}>Register</button>
    </div>
  )
}

export default AuthButton