const { useRef, useEffect } = React

export function Modal({ isShown, onClose = null, children, className = ''}) {
	const dialogRef = useRef(null)

	useEffect(() => {
		if (isShown && dialogRef.current) dialogRef.current.showModal()
		else if (dialogRef.current) dialogRef.current.close()
	}, [isShown])
    
    function onCloseModal() {
        if (onClose) onClose()
	}

	return (
		<dialog 
            closedby="any"
            ref={dialogRef}
            onCancel={onCloseModal} 
            className={`modal ${className}`}>

                { children }

                <button 
                    className="btn-close"
                    onClick={onCloseModal}>✕</button>
		</dialog>
	)
}
