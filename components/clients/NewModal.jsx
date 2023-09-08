'use client'

import { useEffect, useState } from "react"
import { X, Plus } from "react-feather"

export default function NewModal({ isOpen, handleModal }) {

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
                                <input/>
                            </div>
                            <div className="cl-modal-input new">
                                <span>
                                    Tipo Id:
                                </span>
                                <select>
                                    <option>...</option>
                                    <option>Cédula</option>
                                    <option>RUC</option>
                                    <option>Pasaporte</option>
                                    <option>Documento Extranjero</option>
                                </select>
                            </div>    
                            <div className="cl-modal-input new">
                                <span>
                                    DNI:
                                </span>
                                <input/>
                            </div>
                            <div className="cl-modal-input new">
                                <span>
                                    Razón Social:
                                </span>
                                <input/>
                            </div>
                            <div className="cl-modal-input new">
                                <span>
                                    Dirección:
                                </span>
                                <input/>
                            </div>
                            <div className="cl-modal-input new">
                                <span>
                                    Telefono:
                                </span>
                                <input/>
                            </div>   
                            <div className="cl-modal-input new">
                                <span>
                                    Email:
                                </span>
                                <input/>
                            </div>           
                        </div>
                    </div>
                </div>
                <div className="cl-modal-buttons">
                    <button className="save" onClick={handleModal}>
                        Guardar
                    </button>
                    <button className="delete" onClick={handleModal}>
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )

}