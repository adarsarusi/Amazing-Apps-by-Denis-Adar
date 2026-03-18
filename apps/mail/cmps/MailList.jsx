import { MailPreview } from './MailPreview.jsx'
const { Link, useParams, useNavigate } = ReactRouterDOM


export function MailList({ mails, onAction, setOnDetails, setSelectedMailId, setSearchParams }) {

  const navigate = useNavigate()

  function goToDetails(mailId) {
    setSearchParams({ mailId })
    setSelectedMailId(mailId)
    setOnDetails(true)
  }

  function handlePreviewClick(ev, mail) {
    if (ev.target.closest('.mail-actions__button')) return
    goToDetails(mail.id)
  }


  return (
    <section className='mail-container'>
      <div className='mail-container__filter'></div>
      <ul className="mail-container__list">
        {(!mails.length) && <div className='mail-container__no-mail icon-search u-icon-center'>
          No messages matched your search. Try using search options such as sender, date, size and more.
        </div>}
        {mails.map((mail) => (
          <li onClick={() => handlePreviewClick(ev, mail)} className="mail-list__item" key={mail.id}>
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
