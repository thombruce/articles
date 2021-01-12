import Dexie from 'dexie'
import 'dexie-observable'

export class Database extends Dexie {
  constructor () {
    super('database')

    this.version(1).stores({
      articles: '$$id,content,createdAt,updatedAt'
    })

    this.articles = this.table('articles')
  }
}
