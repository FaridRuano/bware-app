'use client'

import { useEffect, useState } from "react"
import { X, Plus } from "react-feather"

export default function NewModal({ isOpen, handleModal }) {
    const [clientData, setClientData] = useState({
        cod: '',
        name: '',
        dni: '',
        type: '',
        dir: '',
        emails: [''],
        phones: [''],
    })

    const resetCli = () => {
        setClientData({
            cod: '',
            name: '',
            dni: '',
            type: '',
            dir: '',
            emails: [''],
            phones: [''],
        })
    }

    const hanCli = (e) =>{
        const {name, value} = e.target
        setClientData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const hanEmails = (index, value) => {
        const updatedEmails = [...clientData.emails]
        updatedEmails[index] = value
    
        setClientData(prevData => ({
          ...prevData,
          emails: updatedEmails
        }))
    }

    const addEmail = () => {
        setClientData(prevData => ({
          ...prevData,
          emails: [...prevData.emails, '']
        }))
    }

    const delEmail = (index) => {
        const updatedEmails = [...clientData.emails]
        updatedEmails.splice(index, 1)
        
        setClientData(prevData => ({
          ...prevData,
          emails: updatedEmails
        }))
    }

    const hanPhones = (index, value) => {
        const updatedPhones = [...clientData.phones]
        updatedPhones[index] = value
    
        setClientData(prevData => ({
          ...prevData,
          phones: updatedPhones
        }))
    }

    const addPhone = () => {
        setClientData(prevData => ({
          ...prevData,
          phones: [...prevData.phones, '']
        }));
    }

    const delPhone = (index) => {
        const updatedPhones = [...clientData.phones]
        updatedPhones.splice(index, 1)
        
        setClientData(prevData => ({
          ...prevData,
          phones: updatedPhones
        }))
    }

    const sendData = async (e) => {
        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clientData)
            })            
            if (response.ok) {
                //const data = await response.json();                
                resetCli()
                handleModal()
              } else {
                console.error('Failed to insert client:', response.statusText);
              }
        } catch (err ){
            console.error('Error sending client: ', err)
        }
    }

    return (
        <>

            <div className={`cl-modal-warp ${isOpen ? '' : 'closed'}`}>
                <div className="cl-modal-close" onClick={handleModal}>
                    <X className="cl-close" width={30} height={39} />
                </div>
                <div className="cl-modal-info">
                    <div className="cl-modal-header">
                        <h1>Crear nuevo cliente</h1>
                    </div>
                    <div className="cl-modal-body">
                        <div className="cl-inputs-new">
                            <div className="cl-modal-input new">
                                <span>
                                    Código:
                                </span>
                                <input name='cod' value={clientData.cod} onChange={hanCli}/>
                            </div>
                            <div className="cl-modal-input new">
                                <span>
                                    Tipo Id:
                                </span>
                                <select name='type' value={clientData.type} onChange={hanCli}>
                                    <option value=''>...</option>
                                    <option value='1'>Cédula</option>
                                    <option value='2'>RUC</option>
                                    <option value='3'>Pasaporte</option>
                                    <option value='4'>Documento Extranjero</option>
                                </select>
                            </div>    
                            <div className="cl-modal-input new">
                                <span>
                                    DNI:
                                </span>
                                <input name='dni' value={clientData.dni} onChange={hanCli}/>
                            </div>
                            <div className="cl-modal-input new">
                                <span>
                                    Nombre
                                    /RS:
                                </span>
                                <input name='name' value={clientData.name} onChange={hanCli}/>
                            </div>
                            <div className="cl-modal-input new">
                                <span>
                                    Dirección:
                                </span>
                                <input name='dir' value={clientData.dir} onChange={hanCli}/>
                            </div>
                            {clientData.phones.map((ph,i)=>(
                                <div className="cl-modal-input new plus" key={i}>
                                    <span>
                                        {i === 0 && (
                                          "Telefono:  "
                                        )}
                                    </span>
                                    <input value={ph} onChange={(e)=>hanPhones(i, e.target.value)}/>
                                    { i=== 0 ?(
                                        <Plus className="icon_new" onClick={addPhone}/>
                                    ):(
                                        <X className="icon_new" onClick={()=>delPhone(i)}/>
                                    )}
                                </div>   
                            ))}
                            {clientData.emails.map((em,i)=>(
                                <div className="cl-modal-input new plus" key={i}>
                                    <span>
                                        {i === 0 && (
                                          "Email:  "
                                        )}
                                    </span>
                                    <input value={em} onChange={(e)=>hanEmails(i, e.target.value)}/>
                                    { i=== 0 ?(
                                        <Plus className="icon_new" onClick={addEmail}/>
                                    ):(
                                        <X className="icon_new" onClick={()=>delEmail(i)}/>
                                    )}
                                </div>   
                            ))}                                        
                        </div>
                    </div>
                </div>
                <div className="cl-modal-buttons">
                    <button className="save" onClick={()=>sendData()}>
                        Guardar
                    </button>
                    <button className="delete" onClick={()=>{
                        resetCli()   
                        handleModal()
                    }}>
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )

}