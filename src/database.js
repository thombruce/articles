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

  async getArticles () {
    const articles = await this.articles.toArray()
    return articles
  }

  // async getArticle (id) {
  //   const article = await this.articles.get(id)
  //   return article
  // }

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
