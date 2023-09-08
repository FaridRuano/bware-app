'use client'

import Link from "next/link";
import { useState } from "react";
import {User} from "react-feather"
import { useRouter } from "next/router";

export default function Login() {  

  const [usrnm, setUsrnm] = useState('')
  const [psswrd, setPsswrd] = useState('')
  
  

  return (
    <>        
      <div className="warp-center">
        <div className="login-card">
          <div className="login-card-header center-div">
            <User/>
            <h1 className="center-txt sm-txt wm-txt">Ingresa tus credenciales</h1>
          </div>
          <form className="login-card-body center-div col">
              <input placeholder="Usuario" className="login-input" type="text" 
                value={usrnm} onChange={(e)=>setUsrnm(e.target.value)}
              />
              <input placeholder="Contraseña" className="login-input" type="password" autoComplete="on"
                value={psswrd} onChange={(e)=>setPsswrd(e.target.value)}
              />
              <Link href="/home">
                <button className="btn btn-md" type="submit">Ingresar</button>
              </Link>
              <span className="forgot-pass xs-txt cur-pointer">Olvide mi contraseña</span>
          </form>
        </div>
      </div>
    </>
  )
}
  