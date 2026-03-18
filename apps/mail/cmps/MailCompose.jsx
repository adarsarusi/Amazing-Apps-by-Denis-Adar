import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM


export function MailCompose({ state = null, setOnCompose }) {

  const [newMail, setNewMail] = useState(mailService.getEmptyMail)
  const params = useParams()

  useEffect(() => {
    if (params.id)
      mailService.get(params.id)
        .then(setNewMail)
  }, [params.id])

  function handleChange({ target }) {
    const { name: prop, type } = target
    let { value } = target

    if (type === 'checkbox') {
      value = target.checked
    }

    if (prop.includes('.')) {
      const [parent, child] = prop.split('.')
      setNewMail(prev => ({
        ...prev, [parent]: {
          ...prev[parent], [child]: value
        }
      }))

    } else {
      setNewMail(prev => ({ ...prev, [prop]: value }))
    }
  }

  function deleteDraftCondition() {
    if (newMail.id)
      () => onAction(newMail.id, 'remove')
    else {
      setOnCompose(false)
    }
  }

  function saveDraft() {

    if (!newMail.body && !newMail.subject && !newMail.to) {
      return setOnCompose(false)
    }

    if (!newMail.subject) newMail.subject = '(no subject)'

    newMail.name = 'Draft'
    newMail.isSent = false
    mailService.save(newMail)
      .then(() => {
        setOnCompose(false)
      })
  }

  function sendEmail(ev) {
    ev.preventDefault()

    if (!newMail.subject) newMail.subject = '(no subject)'

    newMail.isDraft = false
    mailService.save(newMail)
      .then(() => {
        setOnCompose(false)
      })
  }

  const {
    to,
    subject,
    body,
    attachments: {
      isHeld,
      files: [],
    },
  } = newMail

  return (
    <section className="mail-compose">


      <div className="mail-compose__header">
        <p className="mail-compose__title">New Message</p>
        <div className="mail-compose__actions">
          <button type="button"
            className="mail-compose__action-btn mail-compose__action-btn--header icon-minimize u-icon-center"
            onClick={() => deleteDraftCondition()}>
          </button>

          <button type="button"
            className="mail-compose__action-btn mail-compose__action-btn--header icon-maximize u-icon-center"
            onClick={() => deleteDraftCondition()}>
          </button>

          <button type="button"
            className="mail-compose__action-btn mail-compose__action-btn--header icon-close u-icon-center"
            onClick={() => saveDraft()}>
          </button>
        </div>
      </div>

      <form className="mail-compose__form" onSubmit={ev => sendEmail(ev)}>
        <div className="mail-compose__form-content">
          <input
            className="mail-compose__input"
            value={to}
            onChange={handleChange}
            placeholder="Recipients"
            type="email"
            name="to"
          />
          {!state &&
            <input
              className="mail-compose__input"
              value={subject}
              onChange={handleChange}
              placeholder="Subject"
              type="text"
              name="subject"
            />}
          {state &&
            <input
              className="mail-compose__input"
              value={state.name}
              onChange={handleChange}
              placeholder="Subject"
              type="text"
              name="subject"
            />}
          {!state &&
            <textarea
              className="mail-compose__textarea"
              value={body}
              onChange={handleChange}
              type="text"
              name="body"
            />}
          {state &&
            <textarea
              className="mail-compose__textarea"
              value={state.details}
              onChange={handleChange}
              type="text"
              name="body"
            />}
        </div>

        <div className="mail-compose__footer">
          <div className="mail-compose__footer-actions">
            <button className="mail-compose__submit-btn">Send
              <span className="icon-sent u-icon-center"></span>
            </button>
            <input
              className="mail-compose__checkbox"
              checked={isHeld}
              onChange={handleChange}
              type="checkbox"
              name="attachments.isHeld"
            />
          </div>

          <button type="button"
            className="mail-compose__action-btn mail-compose__action-btn--footer icon-trash u-icon-center"
            onClick={() => deleteDraftCondition()}>
          </button>
        </div>

      </form>
    </section>
  )
}
