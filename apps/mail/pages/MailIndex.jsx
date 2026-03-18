const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { AppHeader } from '../../../cmps/AppHeader.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
import { utilService } from '../../../services/util.service.js'


export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [onCompose, setOnCompose] = useState(searchParams.get('onCompose') === 'true')
  const [onDetails, setOnDetails] = useState(false)
  const [draftId, setDraftId] = useState(null)
  const [selectedMailId, setSelectedMailId] = useState(null)
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

  const folderName = searchParams.get('folder')

  function setOnComposeParams() {
    const params = new URLSearchParams(searchParams)
    params.set('onCompose', String(onCompose))
    setSearchParams(params)
  }

  function onDraftEdit(id) {
    setDraftId(id)
    setOnCompose(true)
  }

  useEffect(() => {
    loadMails()
    setSearchParams(utilService.trimObj(filterBy))
  }, [filterBy, onCompose])

  useEffect(() => {
    setSearchParams({ folder: 'isInbox' })
    setOnCompose(searchParams.get('onCompose') === 'true')
  }, [])

  useEffect(() => {
    setOnComposeParams()
  }, [onCompose])


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
            if (mail.isInbox) mail.isInbox = false
            if (mail.isSent) mail.isSent = false
            if (mail.isDraft) mail.isDraft = false
            if (mail.isStarred) mail.isStarred = false
            if (mail.isImportant) mail.isImportant = false
            if (mail.isDraft) mail.isDraft = false
            if (mail.isArchive) mail.isArchive = false
            mail.isTrash = !mail.isTrash
          }
        }

        if (action === 'archive') {
          mail.isInbox = !mail.isInbox
          mail.isArchive = !mail.isArchive
        }

        if (action === 'spam') {
          mail.isInbox = !mail.isInbox
          mail.isSpam = !mail.isSpam
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

  if (!mails) return <p className='icon-search'>No messages matched your search. Try using search options such as sender, date, size and more.</p>


  return (
    <section className='mail-index'>

      {onCompose && < MailCompose
        setOnCompose={setOnCompose}
        draftId={draftId}
        setDraftId={setDraftId}
        onAction={onMailAction} />}

      {onDetails && < MailDetails
        onAction={onMailAction}
        folderName={folderName}
        selectedMailId={selectedMailId}
        setOnDetails={setOnDetails}
        searchParams={searchParams}
        setSearchParams={setSearchParams} />}

      <AppHeader
        filterBy={filterBy}
        setFilterBy={setFilterBy} />

      <MailFolderList
        filterBy={filterBy}
        mails={mails} setFilterBy={setFilterBy}
        onCompose={onCompose}
        setOnCompose={setOnCompose} />

      {!onDetails && <MailList
        mails={mails}
        onAction={onMailAction}
        setOnDetails={setOnDetails}
        setSelectedMailId={setSelectedMailId}
        onDraftEdit={onDraftEdit}
        searchParams={searchParams}
        folderName={folderName}
        setSearchParams={setSearchParams} />}
    </section>
  )
}
