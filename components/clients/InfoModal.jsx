'use client'

import ModalConfirm from "@components/shared/ModalConfirm";
import { useEffect, useState } from "react";
import { X, Plus } from "react-feather";
import useSWR, {mutate} from 'swr';
import urls from "@configuration/conf"
import Loading from "@components/shared/Loading"

export default function InfoModal({ client, isOpen, handleModal }) {

    const fetcher = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
      
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
      
        if (!data) {
            mutate(url);
        }
      
        return data;
    }


    const { data: phones, error: er1, isLoading:isL1 } = useSWR(urls.API_URL+"clients?met=phones", fetcher, {
        revalidateOnMount: true
    })

    const { data: emails, error: er2, isLoading:isL2 } = useSWR(urls.API_URL+"clients?met=emails", fetcher, {
        revalidateOnMount: true
    })
    
    const [nClient, setNClient] = useState(null)

    const [emailValues, setEmailValues] = useState([]);

    const handleEmailChange = (index, newValue) => {
        const updatedValues = [...emailValues];
        updatedValues[index] = newValue;
        setEmailValues(updatedValues);
    }

    const handleAddEmail = (cod) => {
        setEmailValues(prev => [...prev, {cod: cod, email: ''}])
    }

    const [phonesValues, setPhoneValues] = useState([]);

    const handlePhoneChange = (index, newValue) => {
        const updatedValues = [...phonesValues];
        updatedValues[index] = newValue;
        setPhoneValues(updatedValues);
    }

    const handleAddPhone = (cod) => {
        setPhoneValues(prev => [...prev, {cod: cod, phone: ''}])
    }

    const emailsInput = (cod) => {
        const emailsData = emails.filter((item) => item.cod === cod)
        return (
            <>
                {
                    edit ? (
                        <>
                            {emailValues.map((ema, i) => (
                                <input key={i} value={ema.email} readOnly={!edit} onChange={(e) => handleEmailChange(i, e.target.value)}/>
                                
                            ))}
                        </>
                    ) : (
                        <>
                            {emailsData.map((ema, i) => (
                                <input key={i} value={ema.email} readOnly={!edit} onChange={(e) => handleEmailChange(i, e.target.value)}/>
                            ))}
                        </>
                    )
                }
            </>
        )
    }
    
    const phonesInput = (cod) => {
        const phonesData = phones.filter((item) => item.cod === cod)
        return (
            <>
                {
                    edit ? (
                        <>
                            {phonesValues.map((ema, i) => (
                                <input key={i} value={ema.phone} readOnly={!edit} onChange={(e) => handlePhoneChange(i, e.target.value)}/>
                                
                            ))}
                        </>
                    ) : (
                        <>
                            {phonesData.map((ema, i) => (
                                <input key={i} value={ema.phone} readOnly={!edit} onChange={(e) => handlePhoneChange(i, e.target.value)}/>
                            ))}
                        </>
                    )
                }
            </>
        )
    }
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNClient((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const [openModal, setOpenModal] = useState(false)
    const [modalText, setModalText] = useState('')

    const [edit, setEdit] = useState(false)

    const handleEdit = () => {
        if (edit === true) {
            setNClient(client)
            const emailsData = emails.filter((item) => item.cod === client.cod)
            setEmailValues(emailsData)
            const phonesData = phones.filter((item) => item.cod === client.cod)
            setPhoneValues(phonesData)
            setEdit(false)
        } else {
            setEdit(true)
        }
    }

    const handleSave = () => {
        console.log('Guardar')
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleRes = async () => {
        try {
            const response = await fetch('/api/clients', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client.cod)
            })            
            if (response.ok) {
                setOpenModal(false)      
                handleModal()          
              } else {
                console.error('Failed to delete client:', response.statusText);
              }
        } catch (err ){
            console.error('Error sending client: ', err)
        }
    }

    const delRow = (idcl, name) => {
        setOpenModal(true)
        const text = 'Estas seguro que deseas eliminar a: ' + name
        setModalText(text)
    }

    function dniType(type){
        let name
        switch (type) {
          case 1:
            name = "CED";
            break;
          case 2:
            name = "RUC";
            break;
          case 3:
            name = "PAS";
            break;
          case 4:
            name = "DNI";
            break;
          default:
            name = "C/F"
            break;
        }
        return name
    }

    useEffect(() => {
        setNClient(client)
        setEdit(false)
        if(phones && emails){
            const emailsData = emails.filter((item) => item.cod === client.cod)
            setEmailValues(emailsData)
            const phonesData = phones.filter((item) => item.cod === client.cod)
            setPhoneValues(phonesData)
        }
    }, [client]);

    if (isL1 || isL2) {
        return <Loading/>
    }

    if(phones && emails){
        return (        
            <>
                {
                    client && (
                        <div className={`cl-modal-warp ${isOpen ? '' : 'closed'}`}>
                            <div className="cl-modal-close" onClick={handleModal}>
                                <X className="cl-close" width={30} height={39} />
                            </div>
                            <div className="cl-modal-info">
                                <div className="cl-modal-header">
                                    <h1>Información del cliente</h1>
                                </div>
                                <div className="cl-modal-body">
                                    <div className="cl-modal-inputs">
                                        <div className="cl-modal-span sm">
                                            <span>
                                                Código:
                                            </span>
                                            <p>
                                                {client.cod}
                                            </p>
                                        </div>
                                        <div className="cl-modal-span">
                                            <span>
                                                Nombre:
                                            </span>
                                            <p>
                                                {client.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="cl-modal-inputs">
                                        <div className="cl-modal-span sm">
                                            <span>
                                                Tipo:
                                            </span>
                                            <p>
                                                {dniType(client.type)}
                                            </p>
                                        </div>
                                        <div className="cl-modal-span">
                                            <span>
                                                Identificacion:
                                            </span>
                                            <p>
                                                {client.dni}
                                            </p>
                                        </div>
                                    </div>
                                    {nClient && (
                                        <>
                                            <div className="cl-modal-input">
                                                <span>
                                                    Correos:
                                                </span>
                                                {emailsInput(client.cod)}
                                                {
                                                    edit && (
                                                        <>
                                                            <button className="btn btn-sm center-div" onClick={() => handleAddEmail(client.cod)}><Plus /></button>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className="cl-modal-input">
                                                <span>
                                                    Telefonos:
                                                </span>
                                                {phonesInput(client.cod)}
                                                {
                                                    edit && (
                                                        <>
                                                            <button className="btn btn-sm center-div" onClick={() => handleAddPhone(client.cod)}><Plus /></button>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className="cl-modal-input">
                                                <span>
                                                    Dirección:
                                                </span>
                                                <input value={!edit ? client.dir : nClient.dir} name="dir" onChange={handleInputChange} readOnly={!edit} />
                                            </div>
                                        </>)}

                                </div>
                            </div>
                            <div className="cl-modal-buttons">
                                {edit&&(
                                    <button className={`save ${!edit ? 'btn-dis' : ''}`} onClick={handleSave} disabled={!edit}>
                                        Guardar
                                    </button>
                                )}
                                <button className="edit" onClick={handleEdit}>
                                    {!edit ? 'Editar' : 'Cancelar'}
                                </button>
                                <button className="delete" onClick={() => delRow(client.id, client.name)}>
                                    Eliminar
                                </button>
                            </div>
                            <div style={{height:"20px"}}/>
                        </div>
                    )
                }
                <ModalConfirm text={modalText} isOn={openModal} handleModal={handleClose} response={handleRes} />
            </>
        )
    }
}