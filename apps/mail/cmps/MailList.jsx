import { MailPreview } from './MailPreview.jsx'

export function MailList({
  mails,
  onAction,
  setOnDetails,
  setSearchParams,
  folderName,
  onDraftEdit }) {

  function goToDetails(mailId) {
    if (folderName === 'isDraft') {
      onDraftEdit(mailId)
      return
    }

    setSearchParams({ mailId })
    setOnDetails(true)
  }

  function emptyListMassage(folderName) {
    const emptyMassage = {
      isTrash: 'No conversations in Trash.',
      isSpam: 'Hooray, no spam here!',
      isInbox: 'No messages matched your search. Try using search options such as sender, date, size and more!',
      isStarred: 'No starred messages. Stars let you give messages a special status to make them easier to find. To star a message, click on the star outline beside any message or conversation.',
      isImportant: 'No Important messages. Important let you give messages a special status to make them easier to find. To Important a message, click on the Important outline beside any message or conversation.',
    }
    return emptyMassage[folderName]
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
          {emptyListMassage(folderName)}
        </div>}
        {mails.map((mail) => (
          <li onClick={(ev) => handlePreviewClick(ev, mail)} className="mail-list__item" key={mail.id}>
            <MailPreview mail={mail}
              onAction={onAction} />
          </li>
        ))}
      </ul>
    </section >

  )
}
