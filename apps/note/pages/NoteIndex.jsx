const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

import { noteService } from '../services/note.service.js'
import { Modal } from '../../../cmps/Modal.jsx'
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '' })
    // const [isShown, setIsShown] = useState(false)
    const [isNoting, setIsNoting] = useState(false)

    // function onOpenModal() {
    //     console.log('Modal has opened...')
    //     setIsShown(true)
    // }

    // function onCloseModal() {
    //     console.log('Modal has closed...')
    //     setIsShown(false)
    // }

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('Cannot load notes', err)
                showErrorMsg('Cannot load notes')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prev => prev.filter(note => note.id !== noteId))
                showSuccessMsg(`Note removed`)
            })
            .catch(err => showErrorMsg(`Couldn't remove note`))
    }

    function onSaveNote(noteToSave) {
        noteService.save(noteToSave)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
                showSuccessMsg(`${savedNote.info.title} Noted!`)
            })
    }

    function onClearFilter() {
        setFilterBy(noteService.getDefaultFilter())
    }

    return <section className="container">
        <React.Fragment>
            <NoteFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                onClearFilter={onClearFilter} />

            <NoteEdit onSaveNote={onSaveNote} />


            {/* currently placeholder will use to edit */}
            {/* <input type="text" placeholder="Take a note..." onClick={onOpenModal}/> */}
            {/* <Modal
                isShown={isShown}
                onClose={onCloseModal}>

                    <h1>Title:</h1>
            </Modal> */}


            {!notes.length &&
                <section className="empty-notes">
                    <img src="apps\note\imgs\note-icon.png" alt="" />
                    <p>Your notes will appear here!</p>
                </section>}

            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
            />
        </React.Fragment>
    </section>
}
