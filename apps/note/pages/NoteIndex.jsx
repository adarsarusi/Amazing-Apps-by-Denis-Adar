const { useState, useEffect, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'


import { Modal } from '../../../cmps/Modal.jsx'
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [isShown, setIsShown] = useState(false)
    const [isNoting, setIsNoting] = useState(false)
    const noteFormRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (!isNoting) return
            if (noteFormRef.current && !noteFormRef.current.contains(ev.target)) {
                onCloseNoteForm()
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => window.removeEventListener('click', handleClickOutside)
    }, [isNoting])

    function onOpenModal() {
        console.log('Modal has opened...')
        setIsShown(true)
    }

    function onCloseModal() {
        console.log('Modal has closed...')
        setIsShown(false)
    }

    function onOpenNoteForm() {
        setIsNoting(true)
    }

    function onCloseNoteForm() {
        setIsNoting(false)
    }

    function onRemoveNote() { }

    function onSaveNote(ev) {
        ev.preventDefault()
        onCloseNoteForm()
     }

    return <section className="container">Notes app
        <React.Fragment>
            <NoteFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy} />

            <form ref={noteFormRef} onSubmit={onSaveNote}>
                {isNoting && <input type="text" placeholder="Title" />}
                <input
                    type="text"
                    placeholder="Take a note..."
                    onClick={onOpenNoteForm}
                />
                {isNoting && <button className="save-btn">Save</button>}
            </form>


            {/* currently placeholder will use to edit */}
            {/* <input type="text" placeholder="Take a note..." onClick={onOpenModal}/> */}
            {/* <Modal
                isShown={isShown}
                onClose={onCloseModal}>

                    <h1>Title:</h1>
            </Modal> */}

            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote} />
        </React.Fragment>
    </section>
}
