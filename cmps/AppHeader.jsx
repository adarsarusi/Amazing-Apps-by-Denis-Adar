
const { useState, useRef, useEffect } = React
const { useParams, useLocation } = ReactRouterDOM
const { Link, NavLink } = ReactRouterDOM


const appLogos = {
  mrMail: '/assets/imges/logos/mr-mail.png',
  msNote: '/assets/imges/logos/ms-note.png',
  drBook: '/assets/imges/logos/dr-book.png',
  meatTeam: '/assets/imges/logos/team-meat.png',
}

import { MailFilter } from "../apps/mail/cmps/MailFilter.jsx"


export function AppHeader({ filterBy, setFilterBy }) {

  const [stateApps, setStateApps] = useState('hide')
  const inputRef = useRef('')

  const location = useLocation()
  const pageName = location.pathname

  console.log('pageName: ', pageName)

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


  let logo = ''
  if (pageName === '/mail') logo = appLogos.mrMail
  else if (pageName === '/note') logo = appLogos.msNote
  else if (pageName === '/') logo = appLogos.meatTeam


  return (
    <header className="app-header">

      <img className="app-header__logo" src={logo} />

      {(pageName !== '/') && <MailFilter filterBy={filterBy} setFilterBy={setFilterBy} />}

      <nav className="app-header__nav">
        <NavLink to="/"><button className="app-header__nav-button icon-home u-icon-center"></button></NavLink>
        <button className="app-header__nav-button icon-refresh u-icon-center"
          onClick={() => localStorage.removeItem("Mail_DB")}></button>
        <button onClick={() => openAppsDrawer(inputRef.current)} className="app-header__nav-button icon-apps u-icon-center"></button>
        <button className="app-header__nav-button icon-account u-icon-center"></button>
      </nav>

      <div className={`app-header__apps-container ${stateApps}`}>
        <nav className="app-header__apps">
          <NavLink to="/mail"> <button className="app-header__app-button">
            <img className="app-header__app-icon" src="/assets/imges/logos/logo-icons/logo-icon-mail.png" alt="" />
            Ms. mail
          </button></NavLink>
          <NavLink to="/note"> <button className="app-header__app-button">
            <img className="app-header__app-icon" src="/assets/imges/logos/logo-icons/logo-icon-note.png" alt="" />
            Ms. Note
          </button></NavLink>
          <NavLink to="*"> <button className="app-header__app-button">
            <img className="app-header__app-icon" src="/assets/imges/logos/logo-icons/logo-icon-book.png" alt="" />
            Dr. Book
          </button></NavLink>
        </nav>
      </div>

    </header>
  )
}
