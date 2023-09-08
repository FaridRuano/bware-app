'use client'

import ModalConfirm from "@components/shared/ModalConfirm";
import { useEffect, useState } from "react";
import { X, Plus } from "react-feather";

export default function InfoModal({ client, isOpen, handleModal }) {
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

    const phones = [
        {
            cod: 20313,
            phone: '123151245123'
        },
        {
            cod: 20313,
            phone: '23131212323'
        },
        {
            cod: 50313,
            phone: '1929301841'
        }
    ]

    const emails = [
        {
            cod: 20313,
            email: 'fruano2@gmail.com'
        },
        {
            cod: 20313,
            email: 'fruano3@gmail.com'
        },
        {
            cod: 50313,
            email: 'ruano@gmail.com'
        }
    ]

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

    const handleRes = () => {
        setOpenModal(false)
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
        const emailsData = emails.filter((item) => item.cod === client.cod)
        setEmailValues(emailsData)
        const phonesData = phones.filter((item) => item.cod === client.cod)
        setPhoneValues(phonesData)
    }, [client]);

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
                                            <input value={!edit ? client.email : nClient.email} name="email" onChange={handleInputChange} readOnly={!edit} />
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
                                            <input value={!edit ? client.phone : nClient.phone} name="phone" onChange={handleInputChange} readOnly={!edit} />
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
                            <button className={`save ${!edit ? 'btn-dis' : ''}`} onClick={handleSave} disabled={!edit}>
                                Guardar
                            </button>
                            <button className="edit" onClick={handleEdit}>
                                {!edit ? 'Editar' : 'Cancelar'}
                            </button>
                            <button className="delete" onClick={() => delRow(client.id, client.name)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                )
            }
            <ModalConfirm text={modalText} isOn={openModal} handleModal={handleClose} response={handleRes} />
        </>
    )

}