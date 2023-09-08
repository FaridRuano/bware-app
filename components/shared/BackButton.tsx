'use client'

import { useRouter } from "next/navigation";
import { ChevronLeft } from "react-feather";

export default function BackButton() {
    const router = useRouter()

    return (
        <div className="back-btn-warp">
            <span className="back-btn center-div" onClick={()=>router.push('/')}>
                <ChevronLeft/>Cerrar Sesión               
            </span>
        </div>
    )
}