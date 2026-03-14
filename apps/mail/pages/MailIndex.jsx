const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilters())

  useEffect(() => {
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService.query(filterBy)
      .then(setMails)
  }

  function onMailAction(mailId, action) {
    mailService.get(mailId)
      .then((mail) => {

        if (action === 'remove') {
          if (mail.isTrash) {
            mailService.remove(mailId).then(loadMails)
            return
          } else {
            mail.isInbox = !mail.isInbox
            mail.isTrash = !mail.isTrash
          }
        }

        if (action === 'archive') {
          mail.isInbox = !mail.isInbox
          mail.isArchive = !mail.isArchive
        }

        if (action === 'starred') {
          mail.isStarred = !mail.isStarred
        }

        if (action === 'important') {
          mail.isImportant = !mail.isImportant
        }

        if (action === 'read') {
          mail.isRead = !mail.isRead
        }

        mailService.save(mail)
          .then(loadMails)
      })
  }

  if (!mails) return <p>No messages matched your search. Try using search options such as sender, date, size and more.</p>


  return (
    <section className='mail-index'>
      <MailFolderList filterBy={filterBy} mails={mails} setFilterBy={setFilterBy} />
      <MailFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <MailList mails={mails} onAction={onMailAction} />
    </section>
  )
}
