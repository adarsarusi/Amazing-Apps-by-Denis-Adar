const { useState, useEffect, useRef } = React

import { eventBusService } from '../services/event-bus.service.js'
export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  // test
  // useEffect(() => {
  //   setMsg((prevMsg) => ({ ...prevMsg, txt: 'Enable desktop notifications for Gmail.' }))
  // }, [])

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return

  const className = (msg) ? `${msg.type} open` : ''
  return (
    <section className={`user-msg ${className}`}>
      {msg && msg.txt}
      <button onClick={closeMsg} className='user-msg__icon icon-close mail-action-btn'></button>
    </section>
  )
}

