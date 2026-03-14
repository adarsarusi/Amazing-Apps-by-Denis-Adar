import { NotePreview } from '../cmps/NotePreview.jsx'
import { Modal } from '../../../cmps/Modal.jsx'

const { useState, useEffect } = React

export function NoteList({ notes, onRemoveNote, onPinNote, onDuplicateNote, onChangeColor }) {

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

    const [selectedNoteId, setSelectedNoteId] = useState(null)

    const isShown = selectedNoteId !== null

    function onOpenModal(noteId) {
        setSelectedNoteId(noteId)
    }

    function onCloseModal() {
        setSelectedNoteId(null)
    }

    return <section className="">
        <ul className="notes-list clean-list">
            {notes.map(note => (
                <li key={note.id}
                    style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview note={note} />
                    <div className="actions">

                        <div onClick={() => onOpenModal(note.id)}
                            className="icon-palette"></div>

                        <div onClick={() => onPinNote(note.id)}
                            className={` ${note.isPinned ? 'icon-keep_off' : 'icon-keep'}`}></div>

                        <div className="icon-edit_square"></div>

                        <div onClick={() => onDuplicateNote(note.id)}
                            className="icon-content_copy"></div>

                        <div onClick={() => onRemoveNote(note.id)}
                            className="icon-delete"></div>

                    </div>
                </li>
            ))}
        </ul>

        <Modal
            isShown={isShown}
            onClose={onCloseModal}>

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
                            console.log(selectedNoteId)
                            onCloseModal()
                        }}
                    ></div>
                ))}
            </div>

        </Modal>
    </section>
}
