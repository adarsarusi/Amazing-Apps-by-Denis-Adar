import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const mailService = {
  query,
  get,
  remove,
  save,
  getDefaultFilters,
  getEmptyMail,
}

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus'
}

const MAIL_KEY = 'Mail_DB'
utilService.loadFromStorage(MAIL_KEY)

function query(filterBy = {}) {
  return utilService.loadFromStorage(MAIL_KEY).then((mail) => {
    const { from, to, subject, hasWords, dontHaveWords, dateFrom, dateTo, searchCategory, attachments: { isHeld } } = filterBy
    if (from || hasWords || to || subject) {
      const regExp = new RegExp(from || hasWords, 'i')
      mail = mail.filter((mail) => regExp.test(mail.from) || regExp.test(mail.to) || regExp.test(mail.subject) || regExp.test(mail.body))
    }
    if (dontHaveWords) {
      const regExp = new RegExp(dontHaveWords, 'i')
      mail = mail.filter(
        (mail) => !regExp.test(mail.from) && !regExp.test(mail.to) && !regExp.test(mail.subject) && !regExp.test(mail.body)
      )
    }
    if (dateFrom || dateTo) {
      const fromDate = new Date(dateFrom)
      const toDate = new Date(dateTo)
      mail = mail.filter((mail) => fromDate <= mail.createdAt && mail.createdAt <= toDate)
    }
    if (searchCategory) {
      mail = mail.filter((mail) => {
        const { isArchived, isImportant, isStared, isSpam } = mail
        return (isArchived || isImportant || isStared || isSpam) === searchCategory
      })
    }
    // Attachment isHeld?
    if (isHeld) {
      mail = mail.filter((mail) => mail.attachments.isHeld === true)
    }
    return mail
  })
}

function get(mailId) {
  return storageService.getMail(MAIL_KEY, mailId).then((mail) => {
    mail = _setNextPrevMail(mail)
    return mail
  })
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) return storageService.put(MAIL_KEY, mail)
  else return storageService.post(MAIL_KEY, mail)

}

function getEmptyMail() {
  const mail = {
    from: '',
    to: '',
    date: '',
    subject: '',
    body: '',
    categories: [],
    labels: [],
    isRead: false,
    isStared: false,
    isImportant: false,
    isSpam: false,
    isArchived: false,
    attachments: {
      isHeld: false,
      files: [],
    },
  }
  return mail
}



function getDefaultFilters(
  filterBy = {
    from: '',
    to: '',
    subject: '',
    hasWords: '',
    dontHaveWords: '',
    dateFrom: '',
    dateTo: '',
    searchCategory: '',
    attachments: {
      isHeld: true,
      files: [],
    }
  }
) {
  return {
    from: filterBy.from,
    to: filterBy.to,
    subject: filterBy.subject,
    hasWords: filterBy.hasWords,
    dontHaveWords: filterBy.dontHaveWords,
    dateFrom: filterBy.dateFrom,
    dateTo: filterBy.dateTo,
    searchCategory: filterBy.searchCategory,
    attachments: filterBy.attachments.isHeld,
  }
}

function _setNextPrevMail(mail) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    const nextMail = mail[mailIdx + 1] ? mail[mailIdx + 1] : mail[0]
    const prevMail = mail[mailIdx - 1] ? mail[mailIdx - 1] : mail[mail.length - 1]
    mail.nextMail = nextMail?.id
    mail.prevMail = prevMail?.id
    return mail
  })
}


function _createMails(amount) {
  const lbls = ['Work', 'kids', 'FAMILY', 'Doctors', 'Crypto', 'DOUBLE IMPORTANT']
  const mails = []
  for (let i = 0; i < amount; i++) {
    const mail = {
      id: utilService.makeId(),
      from: loggedinUser.email,
      to: utilService.makeEmail(),
      createdAt: utilService.makeDate(),
      body: utilService.makeLorem(100),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      labels: lbls[utilService.getRandomIntInclusive[0, 5]],
      isRead: false,
      isStared: false,
      isImportant: false,
      isSpam: false,
      isArchived: false,
      attachments: {
        isHeld: Math.random() < 0.7,
        files: [],
      },

    }
    mails.push(mail)
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}
