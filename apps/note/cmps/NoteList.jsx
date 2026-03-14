import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({ notes, onRemoveNote, onPinNote }) {
    return <section className="">
        <ul className="notes-list clean-list">
            {notes.map(note => (
                <li key={note.id}
                    style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview note={note} />
                    <div className="actions">

                        <div className="icon-palette"></div>

                        <div onClick={() => onPinNote(note.id)}
                        className={` ${note.isPinned ? 'icon-keep_off' : 'icon-keep'}`}></div>

                        <div className="icon-edit_square"></div>

                        <div className="icon-content_copy"></div>

                        <div onClick={() => onRemoveNote(note.id)}
                            className="icon-delete"></div>

                    </div>
                </li>
            ))}
        </ul>
    </section>
}
