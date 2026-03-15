
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React

const folderList = [
  { name: 'inbox', filter: 'isInbox' },
  { name: 'starred', filter: 'isStarred' },
  { name: 'important', filter: 'isImportant' },
  { name: 'sent', filter: 'isSent' },
  { name: 'drafts', filter: 'isDrafts' },
  { name: 'archive', filter: 'isArchive' },
  { name: 'trash', filter: 'isTrash' },
  { name: 'spam', filter: 'isSpam' },
]


export function MailFolderList({ filterBy, setFilterBy, mails }) {

  const [inboxUnread, setInboxUnread] = useState(0)

  function handleFolderChange(filter) {
    setFilterBy(prevFilters => ({ ...prevFilters, folder: filter }))
  }

  useEffect(() => {
    fetchUnreadCount()
  }, [mails])



  function fetchUnreadCount() {
    mailService.query({ folder: 'isInbox' })
      .then(inboxMails => {
        const unreadCount = inboxMails.filter(mail => !mail.isRead).length
        setInboxUnread(unreadCount)
      })
  }

  return (
    <section className='mail-folder-list'>
      <ul>
        {folderList.map(folder => (
          <li key={folder.name}>
            <MailFolder
              name={folder.name}
              filter={folder.filter}
              handleFolderChange={handleFolderChange}
              filterBy={filterBy}
              inboxUnread={inboxUnread}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function MailFolder({ name, filter, handleFolderChange, filterBy: { folder }, inboxUnread }) {

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

      {name === 'inbox' && <span>{inboxUnread}</span>}
    </a>
  )
}


