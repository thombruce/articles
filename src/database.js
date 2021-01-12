import Dexie from 'dexie'
import 'dexie-observable'

export class Database extends Dexie {
  constructor () {
    super('database')

    this.version(1).stores({
      articles: '$$id,doc,text,createdAt,updatedAt'
    })

    this.articles = this.table('articles')
  }
}
