import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const mailService = {
  query,
  get,
  remove,
  save,
  getDefaultFilters,
  getEmptyMail,
  getFilterFromSearchParams,
}

const loggedInUser = {
  email: 'support@meatteam.com',
  fullname: 'Meat Team',
}

const MAIL_KEY = 'mailDB'
utilService.loadFromStorage(MAIL_KEY) || _createMails(40)

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const {
      txt,
      from,
      to,
      subject,
      hasWords,
      dontHaveWords,
      dateFrom,
      dateTo,
      folder,
      attachments,
    } = filterBy

    if (txt) {
      const regExp = new RegExp(txt, 'i')
      mails = mails.filter((mail) =>
        regExp.test(mail.from) ||
        regExp.test(mail.to) ||
        regExp.test(mail.subject) ||
        regExp.test(mail.body)
      )
    }

    if (from) {
      const regExp = new RegExp(from, 'i')
      mails = mails.filter((mail) => regExp.test(mail.from))
    }
    if (to) {
      const regExp = new RegExp(to, 'i')
      mails = mails.filter((mail) => regExp.test(mail.to))
    }
    if (subject) {
      const regExp = new RegExp(subject, 'i')
      mails = mails.filter((mail) => regExp.test(mail.subject))
    }
    if (hasWords) {
      const regExp = new RegExp(hasWords, 'i')
      mails = mails.filter((mail) =>
        regExp.test(mail.from) ||
        regExp.test(mail.to) ||
        regExp.test(mail.subject) ||
        regExp.test(mail.body)
      )
    }

    if (dontHaveWords) {
      const regExp = new RegExp(dontHaveWords, 'i')
      mails = mails.filter(
        (mail) =>
          !regExp.test(mail.from) &&
          !regExp.test(mail.to) &&
          !regExp.test(mail.subject) &&
          !regExp.test(mail.body)
      )
    }
    if (dateFrom || dateTo) {
      const fromDate = new Date(dateFrom)
      const toDate = new Date(dateTo)
      mails = mails.filter((mail) => fromDate <= mail.createdAt && mail.createdAt <= toDate)
    }
    if (folder) {
      mails = mails.filter((mail) => mail[folder])
    }
    if (attachments && attachments.isHeld) mails = mails.filter((mail) => mail.attachments && mail.attachments.isHeld)

    mails.sort((a, b) => {
      const dateA = a.createdAt
      const dateB = b.createdAt
      return dateB - dateA
    })

    return mails

  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    mail = _setNextPrevMail(mail)
    return mail
  })
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) return storageService.put(MAIL_KEY, mail)
  else {
    mail.createdAt = new Date()
    return storageService.post(MAIL_KEY, mail)
  }
}

function getDefaultFilters(
  filterBy = {
    txt: '',
    from: '',
    to: '',
    subject: '',
    hasWords: '',
    dontHaveWords: '',
    dateFrom: '',
    dateTo: '',
    folder: 'isInbox',
    attachments: {
      isHeld: false,
      files: [],
    },
  }
) {
  return {
    txt: '',
    from: filterBy.from,
    to: filterBy.to,
    subject: filterBy.subject,
    hasWords: filterBy.hasWords,
    dontHaveWords: filterBy.dontHaveWords,
    dateFrom: filterBy.dateFrom,
    dateTo: filterBy.dateTo,
    folder: filterBy.folder,
    attachments: filterBy.attachments,
  }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilters()
  const filterBy = {}

  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

function getEmptyMail() {
  return {
    from: loggedInUser.email,
    name: loggedInUser.fullname,
    to: '',
    createdAt: '',
    subject: '',
    body: '',
    categories: [],
    labels: [],
    isRead: true,
    isStared: false,
    isImportant: false,
    isSpam: false,
    isSent: true,
    isDraft: true,
    isTrash: false,
    isArchived: false,
    attachments: {
      isHeld: false,
      files: [],
    },
  }
}

function _setNextPrevMail(mail) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
    mail.nextMailId = nextMail.id
    mail.prevMailId = prevMail.id
    return mail
  })
}

function _createMails(amount) {
  const lbls = ['Work', 'kids', 'FAMILY', 'Doctors', 'Crypto', 'DOUBLE IMPORTANT']
  const mails = []
  for (let i = 0; i < amount; i++) {
    const user = utilService.makeRandomUsers()
    const mail = {
      id: utilService.makeId(),
      subject: utilService.makeLorem(4, false),
      name: user.fullName,
      from: user.email,
      to: loggedInUser.email,
      createdAt: utilService.makeDate(),
      body: utilService.makeLorem(100),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      labels: lbls[utilService.getRandomIntInclusive[(0, 5)]],
      isInbox: true,
      isTrash: false,
      isRead: Math.random() < 0.7,
      isStared: false,
      isSent: false,
      isImportant: Math.random() < 0.3,
      isSpam: false,
      isArchived: Math.random() < 0.2,
      isDraft: false,
      attachments: {
        isHeld: Math.random() < 0.7,
        files: [],
      },
    }
    mails.push(mail)
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}



