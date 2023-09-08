export default function ModalConfirm({text, isOn, handleModal, response} : {text:string, isOn:boolean, handleModal:any, response:any}) {
    const handleClose = () =>{
        handleModal()   
    }

    const handleConfirm = () =>{
        response()
    }
    return (
        <>
            {isOn && (
                <div className="modal-overlay">
                    <div className="modal-warp">
                        <span className="modal-title">
                            {text}
                        </span>
                        <div className="modal-btns">
                            <button className="btn btn-xs success" onClick={handleConfirm}>Aceptar</button>
                            <button className="btn btn-xs dark" onClick={handleClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
                ) 
            }
        </>
    )
}