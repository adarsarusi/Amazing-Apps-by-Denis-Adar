
const { useState, useEffect } = React
const { useLocation } = ReactRouterDOM


export function MailFilter({ filterBy, setFilterBy }) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const location = useLocation()
  const pageName = location.pathname

  function handleChange(ev) {
    ev.preventDefault()
    const { type, name, value } = ev.target

    setFilterByToEdit(prev => (
      { ...prev, [name]: type === 'text' ? value : +value || value }
    ))
  }

  function submitSearch(ev) {
    ev.preventDefault()
    setFilterBy(filterByToEdit)
  }

  useEffect(() => {
    if (pageName.includes('/note'))
      setFilterBy(filterByToEdit)
    else
      setFilterByToEdit(filterByToEdit)
  }, [filterByToEdit])


  return <form className='mail-filter'>
    <div className="mail-filter__search-bar">
      <div className="mail-filter__actions">
        <button onClick={(ev) => submitSearch(ev)}
          className="mail-filter__button icon-search"></button>
        <button type="button" className="mail-filter__button icon-tune"></button>
      </div>
      <input
        className="mail-filter__input"
        value={filterByToEdit.txt}
        onChange={ev => handleChange(ev)}
        placeholder='Search mail'
        name='txt'
        type='text'
      />
    </div>
  </form>
}
