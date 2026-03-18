import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

export function MailDetails({ onAction, folderName, setOnDetails, selectedMailId, setSearchParams, searchParams }) {

  const [mail, setMail] = useState(null)

  const navigate = useNavigate()
  const mailId = searchParams.get('mailId')

  function backFromDetails() {
    navigate(`/mail?folder=${folderName}`)
    setOnDetails(false)
  }

  useEffect(() => {
    if (mailId)
      mailService.get(mailId)
        .then(setMail)
  }, [mailId])

  if (!mail) return <div></div>

  return (
    <section className='mail-details'>
      <div className='mail-details__actions'>
        <div className='mail-details__actions-left'>
          <button onClick={() => backFromDetails()} className='mail-details__button icon-back'></button>
          <button className='mail-details__button icon-archive' onClick={() => onAction(mail.id, 'archive')}></button>
          <button className='mail-details__button icon-spam' onClick={() => onAction(mail.id, 'spam')}></button>
          <button className='mail-details__button icon-trash' onClick={() => onAction(mail.id, 'remove')}></button>
          <button className={`mail-details__button ${mail.isRead ? 'icon-unread' : 'icon-read'}`} onClick={() => onAction(mail.id, 'read')}></button>
        </div>
        <div className='mail-details__actions-right'>
          <Link to={`/mail?mailId=${mail.prevMailId}`}>
            <button className='mail-details__button icon-left-arrow'></button>
          </Link>
          <Link to={`/mail?mailId=${mail.nextMailId}`}>
            <button className='mail-details__button icon-right-arrow'></button>
          </Link>
        </div>
      </div>

      <section className='mail-details__content'>
        <h2 className='mail-details__subject'>{mail.subject}</h2>
        <div className='mail-details__sender-details'>
          <img className="mail-details__sender-pic" src="assets\images\mail\profile.webp" alt="" />
          <div className='mail-details__sender-info'>
            <p>{mail.name}<span>{mail.from}</span></p>
            <p>{mail.to}</p>
          </div>
        </div>
        <p className='mail-details__body'>{mail.body}</p>
        <div className='mail-details__send-actions'>
          <button className='mail-details__button-big icon-reply'>Reply</button>
          <button className='mail-details__button-big icon-forward'>Forward</button>
        </div>
      </section>
    </section >

  )
}
