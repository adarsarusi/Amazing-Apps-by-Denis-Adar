export function NotePreview({ note, onToggleTodo }) {
    const PreviewCmp = getPreviewCmp(note.type)

    return <article className="note-preview">
        <h2>{note.info.title}</h2>
        {/* <p className="note-text">{note.info.txt}</p> */}
        <PreviewCmp note={note}
            onToggleTodo={onToggleTodo} />
    </article>
}

function getPreviewCmp(type) {
    switch (type) {
        case 'NoteTxt':
            return NoteTxtPreview
        case 'NoteImg':
            return NoteImgPreview
        case 'NoteVideo':
            return NoteVideoPreview
        case 'NoteTodos':
            return NoteTodosPreview
        default:
            return NoteTxtPreview
    }
}

function NoteTxtPreview({ note }) {
    return <p className="note-text">{note.info.txt}</p>
}

function NoteImgPreview({ note }) {
    return <img src={note.info.url} alt="" />
}

function NoteVideoPreview({ note }) {
    return <iframe className="video-player"
        src={note.info.url}
    ></iframe>
}

function NoteTodosPreview({ note, onToggleTodo }) {
    return <ul>
        {note.info.todos.map((todo, idx) => (
            <li key={idx}
                className={` ${todo.isDone ? 'done' : ''}`}
                onClick={() => onToggleTodo(note.id, idx)}>
                {todo.txt}
            </li>
        ))}
    </ul>
}