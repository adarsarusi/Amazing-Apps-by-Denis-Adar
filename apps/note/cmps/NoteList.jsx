import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
    return <section className="">
        <ul className="notes-list clean-list">
            {notes.map(note => (
                <li key={note.id}
                    style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview note={note} />
                    <div className="actions">

                        <img className="color-picker"
                            src="apps\note\imgs\features\pallete.png" alt="" />

                        <img className="pin"
                            src="apps\note\imgs\features\pinned.png" alt="" />

                        <img className="edit"
                            src="apps\note\imgs\features\edit.png" alt="" />

                        <img className="duplicate"
                            src="apps\note\imgs\features\duplicate.png" alt="" />

                        <img onClick={() => onRemoveNote(note.id)}
                            className="btn-remove"
                            src="apps\note\imgs\features\delete.png" alt="" />

                    </div>
                </li>
            ))}
        </ul>
    </section>
}
