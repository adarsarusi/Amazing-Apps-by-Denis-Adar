import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail, onAction, setOnDetails, setSelectedMailId, setSearchParams }) {


  return (
    <div className={`mail-preview ${mail.isRead ? 'isRead' : ''}`}>
      <p className={`mail-preview__name ${mail.name === 'Draft' ? 'isDraft' : ''}`}>{mail.name}</p>
      <p className="mail-preview__text">
        <span className="mail-preview__subject">{mail.subject}</span>
        <span className="mail-preview__hyphen">-</span>
        <span className="mail-preview__body">{mail.body}</span>
      </p>
      <p className="mail-preview__date">{_formatPreviewDate(mail.createdAt)}</p>
      <div className="mail-preview__actions">
        <div className='mail-preview__actions__left'>
          <button
            className={`mail-preview__button mail-action-btn ${mail.isStarred ? 'icon-fill-starred' : 'icon-starred'}`}
            onClick={() => onAction(mail.id, 'starred')}>
          </button>
          <button
            className={`mail-preview__button mail-action-btn ${mail.isImportant ? 'icon-fill-important' : 'icon-important'}`}
            onClick={() => onAction(mail.id, 'important')}>
          </button>
        </div>
        <div className='mail-preview__actions__right'>
          <button className='mail-preview__button icon-archive mail-action-btn' onClick={() => onAction(mail.id, 'archive')}></button>
          <button className='mail-preview__button icon-trash mail-action-btn' onClick={() => onAction(mail.id, 'remove')}></button>
          <button className={`mail-preview__button mail-action-btn ${mail.isRead ? 'icon-unread' : 'icon-read'}`} onClick={() => onAction(mail.id, 'read')}></button>
        </div>

      </div>
    </div>
  )
}

function _formatPreviewDate(date) {
  const now = new Date()
  const nowDay = now.getDate()
  const nowMonth = now.getMonth()
  const nowYear = now.getFullYear()

  const ev = new Date(date)
  const evDay = ev.getDate()
  const evMonth = ev.getMonth()
  const evYear = ev.getFullYear()

  const evMonthName = utilService.getMonthName(ev)

  if (evYear === nowYear &&
    nowMonth === evMonth &&
    nowDay === evDay) {

    const evTime = ev.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
    return evTime
  }

  if (evYear < nowYear) {
    const d = utilService.padNum(evDay)
    const m = utilService.padNum(evMonth)
    const y = utilService.padNum(evYear)

    return d + '/' + m + '/' + y
  }

  return evMonthName + ' ' + evDay
}