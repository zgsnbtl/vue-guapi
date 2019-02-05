// 获取章节内容(根据章节获取内容)
import axios from 'axios'
// export function chapterContent (link) {
//   return axios.get(`/content/chapter/${link}`)
// }
// 书籍信息
export function book(id) {
  return axios.get(`/api/btoc?view=summary&book=${id}`)
}
// 获取目录列表
export function bookmulu(id) {
  return axios.get(`/api/btoc/${id}?view=chapters&channel=mweb`)
}
// 获取章节内容
export function bookcontent(link) {
  return axios.get(`/content/chapter/${link}`)
}
// 首页书籍
export function bootd(id) {
  return axios.get(`/api/recommendPage/books/${id}`)
}
// 获取首页更多书籍
export function bookList(id, st = 1, size = 10) {
  return axios.post(`/api/recommendPage/node/books/all/${id}`, {
    ajax: 'ajax',
    st: st,
    size: size
  })
}
// 书籍信息
export function books(id) {
  return axios.get(`/api/book/${id}`)
}
// 评论
export function bookpl(id, limit) {
  return axios.get(`/api/post/review/best-by-book?book=${id}&limit=${limit}`)
}
// 同类推荐
export function bookrecommend(id) {
  return axios.get(`/api/book/${id}/recommend`)
}
// 分类
export function bookcly() {
  return axios.get(`/api/cats/lv2/statistics`)
}
// 获取分类详情
export function bookclyinfo(gender, type, major, minor, start, limit) {
  return axios.get(`/api/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
}
// 获取分类（带子类）
export function bookclylist() {
  return axios.get(`/api/cats/lv2`)
}
// 获取排行榜
export function bookrank() {
  return axios.get(`/api/ranking/gender`)
}
// 获取排行榜分类书籍
export function bookranks(id) {
  return axios.get(`/api/ranking/${id}`)
}
// 搜索
export function booksearch(key) {
  return axios.get(`/api/book/fuzzy-search?query=${key}`)
}
// 换源
export function bookhy(id) {
  return axios.get(`/api/atoc/?view=summary&book=${id}`)
}