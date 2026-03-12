import { LongTxt } from '../../../cmps/LongTxt.jsx'

export function MailPreview({ mail }) {
  return (
    <div className="mail-preview">
      {console.log(mail)}
      <p className="mail-preview__name">{mail.name}</p>
      <p className="mail-preview__text">
        <span className="mail-preview__subject">{mail.subject}</span>
        <span className="mail-preview__hyphen">-</span>
        {mail.body}
      </p>
      {/* <LongTxt txt={mail.body} length={80} isButton={false} className={'mail-preview__body'} />*/}
    </div>
  )
}
