import { MailPreview } from './MailPreview.jsx'
import { mailService } from '../services/mail.service.js'

export function MailList({
  mails,
  onAction,
  setOnDetails,
  setSelectedMailId,
  setOnCompose,
  setSearchParams,
  folderName,
  onDraftEdit }) {

  function goToDetails(mailId) {
    if (folderName === 'isDraft') {
      console.log('ggs2')
      onDraftEdit(mailId)
      return
    }

    setSearchParams({ mailId })
    setSelectedMailId(mailId)
    setOnDetails(true)
  }

  function handlePreviewClick(ev, mail) {
    if (ev.target.closest('.mail-preview__button')) return
    goToDetails(mail.id)
  }

  return (
    <section className='mail-container minimal-scrollbar'>
      <div className='mail-container__filter'></div>
      <ul className="mail-container__list">
        {(!mails.length) && <div className='mail-container__no-mail icon-search u-icon-center'>
          No messages matched your search. Try using search options such as sender, date, size and more.
        </div>}
        {mails.map((mail) => (
          <li onClick={(ev) => handlePreviewClick(ev, mail)} className="mail-list__item" key={mail.id}>
            <MailPreview mail={mail}
              onAction={onAction}
              setOnDetails={setOnDetails}
              setSelectedMailId={setSelectedMailId}
              setSearchParams={setSearchParams} />
          </li>
        ))}
      </ul>
    </section >

  )
}
