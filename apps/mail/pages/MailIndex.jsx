const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { AppHeader } from '../../../cmps/AppHeader.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'


export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [onCompose, setOnCompose] = useState(false)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilters())

  useEffect(() => {
    loadMails()
  }, [filterBy, onCompose])

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
            { mail.isInbox && (mail.isInbox = !mail.isInbox) }
            { mail.isSent && (mail.isSent = !mail.isSent) }
            { mail.isDraft && (mail.isDraft = !mail.isDraft) }
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

      {onCompose && < MailCompose setOnCompose={setOnCompose} />}

      <AppHeader
        filterBy={filterBy}
        setFilterBy={setFilterBy} />

      <MailFolderList
        filterBy={filterBy}
        mails={mails} setFilterBy={setFilterBy}
        onCompose={onCompose}
        setOnCompose={setOnCompose} />

      <MailList
        mails={mails}
        onAction={onMailAction} />
    </section>
  )
}
