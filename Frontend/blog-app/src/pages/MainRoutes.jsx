import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from '../components/Registration'
import Login from '../components/Login'

import Modal from '../components/Modal'
import Blog from '../components/Blog'
import Blogdata from '../components/Blogdata'
import Edit from '../components/Edit'
import UserBlog from '../components/UserBlog'


function MainRoutes() {
  return (
    <Routes>
        <Route path="/register" element={<Registration/>}>
           

        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/error' element={<Modal/>}></Route>
        <Route path='/blog' element={<Blog/>}></Route>
        <Route path='/showblog' element={<Blogdata/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
        <Route path='/' element={<UserBlog/>}></Route>

    </Routes>
  )
}

export default MainRoutes
