const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'


export function RootCmp() {


  return (
    <Router>
      <section className="root-cmp">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />} />
          <Route path="/note" element={<NoteIndex />} />
        </Routes>
        <UserMsg />
      </section>
    </Router>
  )
}
