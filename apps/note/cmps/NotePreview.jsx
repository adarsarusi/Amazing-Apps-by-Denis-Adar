export function NotePreview({ note, onToggleTodo }) {
    const PreviewCmp = getPreviewCmp(note.type)

    return <article className="note-preview">
        <h2>{note.info.title}</h2>
        <PreviewCmp note={note}
            onToggleTodo={onToggleTodo} />
    </article>
}

function getYoutubeEmbedUrl(url) {
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/)
    return match
        ? `https://www.youtube.com/embed/${match[1]}`
        : url
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

    const embedUrl = getYoutubeEmbedUrl(note.info.url)

    return (
        <iframe
            className="video-player"
            src={embedUrl}
            frameBorder="0"
            allowFullScreen
        ></iframe>
    )
}

function NoteTodosPreview({ note, onToggleTodo, isEditable }) {

    if (isEditable){
        return 
    }

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