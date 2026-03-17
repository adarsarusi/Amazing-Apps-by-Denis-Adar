// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
const notes = utilService.loadFromStorage(NOTE_KEY)
if (!notes || !notes.length) _createNotes()

function _createNotes() {
    const types = ['NoteTxt', 'NoteImg', 'NoteVideo', 'NoteTodos']
    const colors = ['#faafa8', '#f39f76', '#fff8b8', '#e2f6d3', '#e9e3d4',
        '#b4ddd3', '#d4e4ed', '#aeccdc', '#d3bfdb', '#f6e2dd']
    const notes = []
    for (let i = 0; i < 8; i++) {
        const note = {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: types[utilService.getRandomIntInclusive(0, 3)],
            isPinned: Math.random() > 0.7,
            style: {
                backgroundColor: colors[utilService.getRandomIntInclusive(0, 9)]
            },
            info: {
                title: _makeLorem(3),
            }
        }

        switch (note.type) {
            case 'NoteTxt':
                note.info.txt = _makeLorem(10)
                break

            case 'NoteImg':
                note.info.url = `https://picsum.photos/500`
                break

            case 'NoteVideo':
                note.info.url = 'https://www.youtube.com/watch?v=OOmRInABehI'
                break

            case 'NoteTodos':
                note.info.todos = [
                    { txt: "Task1", isDone: false },
                    { txt: "Task2", isDone: true },
                    { txt: "Task3", isDone: false }
                ]
                break
        }
        notes.push(note)
    }

    utilService.saveToStorage(NOTE_KEY, notes)
}

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')

                notes = notes.filter(note =>
                    regExp.test(note.info.title) ||
                    regExp.test(note.info.txt)
                )
            }

            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }

            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(title = '', txt = '') {
    return {
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff8b8'
        },
        info: {
            title,
            txt
        }
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        type: ''
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}

    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function _makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color', 'of nature', 'tuned', 'to', 'a live channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)]
        if (size >= 1) txt += ' '
    }
    return txt
}
