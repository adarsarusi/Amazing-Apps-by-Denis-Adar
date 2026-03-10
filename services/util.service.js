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
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(wordCount = 100) {
  const words = [
    'the',
    'sky',
    'above',
    'the',
    'port',
    'was',
    'the',
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
    'the',
    'story',
    'bit',
    'by',
    'bit',
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
    'was',
    'a',
    'different',
    'story',
    'a',
    'pleasure',
    'to',
    'burn',
    'it',
    'was',
    'a',
    'bright',
    'cold',
    'day',
    'in',
    'April',
    'and',
    'the',
    'clocks',
    'were',
    'striking',
    'thirteen',
  ]

  let remaining = wordCount
  let result = []

  while (remaining > 0) {
    let sentenceLength = Math.min(remaining, Math.floor(Math.random() * 11) + 4)
    let sentence = []

    for (let i = 0; i < sentenceLength; i++) {
      sentence.push(words[Math.floor(Math.random() * words.length)])
    }

    let sentenceStr = sentence.join(' ')
    sentenceStr =
      sentenceStr.charAt(0).toUpperCase() + sentenceStr.slice(1) + '.'

    result.push(sentenceStr)
    remaining -= sentenceLength

    if (Math.random() > 0.8 && remaining > 0) {
      result.push('\n\n')
    }
  }

  return result.join(' ').replace(/ \n\n /g, '\n\n')
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
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames[date.getMonth()]
}

function toCap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
