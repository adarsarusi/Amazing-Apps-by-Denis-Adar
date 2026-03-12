import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemove }) {
  return (
    <ul className="mail-list__items">
      {mails.map((mail) => (
        <li className="mail-list__item" key={mail.id}>
          <MailPreview mail={mail} onRemove={onRemove}/>
          <div className="mail-list__actions"></div>
        </li>
      ))}
    </ul>
  )
}
