
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React

const folderList = [
  { name: 'inbox', filter: 'isInbox' },
  { name: 'starred', filter: 'isStarred' },
  { name: 'important', filter: 'isImportant' },
  { name: 'sent', filter: 'isSent' },
  { name: 'draft', filter: 'isDraft' },
  { name: 'archive', filter: 'isArchive' },
  { name: 'trash', filter: 'isTrash' },
  { name: 'spam', filter: 'isSpam' },
]


export function MailFolderList({ filterBy, setFilterBy, mails, setOnCompose }) {

  const [mailCount, setMailCount] = useState({ draftCount: 0, unreadCount: 0 })

  function handleFolderChange(filter) {
    setFilterBy(prevFilters => ({ ...prevFilters, folder: filter }))
  }

  useEffect(() => {
    fetchMailCount()
  }, [mails])


  function fetchMailCount() {
    mailService.query({ folder: 'isInbox' })
      .then(unreadMails => {
        const unreadCount = unreadMails.filter(mail => !mail.isRead).length
        setMailCount(prevCounts => ({ ...prevCounts, unreadCount }))
      })

    mailService.query({ folder: 'isDraft' })
      .then(draftMails => {
        const draftCount = draftMails.filter(mail => mail.isDraft).length
        setMailCount(prevCounts => ({ ...prevCounts, draftCount }))
      })
  }

  return (
    <React.Fragment>
      <button className='mail-compose__button icon-edit u-icon-center'
        onClick={() => setOnCompose(true)}>Compose</button>
      <section className='mail-folder-list minimal-scrollbar'>
        <ul>
          {folderList.map(folder => (
            <li key={folder.name}>
              <MailFolder
                name={folder.name}
                filter={folder.filter}
                handleFolderChange={handleFolderChange}
                filterBy={filterBy}
                mailCount={mailCount}
              />
            </li>
          ))}
        </ul>
      </section>
    </React.Fragment>
  )
}

function MailFolder({ name, filter, handleFolderChange, filterBy: { folder }, mailCount: { draftCount, unreadCount } }) {
  const isFolder = folder.toLowerCase().includes(name)
  return (
    <a
      onClick={() => handleFolderChange(filter)}
      className={`mail-folder ${isFolder ? 'selected' : ''}`}
    >
      <div className='mail-folder__content'>
        <span className={`mail-folder__icon ${isFolder ? `icon-fill-${name}` : `icon-${name}`}`}></span>
        {utilService.toCap(name)}
      </div>
      {name === 'inbox' && unreadCount !== 0 && <span>{unreadCount}</span>}
      {name === 'draft' && draftCount !== 0 && <span>{draftCount}</span>}
    </a>
  )
}


