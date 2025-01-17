import React from 'react'
import Logo from './logo'
import SearchLogo from './search/searchLogo'
import Login from './auth/login'
import SingIn from './auth/signIn'
 import Toggle from './menu/toggle'

export default function nav() {
  return (
    <div className='flex justify-between p-4'>
      <Logo/>
      <div className='flex items-center space-x-4 justify-end'>
        <SearchLogo/>
        <Login/>
        <SingIn/>
        <Toggle/>
      </div>
    </div>
  )
}
