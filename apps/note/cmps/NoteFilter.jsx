const { useState, useEffect } = React

export function NoteFilter({ filterBy, setFilterBy, onClearFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    const types = ['NoteTxt', 'NoteImg', 'NoteVideo', 'NoteTodos']

    function handleChange(ev) {
        const { type, value, name } = ev.target

        setFilterByToEdit(prev => (
            { ...prev, [name]: type === 'text' ? value : +value }))
    }

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        setFilterByToEdit(filterBy)
    }, [filterBy])

    function toggleIsActive(type) {
        setFilterByToEdit(prev => ({
            ...prev,
            type
        }))
    }

    return <div className="note-filter">

        <section className="btn-group">
            {types.map(type => (

                <img key={type}
                    className={filterByToEdit.type === type ? 'active' : ''}
                    onClick={() => toggleIsActive(type)}
                    src={`apps/note/imgs/types/${type}.png`} alt="" />

            ))}

            <img onClick={onClearFilter}
                src="apps\note\imgs\types\ban-solid-full.svg" alt="" />
        </section>

    </div>
}