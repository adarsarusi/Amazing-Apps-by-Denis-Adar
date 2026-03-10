const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service"

export function MailIndex() {

    const [mails, setMails] = useState()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilters())

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        return mailService.query(filterBy)
            .then(setMails)
    }

    

    return <section className="container">Mail app</section>
}

