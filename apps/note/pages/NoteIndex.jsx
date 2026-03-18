const { useState, useEffect } = React
const { useSearchParams, useNavigate } = ReactRouterDOM

import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { AppHeader } from '../../../cmps/AppHeader.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

import { noteService } from '../services/note.service.js'
import { Modal } from '../../../cmps/Modal.jsx'
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] =
        useState(noteService.getFilterFromSearchParams(searchParams))

    const [modalMode, setModalMode] = useState(null)
    const [selectedNoteId, setSelectedNoteId] = useState(null)

    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)

    const noteToEdit = notes.find(note => note.id === selectedNoteId)

    const navigate = useNavigate()

    const dataToPass = {
        id: 123,
        title: 'Example Item',
        details: 'This is some data from the first page.'
    }

    const handleNavigation = () => {
        navigate('/mail/', { state: dataToPass })
    }

    function onSendAsEmail(noteId) {
        noteService.get(noteId)
            .then(note => {
                dataToPass.name = note.info.title

                switch (note.type) {
                    case 'NoteTxt':
                         dataToPass.details = note.info.txt
                         break

                    case 'NoteImg':
                         dataToPass.details = note.info.url
                         break

                    case 'NoteVideo':
                         dataToPass.details = note.info.url
                         break

                    case 'NoteTodos':
                         dataToPass.details = note.info.todos
                         break
                }
                console.log(dataToPass)
                handleNavigation()
            })
    }

    const colors = [
        { name: 'Coral', color: '#faafa8' },
        { name: 'Peach', color: '#f39f76' },
        { name: 'Sand', color: '#fff8b8' },
        { name: 'Mint', color: '#e2f6d3' },
        { name: 'Sage', color: '#b4ddd3' },
        { name: 'Fog', color: '#d4e4ed' },
        { name: 'Storm', color: '#aeccdc' },
        { name: 'Dusk', color: '#d3bfdb' },
        { name: 'Blossom', color: '#f6e2dd' },
        { name: 'Clay', color: '#e9e3d4' }
    ]

    useEffect(() => {
        loadNotes()
        setSearchParams(utilService.trimObj(filterBy))

    }, [filterBy])

    useEffect(() => {
        const editId = searchParams.get('edit')
        const colorId = searchParams.get('color')

        if (editId) {
            setSelectedNoteId(editId)
            setModalMode('edit')
        }

        else if (colorId) {
            setSelectedNoteId(colorId)
            setModalMode('color')
        }

        else {
            setSelectedNoteId(null)
            setModalMode(null)
        }

    }, [searchParams])

    function onOpenEditModal(noteId) {
        setSearchParams({ edit: noteId })
    }

    function onOpenColorModal(noteId) {
        setSearchParams({ color: noteId })
    }

    function onCloseModal() {
        setSearchParams({})
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(() => showErrorMsg('Cannot load notes'))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prev => prev.filter(note => note.id !== noteId))
                showSuccessMsg(`Note removed`)
            })
            .catch(err => showErrorMsg(`Couldn't remove note`))
    }

    function onPinNote(noteId) {
        noteService.get(noteId)
            .then(note => {
                note.isPinned = !note.isPinned
                return noteService.save(note)
            })
            .then(loadNotes)
    }

    function onChangeColor(noteId, newColor) {
        noteService.get(noteId)
            .then(note => {
                note.style.backgroundColor = newColor
                return noteService.save(note)
            })
            .then(loadNotes)
    }

    function onDuplicateNote(noteId) {
        noteService.get(noteId)
            .then(note => {
                const copy = { ...note }
                delete copy.id
                return noteService.save(copy)
            })
            .then(loadNotes)
    }

    function onToggleTodo(noteId, todoIdx) {
        noteService.get(noteId)
            .then(note => {
                note.info.todos[todoIdx].isDone = !note.info.todos[todoIdx].isDone
                return noteService.save(note)
            })
            .then(loadNotes)
    }

    function onSaveNote(noteToSave) {
        noteService.save(noteToSave)
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.some(n => n.id === savedNote.id)
                        ? prevNotes.map(n => n.id === savedNote.id ? savedNote : n)
                        : [savedNote, ...prevNotes]
                )

                showSuccessMsg(`${savedNote.info.title} saved!`)
            })
    }

    function onClearFilter() {
        setFilterBy(noteService.getDefaultFilter())
    }

    return <section className="container">
        <AppHeader filterBy={filterBy} setFilterBy={setFilterBy} />
        <NoteFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            onClearFilter={onClearFilter} />

        <NoteEdit onSaveNote={onSaveNote} />

        {!notes.length &&
            <section className="empty-notes">
                <img src="apps\note\imgs\note-icon.png" alt="" />
                <p>Your notes will appear here!</p>
            </section>}


        {pinnedNotes.length > 0 && (
            <section className="pinned-notes">
                <h3>Pinned:</h3>
                <NoteList notes={pinnedNotes}
                    onRemoveNote={onRemoveNote}
                    onPinNote={onPinNote}
                    onDuplicateNote={onDuplicateNote}
                    onToggleTodo={onToggleTodo}
                    onSendAsEmail={onSendAsEmail}
                    onOpenEditModal={onOpenEditModal}
                    onOpenColorModal={onOpenColorModal} />
            </section>
        )}

        <section className="other-notes">
            {pinnedNotes.length > 0 && <h3>Others:</h3>}
            <NoteList notes={unpinnedNotes}
                onRemoveNote={onRemoveNote}
                onPinNote={onPinNote}
                onDuplicateNote={onDuplicateNote}
                onToggleTodo={onToggleTodo}
                onSendAsEmail={onSendAsEmail}
                onOpenEditModal={onOpenEditModal}
                onOpenColorModal={onOpenColorModal} />
        </section>

        <Modal
            isShown={modalMode !== null}
            onClose={onCloseModal}
            className={modalMode === 'color' ? 'modal-color' : 'modal-edit'}
        >

            {/* COLOR PICKER */}
            {modalMode === 'color' && (
                <React.Fragment>
                    <h3>Pick a Color:</h3>

                    <div role="listbox" className="color-listbox">
                        {colors.map(color => (
                            <div
                                key={color.name}
                                role="option"
                                title={color.name}
                                className="color-option"
                                style={{ backgroundColor: color.color }}
                                onClick={() => {
                                    onChangeColor(selectedNoteId, color.color)
                                    onCloseModal()
                                }}
                            />
                        ))}
                    </div>
                </React.Fragment>
            )}

            {/* EDIT NOTE */}
            {modalMode === 'edit' && noteToEdit && (
                <React.Fragment>
                    <h3>Edit Note</h3>

                    <NoteEdit
                        note={noteToEdit}
                        onSaveNote={(updatedNote) => {
                            onSaveNote(updatedNote)
                            onCloseModal()
                        }}
                    />
                </React.Fragment>
            )}

        </Modal>
    </section>
}
