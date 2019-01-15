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
  return axios.get(`/api//btoc/${id}?view=chapters&channel=mweb`)
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
// 评论
export function bookpl(id, limit) {
  return axios.get(`/api/post/review/best-by-book?book=${id}&limit=${limit}`)
}
