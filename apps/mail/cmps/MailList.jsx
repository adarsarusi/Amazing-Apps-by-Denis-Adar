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
      isArchive: 'No Archived messages. To Archive a message, click on the Archived outline beside any message or conversation.',
      isDraft: `You don't have any saved drafts. Saving a draft allows you to keep a message you aren't ready to send yet..`,
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
        {(!mails.length) && (
          <p className='mail-container__no-mail u-icon-center'>
            {folderName.includes('isInbox') && <span className='icon-search u-icon-center'></span>}
            {emptyListMassage(folderName)}
          </p>
        )}
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
