export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getRandomColor,
  padNum,
  getDayName,
  getMonthName,
  loadFromStorage,
  saveToStorage,
  toCap,
  makeRandomUsers,
  makeDate,
  trimObj
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  const val = localStorage.getItem(key)
  return JSON.parse(val)
}

function makeId(length = 6) {
  var txt = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function makeLorem(wordCount = 100, includeDot = true) {
  const words = [
    'the',
    'sky',
    'above',
    'port',
    'was',
    'color',
    'of',
    'nature',
    'tuned',
    'to',
    'a',
    'live',
    'channel',
    'all',
    'this',
    'happened',
    'more',
    'or',
    'less',
    'I',
    'had',
    'story',
    'bit',
    'by',
    'from',
    'various',
    'people',
    'and',
    'as',
    'generally',
    'happens',
    'in',
    'such',
    'cases',
    'each',
    'time',
    'it',
    'different',
    'pleasure',
    'burn',
    'bright',
    'cold',
    'day',
    'April',
    'clocks',
    'were',
    'striking',
    'thirteen',
  ]

  let remaining = wordCount
  let paragraphs = []
  let currentParagraph = []

  while (remaining > 0) {
    let sentenceLength = Math.min(remaining, Math.floor(Math.random() * 11) + 4)
    let sentenceWords = []

    for (let i = 0; i < sentenceLength; i++) {
      sentenceWords.push(words[Math.floor(Math.random() * words.length)])
    }

    let sentenceStr = sentenceWords.join(' ')
    let punctuation = includeDot ? '.' : ''
    sentenceStr = sentenceStr.charAt(0).toUpperCase() + sentenceStr.slice(1) + punctuation

    currentParagraph.push(sentenceStr)
    remaining -= sentenceLength

    if (Math.random() > 0.8 && remaining > 0) {
      paragraphs.push(currentParagraph.join(' '))
      currentParagraph = []
    }
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph.join(' '))
  }

  return paragraphs.join('\n\n')
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
  return num > 9 ? num + '' : '0' + num
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getDayName(date, locale) {
  date = new Date(date)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
  const monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Octr', 'Nov', 'Dec']
  return monthNames[date.getMonth()]
}

function toCap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function makeRandomUsers(count = 1) {
  const firstNames = ['Emma', 'Noah', 'Olivia', 'Liam', 'Ava', 'William', 'Sophia', 'Mason', 'Isabella', 'James']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'mail.com']

  const createSingleUser = () => {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const domain = domains[Math.floor(Math.random() * domains.length)]
    const num = Math.floor(Math.random() * 1000)

    return {
      firstName: fName,
      lastName: lName,
      fullName: `${fName} ${lName}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}${num}@${domain}`,
    }
  }

  if (count === 1) {
    return createSingleUser()
  }

  const users = []
  for (let i = 0; i < count; i++) {
    users.push(createSingleUser())
  }
  return users
}

function makeDate() {
  const now = new Date()
  const oneYearAgo = new Date()

  oneYearAgo.setFullYear(now.getFullYear() - 1)

  const startMs = oneYearAgo.getTime()
  const endMs = now.getTime()

  const randomMs = startMs + Math.random() * (endMs - startMs)

  return randomMs
}

function trimObj(obj) {
    const trimmedObj = {}

    for (const key in obj) {
        if (obj[key]) trimmedObj[key] = obj[key]
    }
    return trimmedObj
}