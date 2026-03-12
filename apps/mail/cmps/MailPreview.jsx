import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail,onRemove }) {
  return (
    <div className={`mail-preview ${mail.isRead ? 'isRead' : ''}`}>
      <p className="mail-preview__name">{mail.name}</p>
      <p className="mail-preview__text">
        <span className="mail-preview__subject">{mail.subject}</span>
        <span className="mail-preview__hyphen">-</span>
        <span className="mail-preview__body">{mail.body}</span>
      </p>
      <p className="mail-preview__date">{_formatPreviewDate(mail.createdAt)}</p>
      <button className='mail-preview__button icon-delete' onClick={() => onRemove(mail.id)}></button>
    </div>
  )
}

function _formatPreviewDate(date) {
  const newDate = new Date(date)
  const day = newDate.getDay()
  const month = utilService.getMonthName(newDate)
  return day + ' ' + month + '.'
}
