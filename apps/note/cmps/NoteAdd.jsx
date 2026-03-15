const { useState, useEffect, useRef } = React
import { noteService } from '../services/note.service.js'

export function NoteAdd({ onSaveNote }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [isNoting, setIsNoting] = useState(false)
    const noteFormRef = useRef(null)

    const EditorCmp = getEditorCmp(noteToEdit.type)

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

    function changeType(type) {
        setNoteToEdit(prev => ({
            ...prev,
            type,
            info: getInfoByType(type)
        }))
    }

    function getInfoByType(type) {
        switch (type) {
            case 'NoteTxt':
                return { title: '', txt: '' }

            case 'NoteImg':
                return { title: '', url: '' }

            case 'NoteVideo':
                return { title: '', url: '' }

            case 'NoteTodos':
                return {
                    title: '',
                    todos: []
                }

            default:
                return { title: '', txt: '' }
        }
    }

    function onSubmitNote(ev) {
        ev.preventDefault()

        let noteToSave = { ...noteToEdit }

        if (noteToSave.type === 'NoteTodos') {
            noteToSave.info.todos = noteToSave.info.todos
                .split(',')
                .map(txt => txt.trim())
                .filter(Boolean)
                .map(txt => ({ txt, isDone: false }))
        }

        onSaveNote(noteToSave)

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

                <EditorCmp
                    note={noteToEdit}
                    handleChange={handleChange}
                    onOpenNoteForm={onOpenNoteForm}
                />
            </div>

            {isNoting && <div className="note-controls">

                <img onClick={() => changeType('NoteTxt')}
                    src="apps\note\imgs\types\NoteTxt.png" alt="" />

                <img onClick={() => changeType('NoteImg')}
                    src="apps\note\imgs\types\NoteImg.png" alt="" />

                <img onClick={() => changeType('NoteVideo')}
                    src="apps\note\imgs\types\NoteVideo.png" alt="" />

                <img onClick={() => changeType('NoteTodos')}
                    src="apps\note\imgs\types\NoteTodos.png" alt="" />

                <button className="save-btn">Save</button>

            </div>}
        </form>
    )
}

function getEditorCmp(type) {
    switch (type) {
        case 'NoteTxt':
            return NoteAddTxt
        case 'NoteImg':
            return NoteAddImg
        case 'NoteVideo':
            return NoteAddVideo
        case 'NoteTodos':
            return NoteAddTodos
        default:
            return NoteAddTxt
    }
}

function NoteAddTxt({ note, handleChange, onOpenNoteForm }) {
    return (
        <textarea
            name="txt"
            placeholder="Take a note..."
            value={note.info.txt}
            onClick={onOpenNoteForm}
            onChange={handleChange}
        />
    )
}

function NoteAddImg({ note, handleChange, onOpenNoteForm }) {
    return (
        <input
            type="text"
            name="url"
            placeholder="Enter image URL..."
            value={note.info.url}
            onClick={onOpenNoteForm}
            onChange={handleChange}
        />
    )
}

function NoteAddVideo({ note, handleChange, onOpenNoteForm }) {
    return (
        <input
            type="text"
            name="url"
            placeholder="Enter video URL..."
            value={note.info.url}
            onClick={onOpenNoteForm}
            onChange={handleChange}
        />
    )
}

function NoteAddTodos({ note, handleChange, onOpenNoteForm }) {
    return (
        <input
            type="text"
            name="todos"
            placeholder="Enter comma separated list..."
            value={note.info.todos || ''}
            onClick={onOpenNoteForm}
            onChange={handleChange}
        />
    )
}