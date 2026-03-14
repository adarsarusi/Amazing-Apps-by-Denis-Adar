const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

import { noteService } from '../services/note.service.js'
import { Modal } from '../../../cmps/Modal.jsx'
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [isNoting, setIsNoting] = useState(false)

    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)

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

    function onPinNote(noteId) {
        noteService.get(noteId)
            .then(note => {
                note.isPinned = !note.isPinned
                return noteService.save(note)
            })
            .then(loadNotes)
    }

    function onChangeColor(noteId, newColor){
        noteService.get(noteId)
            .then(note =>{
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
                        onChangeColor={onChangeColor} />
                </section>
            )}

            <section className="other-notes">
                <h3>Others:</h3>
                <NoteList notes={unpinnedNotes}
                    onRemoveNote={onRemoveNote}
                    onPinNote={onPinNote}
                    onDuplicateNote={onDuplicateNote}
                    onChangeColor={onChangeColor} />
            </section>

            {/* <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onPinNote={onPinNote}
            /> */}
        </React.Fragment>
    </section>
}
