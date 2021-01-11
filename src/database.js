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

  async getArticles (offset = 0, limit = 10) {
    const articles = await this.articles
      .orderBy('updatedAt')
      .offset(offset)
      .limit(limit)
      .reverse()
      .toArray()
    return articles
  }

  async getArticle (id) {
    const article = await this.articles.get(id)
    return article
  }

  addArticle (data) {
    return this.articles.add(data)
  }

  updateArticle (id, data) {
    return this.articles.update(id, data)
  }

  deleteArticle (id) {
    return this.articles.delete(id)
  }
}
