'use client'

import BackButton from "@components/shared/BackButton"
import NavBar from '@components/shared/NavBar'
import { useState } from "react"

export default function BusinessLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    const [open, setOpen] = useState(true)

    const handleOpen = () =>{
      if(open){
        setOpen(false)
      }else{
        setOpen(true)
      }
    }
    return (
      <section>
        <div className="app-warp">
          <BackButton/>
          <NavBar isOpen={open} setOpen={handleOpen}/>
          <div className={!open?"app-content":"app-content close"}>
            {children}
          </div>
        </div>
      </section>
    )
  }