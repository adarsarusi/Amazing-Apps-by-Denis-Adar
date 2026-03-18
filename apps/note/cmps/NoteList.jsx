import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { Modal } from '../../../cmps/Modal.jsx'

export function NoteList({
    notes,
    onRemoveNote,
    onPinNote,
    onDuplicateNote,
    onToggleTodo,
    onSendAsEmail,
    onOpenEditModal,
    onOpenColorModal
}) {

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
                                onClick={() => onOpenColorModal(note.id)}
                                className="icon-palette">
                            </div>

                            <div
                                onClick={() => onPinNote(note.id)}
                                className={`${note.isPinned ? 'icon-keep_off' : 'icon-keep'}`}>
                            </div>

                            <div
                                onClick={() => onOpenEditModal(note.id)}
                                className="icon-edit_square">
                            </div>

                            <div
                                onClick={() => onDuplicateNote(note.id)}
                                className="icon-content_copy">
                            </div>

                            <div
                                onClick={() => onSendAsEmail(note.id)}
                                className="icon-stacked_email">
                            </div>

                            <div
                                onClick={() => onRemoveNote(note.id)}
                                className="icon-delete">
                            </div>

                        </div>

                    </li>
                ))}
            </ul>
        </section>
    )
}