import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { Modal } from '../../../cmps/Modal.jsx'

const { useState } = React

export function NoteList({
    notes,
    onRemoveNote,
    onPinNote,
    onDuplicateNote,
    onChangeColor,
    onToggleTodo,
    onSaveNote
}) {

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

    const [modalMode, setModalMode] = useState(null)
    const [selectedNoteId, setSelectedNoteId] = useState(null)

    const isShown = modalMode !== null

    function openColorModal(noteId) {
        setSelectedNoteId(noteId)
        setModalMode('color')
    }

    function openEditModal(noteId) {
        setSelectedNoteId(noteId)
        setModalMode('edit')
    }

    function onCloseModal() {
        setModalMode(null)
        setSelectedNoteId(null)
    }

    const noteToEdit = notes.find(note => note.id === selectedNoteId)

    return (
        <section>

            <ul className="notes-list clean-list">
                {notes.map(note => (
                    <li
                        key={note.id}
                        style={{ backgroundColor: note.style.backgroundColor }}
                    >

                        <NotePreview
                            note={note}
                            onToggleTodo={onToggleTodo}
                        />

                        <div className="actions">

                            <div
                                onClick={() => openColorModal(note.id)}
                                className="icon-palette">
                            </div>

                            <div
                                onClick={() => onPinNote(note.id)}
                                className={`${note.isPinned ? 'icon-keep_off' : 'icon-keep'}`}>
                            </div>

                            <div
                                onClick={() => openEditModal(note.id)}
                                className="icon-edit_square">
                            </div>

                            <div
                                onClick={() => onDuplicateNote(note.id)}
                                className="icon-content_copy">
                            </div>

                            <div
                                onClick={() => onRemoveNote(note.id)}
                                className="icon-delete">
                            </div>

                        </div>

                    </li>
                ))}
            </ul>


            <Modal
                isShown={isShown}
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
    )
}