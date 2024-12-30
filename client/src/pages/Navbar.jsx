import React from 'react'
import { Button } from '../components/ui/button'

function Navbar() {
  return (
    <div className='bg-gray-600'>
    <div className=' flex items-center justify-between p-2'>
        <h1>{"Patel bro"}</h1>
        <Button>Logout</Button>
    </div>
    </div>
  )
}

export default Navbar