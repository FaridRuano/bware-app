'use client'

import InfoModal from "@components/clients/InfoModal"
import NewModal from "@components/clients/NewModal"
import DataTableBase from "@components/shared/Datatable/Datatable"
import ModalConfirm from "@components/shared/ModalConfirm"
import TitlePage from "@components/shared/TitlePage"
import { useEffect, useState } from "react"
import { AlertCircle, AlertTriangle, File, Plus, Trash, UserPlus, Users, X } from "react-feather"
  
export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false)

  /* Selected Rows */
  const [areSelectedRows, setAreSelectedRows] = useState(false)
  const[selRows, setSelRows] = useState([])

  /* Selected Row */
  const [selRow, setSelRow] = useState([])
  
  /* Modal Confirm */
  const [openModal, setOpenModal] = useState(false)
  const [modalText, setModalText] = useState('')

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleRes = () => {
    setOpenModal(false)
  }

  /* Modal Info */
  const [infoModal, setInfoModal] = useState(false)
  
  const handleCloseInfo = () => {
    setInfoModal(false)
  }
  /* Modal New */
  const [newModal, setNewModal] = useState(false)

  const handleOpenNew = () => {
    setInfoModal(false)
    setNewModal(true)
  }

  const handleCloseNew = () => {
    setNewModal(false)
  }

  function dniType(type){
    let name
    switch (type) {
      case 1:
        name = "Cedúla";
        break;
      case 2:
        name = "RUC";
        break;
      case 3:
        name = "Pasaporte";
        break;
      case 4:
        name = "DNI Exterior";
        break;
      default:
        name = "Consumidor Final"
        break;
    }
    return name
  }

  const columns = [
    {
      name: 'Código',
      selector: (row) => row.cod,
      sortable: true,
    },
    {
      name: 'Identificación',
      selector: (row) => row.dni,
    },
    {
      name: 'Tipo',
      selector: (row) => row.type,
      cell: (row)=>(
        <span>{dniType(row.type)}</span>
      )
    },
    {
      name: 'Nombre',
      selector: (row) => row.name,
    },
  ]

  const data = [
    {
      id: 1,
      cod: 20313,
      dni: '1805467527',
      type: 1,
      name: 'IMPORTADORA ALVARADO S.A. SOCIOS RICACHONES',
      dir: 'Izamba reodndel a pinllo',
      phone: '0996123884',
      email: 'importadv@gmail.com',               
    },
    {
      id: 2,
      cod: 50313,
      dni: '1805467527001',
      type: 2,
      name: 'MARCO FARID RUANO CAICEDO',
      dir: 'Julio Enrique Paredes y Rodrigo Pachano',
      phone: '0996447884',
      email: 'fruanocm2777@gmail.com'
    },    
    {
      id: 3,
      cod: 60314,
      dni: '1805467528',
      type: 1,
      name: 'ROMINA RUANO',
      dir: 'Ficoa city',
      phone: '0993124788',
      email: 'romi.ruano@gmail.com'
    },    
  ]  

  const handleRows = ({ selectedRows }) => {
    //console.log('Selected Rows: ', selectedRows);
    if(selectedRows.length > 0){
      setAreSelectedRows(true)
      setSelRows(selectedRows)
    }else{
      setAreSelectedRows(false)
    }
  }

  const handleRow = ({ id }) => {
    setNewModal(false)
    let row = data.find(item => item.id === id)
    setSelRow(row)
    setInfoModal(true)
  }

  const handleDelRows = () => {
    setOpenModal(true)
    const text = 'Estas seguro que deseas eliminar?'
    setModalText(text)
  }

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      <TitlePage text={'Clientes'}/>
      <div className="info-cards">
        <div className="info-card">
          <div className="card-ico success center-div">
            <span><UserPlus/></span>
          </div>
          <div className="card-text">
            <span className="card-number">3</span>
            <span className="card-name">Nuevos clientes</span>
          </div>
        </div>
        <div className="info-card">
          <div className="card-ico secondary center-div">
            <span><Users/></span>
          </div>
          <div className="card-text">
            <span className="card-number">{data.length}</span>
            <span className="card-name">Total clientes</span>
          </div>
        </div>
        <div className="info-card">
          <div className="card-ico warning warning center-div">
            <span><AlertTriangle/></span>
          </div>
          <div className="card-text">
            <span className="card-number">2</span>
            <span className="card-name">Mantienen deuda</span>
          </div>
        </div>
        <div className="info-card">
          <div className="card-ico error center-div">
            <span><AlertCircle/></span>
          </div>
          <div className="card-text">
            <span className="card-number">0</span>
            <span className="card-name">Clientes morosos</span>
          </div>
        </div>
      </div>
      <div className="btn-tab-nav">
        <button className="btn-ico btn-sm center-div"  onClick={handleOpenNew}><Plus/></button>
        <button 
          className={`btn-ico btn-sm center-div ${areSelectedRows? '':'disabled'}`}
          disabled={!areSelectedRows}
          onClick={handleDelRows}
          >
            <Trash/>
        </button>
        <button className="btn-ico btn-sm center-div"><File/></button>
        <input className="inp" placeholder="Ingresar Nombre / Cedúla"/>
      </div>
      <div className="db-container">
        {domLoaded && (
          <DataTableBase
            columns={columns}
            data={data}         
            selectableRows={true}
            pointerOnHover={true}
            highlightOnHover={true}            
            onSelectedRowsChange={handleRows}          
            onRowClicked={handleRow}     
          />
        )}
      </div>
      <InfoModal isOpen={infoModal} handleModal={handleCloseInfo} client={selRow}/>
      <ModalConfirm text={modalText} isOn={openModal} handleModal={handleClose} response={handleRes}/>
      <NewModal isOpen={newModal} handleModal={handleCloseNew}/>
    </>
  )
}
  