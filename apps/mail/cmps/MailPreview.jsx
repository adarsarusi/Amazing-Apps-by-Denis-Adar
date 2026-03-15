import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail, onAction }) {
  return (
    <div className={`mail-preview ${mail.isRead ? 'isRead' : ''}`}>
      <p className="mail-preview__name">{mail.name}</p>
      <p className="mail-preview__text">
        <span className="mail-preview__subject">{mail.subject}</span>
        <span className="mail-preview__hyphen">-</span>
        <span className="mail-preview__body">{mail.body}</span>
      </p>
      <p className="mail-preview__date">{_formatPreviewDate(mail.createdAt)}</p>
      <div className="mail-preview__actions">
        <div className='mail-preview__actions__left'>
          <button
            className={`mail-actions__button ${mail.isStarred ? 'icon-fill-starred' : 'icon-starred'}`}
            onClick={() => onAction(mail.id, 'starred')}>
          </button>
          <button
            className={`mail-actions__button ${mail.isImportant ? 'icon-fill-important' : 'icon-important'}`}
            onClick={() => onAction(mail.id, 'important')}>
          </button>
        </div>
        <div className='mail-preview__actions__right'>
          <button className='mail-actions__button icon-archive' onClick={() => onAction(mail.id, 'archive')}></button>
          <button className='mail-actions__button icon-trash' onClick={() => onAction(mail.id, 'remove')}></button>
          <button className={`mail-actions__button ${mail.isRead ? 'icon-unread' : 'icon-read'}`} onClick={() => onAction(mail.id, 'read')}></button>
        </div>

      </div>
    </div>
  )
}

function _formatPreviewDate(date) {
  const newDate = new Date(date)
  const day = newDate.getDay()
  const month = utilService.getMonthName(newDate)
  return day + ' ' + month + '.'
}
