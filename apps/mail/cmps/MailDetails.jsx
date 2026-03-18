import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

export function MailDetails({ onAction, folderName, setOnDetails, selectedMailId, setSearchParams, searchParams }) {

  const [mail, setMail] = useState(null)

  const navigate = useNavigate()
  const mailId = searchParams.get('mailId')
  const folder = searchParams.get('folder')


  function backFromDetails() {
    navigate(`/mail?folder=${folderName}`)
    setOnDetails(false)
  }

  function onActionBackFromDetails(mailId, action) {
    onAction(mailId, action)
    navigate(`/mail?folder=${folderName}`)
    setOnDetails(false)
  }

  useEffect(() => {
    if (mailId)
      mailService.get(mailId)
        .then(setMail)
  }, [mailId])

  useEffect(() => {
    if (!folder) return
    navigate(`/mail?folder=${folderName}`)
    setOnDetails(false)
  }, [folder])

  if (!mail) return <div></div>

  return (
    <section className='mail-details'>
      <div className='mail-details__actions'>
        <div className='mail-details__actions-left'>
          <button onClick={() => backFromDetails()} className='mail-details__button-back icon-back mail-action-btn'></button>
          <button className='mail-details__button icon-archive mail-action-btn' onClick={() => onActionBackFromDetails(mail.id, 'archive')}></button>
          <button className='mail-details__button icon-spam mail-action-btn' onClick={() => onActionBackFromDetails(mail.id, 'spam')}></button>
          <button className='mail-details__button icon-trash mail-action-btn' onClick={() => onActionBackFromDetails(mail.id, 'remove')}></button>
          <button className={`mail-details__button mail-action-btn ${mail.isRead ? 'icon-unread' : 'icon-read'}`} onClick={() => onActionBackFromDetails(mail.id, 'read')}></button>
          <button className={'mail-details__button mail-action-btn icon-note'}></button>
        </div>
        <div className='mail-details__actions-right'>
          <Link to={`/mail?mailId=${mail.prevMailId}`}>
            <button className='mail-details__button icon-left-arrow mail-action-btn'></button>
          </Link>
          <Link to={`/mail?mailId=${mail.nextMailId}`}>
            <button className='mail-details__button icon-right-arrow mail-action-btn'></button>
          </Link>
        </div>
      </div>

      <section className='mail-details__content'>
        <h2 className='mail-details__subject'>{mail.subject}</h2>
        <img className="mail-details__sender-pic" src="assets\images\mail\profile.webp" alt="" />
        <div className='mail-details__sender-details'>
          <div className='mail-details__sender-info'>
            <p className="mail-details__sender-name">{mail.name}
              <span className="mail-details__sender-mail">{`<${mail.from}>`}</span>
            </p>
            <p className="mail-details__sender-to">{`to ${mail.to}`}</p>
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
