
const { useState, useRef, useEffect } = React
const { useParams, useLocation } = ReactRouterDOM
const { Link, NavLink } = ReactRouterDOM

import { MailFilter } from "../apps/mail/cmps/MailFilter.jsx"

export function AppHeader({ filterBy, setFilterBy }) {

  const [stateApps, setStateApps] = useState('hide')
  const inputRef = useRef('')

  const location = useLocation()
  const pageName = location.pathname

  const { appLogo, storageDb } = _onAppChange(pageName)

  function openAppsDrawer(state) {
    inputRef.current = stateApps
    setStateApps(state)
  }

  document.addEventListener("keydown", (event) => {
    if (inputRef.current === '') return
    if (event.key === "Escape") {
      openAppsDrawer(inputRef.current)
    }
  })

  return (
    <header className={`app-header ${pageName.includes('/note') ? 'shadow' : ''}`}>

      <img className="app-header__logo" src={appLogo} />

      <MailFilter filterBy={filterBy} setFilterBy={setFilterBy} pageName={pageName} />

      <nav className="app-header__nav">
        <NavLink to="/"><button className="app-header__nav-button icon-home u-icon-center"></button></NavLink>
        <button className="app-header__nav-button icon-refresh u-icon-center"
          onClick={() => localStorage.removeItem(`${storageDb}`)}></button>
        <button onClick={() => openAppsDrawer(inputRef.current)} className="app-header__nav-button icon-apps u-icon-center"></button>
        <button className="app-header__nav-button icon-account u-icon-center"></button>
      </nav>

      <div className={`app-header__apps-container ${stateApps}`}>
        <nav className="app-header__apps">
          <NavLink to="/mail"> <button className="app-header__app-button">
            <img className="app-header__app-icon" src="assets/images/logos/logo-icons/logo-icon-mail.png" alt="" />
            Ms. mail
          </button></NavLink>
          <NavLink to="/note"> <button className="app-header__app-button">
            <img className="app-header__app-icon" src="assets/images/logos/logo-icons/logo-icon-note.png" alt="" />
            Ms. Note
          </button></NavLink>
          <NavLink to="/"> <button className="app-header__app-button">
            <img className="app-header__app-icon" src="assets/images/logos/logo-icons/logo-icon-book.png" alt="" />
            Dr. Book
          </button></NavLink>
        </nav>
      </div>

    </header>
  )
}


function _onAppChange(pageName) {

  const appLogos = {
    mrMail: 'assets/images/logos/mr-mail.png',
    msNote: 'assets/images/logos/ms-note.png',
    drBook: 'assets/images/logos/dr-book.png',
    meatTeam: 'assets/images/logos/team-meat.png',
  }

  if (pageName.includes('/mail')) {
    return { appLogo: appLogos.mrMail, storageDb: 'mailDB' }
  }
  else if (pageName.includes('/note')) {
    return { appLogo: appLogos.msNote, storageDb: 'noteDB' }
  }
  else {
    return { appLogo: appLogos.meatTeam, storageDb: '' }
  }
}