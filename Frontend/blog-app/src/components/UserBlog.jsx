import React from 'react'
import "./Userblog.css"
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
function UserBlog() {
   
    const navigate=useNavigate()
const handleclick=()=>{
       navigate("/login")

        
}
  return (
    <div className='main-user'>
       <Navbar/>
     <button  onClick={handleclick} className='button'>Ckeck Your Blog </button>
      
    </div>
  )
}

export default UserBlog
