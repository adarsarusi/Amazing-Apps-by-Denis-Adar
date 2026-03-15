import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onAction }) {
  return (
    <section className='mail-container'>
      <div className='mail-container__filter'></div>
    <ul className="mail-container__list">
      {mails.map((mail) => (
        <li className="mail-list__item" key={mail.id}>
          <MailPreview mail={mail} onAction={onAction} />
        </li>
      ))}
    </ul>
    </section>

  )
}
