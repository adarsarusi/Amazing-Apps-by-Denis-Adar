const { useState, useEffect, useRef } = React
import { noteService } from '../services/note.service.js'

export function NoteEdit({ onSaveNote }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [isNoting, setIsNoting] = useState(false)
    const noteFormRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (!isNoting) return
            if (noteFormRef.current && !noteFormRef.current.contains(ev.target)) {
                setIsNoting(false)
            }
        }

        window.addEventListener('click', handleClickOutside)
        return () => window.removeEventListener('click', handleClickOutside)
    }, [isNoting])

    function handleChange(ev) {
        const { name, value } = ev.target

        setNoteToEdit(prev => ({
            ...prev,
            info: {
                ...prev.info,
                [name]: value
            }
        }))
    }

    function onSubmitNote(ev) {
        ev.preventDefault()

        onSaveNote(noteToEdit)

        setNoteToEdit(noteService.getEmptyNote())
        setIsNoting(false)
    }

    function onOpenNoteForm() {
        setIsNoting(true)
    }

    return (
        <form className="note-form" ref={noteFormRef} onSubmit={onSubmitNote}>

            <div className="note-inputs">
                {isNoting &&
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={noteToEdit.info.title}
                        onChange={handleChange}
                    />
                }

                <input
                    type="text"
                    name="txt"
                    placeholder="Take a note..."
                    value={noteToEdit.info.txt}
                    onClick={onOpenNoteForm}
                    onChange={handleChange}
                />
            </div>

            <div className="note-controls">
                {isNoting && <button className="save-btn">Save</button>}
            </div>
        </form>
    )
}