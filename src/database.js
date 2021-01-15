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

// At present we can't search the Database by text and order by date at the same time.
// orderBy and where simply will not work together.

// A potential solution looks a bit like this:

// this.version(1).stores({
//   notes: '$$id,doc,text,createdAt,updatedAt,*textWords,[textWords+updatedAt]'
// })

// In theory, anyway, [textWords+updatedAt] would create a combined index, but I do not
// know if this is possible with the array-type index that is *textWords.

// If it works, it would allow me to do the below:

// db.notes
//   .where('[textWords+updatedAt]')
//   .startsWithAnyOfIgnoreCase(words)
//   .offset(offset)
//   .limit(limit)
//   .reverse()

// It doesn't actually use the orderBy function (incompatible with where)
// but it does use the joined index.
//
// ...but I do not know if it would even work with startsWithAnyOfIgnoreCase
// Examples typically use .between(), where the second value uses the min and
// max key from the index... between essentially orders them.

// .between(["foo", Dexie.minKey], ["foo", Dexie.maxKey])

// The above searches for "foo" in the first value, and orders by the second,
// so it does seem pretty .between() specific.

// See also: https://dexie.org/docs/Compound-Index#matching-first-part-only
// And: https://github.com/dfahlander/Dexie.js/issues/297#issuecomment-492023301

// ***

// For an idea as to how to add full text search for multiple words at once
// see: https://github.com/dfahlander/Dexie.js/issues/281

// ***

// Another option for reintroducing orderBy is to... instead of using .where()
// use .filter()
//
// .filter() works on the results of the initial query, and is not a part of
// the query itself... so I don't know how it would function with, say,
// offset and limit... but... we can cycle through the search until we reach
// the end of the index... That works as a solution, it's just less performative
// than using a proper index.
