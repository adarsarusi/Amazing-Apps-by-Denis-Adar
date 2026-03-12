const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilters())

  useEffect(() => {
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService.query(filterBy).then(setMails)
  }

  function onMailRemove(mailId) {
    mailService.get(mailId).then((mail) => {
      console.log('ggs')
      mail.isTrash += 1
      console.log(mail.isTrash)
      mailService.save(mail)
      if (mail.isTrash === 2) mailService.remove(mailId)
    })
  }

  if (!mails) return <p>No messages matched your search. Try using search options such as sender, date, size and more.</p>

  return <MailList mails={mails} onRemove={onMailRemove} />
}
