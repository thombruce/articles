import Dexie from 'dexie'
import 'dexie-observable'

export class Database extends Dexie {
  constructor () {
    super('database')

    this.version(1).stores({
      notes: '$$id,doc,text,createdAt,updatedAt,*textWords'
    })

    this.notes = this.table('notes')

    this.notes.hook('creating', function (_primKey, obj, _trans) {
      if (typeof obj.text === 'string') obj.textWords = getAllWords(obj.text)
    })

    this.notes.hook('updating', function (mods, _primKey, _obj, _trans) {
      if (Object.prototype.hasOwnProperty.call(mods, 'text')) {
        if (typeof mods.text === 'string') {
          return { textWords: getAllWords(mods.text) }
        } else {
          return { messageWords: [] }
        }
      }
    })
  }
}

function getAllWords (text) {
  var allWordsIncludingDups = text.split(' ').filter(item => item)
  var wordSet = allWordsIncludingDups.reduce(function (prev, current) {
    prev[current] = true
    return prev
  }, {})
  return Object.keys(wordSet)
}
