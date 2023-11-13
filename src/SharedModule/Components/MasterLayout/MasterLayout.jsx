import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'

export default function MasterLayout() {
  return (
    <>
       <div className="container-fluid">
         <div className="row">
            <div className="col-md-2">
                <div>
                    <SideBar/>
                </div>
            </div>
            <div className="col-md-10">
                <div>
                    <Navbar/>
                    <Header/>
                    <Outlet/>
                </div>
            </div>
         </div>
       </div>
    </>
  )
}
