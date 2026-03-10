import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
    return <section className="">
        <ul className="notes-list clean-list">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview note={note} />
                    <div className="actions">
                        {/* <Link to={`/book/${book.id}`}>
                            <button className="btn-details">Details</button>
                        </Link> */}

                        <button
                            onClick={() => onRemoveNote(note.id)}
                            className="btn-remove">x</button>
                    </div>
                </li>
            ))}
        </ul>
    </section>
}
