'use client'
import Image from "next/image";
import { useState } from "react";
import { Anchor, Archive, BarChart2, File, Menu, Octagon, ShoppingBag, Tool, Users } from "react-feather";
import { useRouter } from "next/navigation";

export default function NavBar( {isOpen, setOpen} ) {
    const router = useRouter()

    const [selNav, setSelNav] = useState('1')
    const [selSubNav, setSelSubNav] = useState('')


    function handleItems(it) {
        return selNav === it ? 'nav-item sel' : 'nav-item';
    }

    function handleSubitems(it) {
        return selSubNav === it ? 'nav-subitem sel' : 'nav-subitem';
    }

    const routeNav = (it, link) => {
        setSelNav(it)
        router.push(link)
    }
    

    return (
        <>
        <nav className={isOpen?"nav-bar":"nav-bar closed"}>
            <div className="nav-header">
                <div className="nav-header-logo center-div" onClick={()=>{router.push('/home'); setSelNav('0')}}>
                    <Image src='/imgs/bware-logo-b.png' alt='bWare Logo' width={100} height={22}/>
                </div>
            </div>
            <div className="nav-body">
                <div className="nav-items">
                    <ul className="nav-items-group">
                        <li className={handleItems('1')} onClick={()=>{routeNav('1','/emit/bill');setSelSubNav('1')}}>
                            <File/><span>Emitir</span>
                        </li>
                        {selNav === '1' ? (
                            <ul className="nav-subitems-group">
                                <li className={handleSubitems('1')} onClick={()=>setSelSubNav('1')}>
                                    <Octagon width={15}/>Factura
                                </li>
                                <li className={handleSubitems('2')} onClick={()=>setSelSubNav('2')}>
                                    <Octagon width={15}/>Nota de crédito
                                </li>
                                <li className={handleSubitems('3')} onClick={()=>setSelSubNav('3')}>
                                    <Octagon width={15}/>Nota de débito
                                </li>
                                <li className={handleSubitems('4')} onClick={()=>setSelSubNav('4')}>
                                    <Octagon width={15}/>Guía de remisión
                                </li>
                                <li className={handleSubitems('5')} onClick={()=>setSelSubNav('5')}>
                                    <Octagon width={15}/>Comprobante de retención
                                </li>
                                <li className={handleSubitems('6')} onClick={()=>setSelSubNav('6')}>
                                    <Octagon width={15}/>Liquidaciones
                                </li>
                            </ul>
                        ): (
                            <></>
                        )}                        
                        <li className={handleItems('2')} onClick={()=>{routeNav('2','/vouchers/manage');setSelSubNav('7')}}>
                            <Archive/><span>Comprobantes</span>                            
                        </li>
                        {selNav === '2' ? (
                            <ul className="nav-subitems-group">
                                <li className={handleSubitems('7')} onClick={()=>setSelSubNav('7')}>
                                    <Octagon width={15}/>Administrar
                                </li>
                                <li className={handleSubitems('8')} onClick={()=>setSelSubNav('8')}>
                                    <Octagon width={15}/>Devueltas
                                </li>
                                <li className={handleSubitems('9')} onClick={()=>setSelSubNav('9')}>
                                    <Octagon width={15}/>Pendientes de Anular
                                </li>
                                <li className={handleSubitems('10')} onClick={()=>setSelSubNav('10')}>
                                    <Octagon width={15}/>Historial de anulados
                                </li>                                
                            </ul>
                        ): (
                            <></>
                        )}   
                        <li className={handleItems('3')} onClick={()=>routeNav('3','/products')}>
                            <ShoppingBag/><span>Productos y servicios</span>
                        </li>
                        <li className={handleItems('4')} onClick={()=>routeNav('4','/clients')}>
                            <Users/><span>Clientes</span>
                        </li>                    
                        <li className={handleItems('5')} onClick={()=>routeNav('5','/analytics')}>
                            <BarChart2/><span>Análiticas</span>
                        </li>
                    </ul>
                </div>
                <div className="nav-footer">
                    <ul className="nav-items-group">
                        <li className={handleItems('6')} onClick={()=>routeNav('6','/settings')}>
                            <Tool/><span>Configuraciones</span>
                        </li>
                    </ul>
                </div>                
            </div>
        </nav>
        <div className={isOpen?"nav-close":"nav-close close"}>
            <Anchor onClick={setOpen}/>
        </div>

        </>
    )
}