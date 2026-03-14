export function NotePreview({ note }) {
    return <article className="note-preview">
        <h2>{note.info.title}</h2>
        <p className="note-text">{note.info.txt}</p>
    </article>
}