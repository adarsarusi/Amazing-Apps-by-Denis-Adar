const { useState, useEffect, useRef } = React

import { noteService } from '../services/note.service.js'

export function NoteEdit({ note = null, onSaveNote, getMail, searchParams, setSearchParams }) {

    const [noteToEdit, setNoteToEdit] = useState(
        note ? { ...note } : noteService.getEmptyNote()
    )

    const [isNoting, setIsNoting] = useState(!!note)

    const noteFormRef = useRef(null)

    const EditorCmp = getEditorCmp(noteToEdit.type)

    // When editing another note in modal
    useEffect(() => {
        if (note) {
            setNoteToEdit({ ...note })
            setIsNoting(true)
        }
    }, [note])

    useEffect(() => {
        if (getMail)
            setNoteToEdit(getMail)

    }, [getMail])

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

    function handleFile(ev) {
        const file = ev.target.files[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = () => {
            setNoteToEdit(prev => ({
                ...prev,
                info: {
                    ...prev.info,
                    url: reader.result
                }
            }))
        }

        reader.readAsDataURL(file)
    }

    function changeType(type) {
        setNoteToEdit(prev => ({
            ...prev,
            type,
            info: getInfoByType(prev.info.title, type)
        }))
    }

    function getInfoByType(prevTitle, type) {
        switch (type) {
            case 'NoteTxt':
                return { title: prevTitle, txt: '' }

            case 'NoteImg':
                return { title: prevTitle, url: '' }

            case 'NoteVideo':
                return { title: prevTitle, url: '' }

            case 'NoteTodos':
                return { title: prevTitle, todos: '' }

            default:
                return { title: prevTitle, txt: '' }
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
                .map(txt => ({ txt, doneAt: null }))
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
                    handleFile={handleFile}
                    onOpenNoteForm={onOpenNoteForm}
                />
            </div>

            {isNoting &&
                <div className="note-controls">

                    <img onClick={() => changeType('NoteTxt')}
                        src="apps/note/imgs/types/NoteTxt.png" />

                    <img onClick={() => changeType('NoteImg')}
                        src="apps/note/imgs/types/NoteImg.png" />

                    <img onClick={() => changeType('NoteVideo')}
                        src="apps/note/imgs/types/NoteVideo.png" />

                    <img onClick={() => changeType('NoteTodos')}
                        src="apps/note/imgs/types/NoteTodos.png" />

                    <button className="save-btn">Save</button>

                </div>
            }
        </form>
    )
}

function getEditorCmp(type) {
    switch (type) {
        case 'NoteTxt':
            return NoteEditTxt
        case 'NoteImg':
            return NoteEditImg
        case 'NoteVideo':
            return NoteEditVideo
        case 'NoteTodos':
            return NoteEditTodos
        default:
            return NoteEditTxt
    }
}

function NoteEditTxt({ note, handleChange, onOpenNoteForm }) {
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

function NoteEditImg({ note, handleChange, handleFile, onOpenNoteForm }) {
    return (
        <React.Fragment>
            <input
                type="text"
                name="url"
                placeholder="Enter image URL..."
                value={note.info.url}
                onClick={onOpenNoteForm}
                onChange={handleChange}
            />
            <label htmlFor="fileInput" className="custom-file-upload">
                Choose Picture
            </label>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFile}
            ></input>
            {note.info.url && <img src={note.info.url} className="preview-img" />}
        </React.Fragment>
    )
}

function NoteEditVideo({ note, handleChange, onOpenNoteForm }) {
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

function NoteEditTodos({ note, handleChange, onOpenNoteForm }) {
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