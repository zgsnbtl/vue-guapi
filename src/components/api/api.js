// 获取章节内容(根据章节获取内容)
import axios from "axios";
// export function chapterContent (link) {
//   return axios.get(`/content/chapter/${link}`)
// }
// 书籍信息
export function book(id) {
  return axios.get(`/btoc?view=summary&book=${id}`);
}
// 获取目录列表
export function bookCatalogue(id) {
  return axios.get(`/btoc/${id}?view=chapters&channel=mweb`);
}
// 获取章节内容
export function bookContent(link) {
  return axios.get(`/chapter2/${link}`);
}
// 首页书籍
export function bootd(id) {
  return axios.get(`/api/recommendPage/books/${id}`);
}
// 获取首页更多书籍
export function bookList(id, st = 1, size = 10) {
  return axios.post(`/api/recommendPage/node/books/all/${id}`, {
    ajax: "ajax",
    st: st,
    size: size,
  });
}
// 书籍信息
export function books(id) {
  return axios.get(`/api/book/${id}`);
}
// 同类推荐
export function bookRecommend(id) {
  return axios.get(`/api/book/${id}/recommend`);
}
// 分类
export function bookCly() {
  return axios.get(`/api/cats/lv2/statistics`);
}
// 获取分类详情
export function bookClyInfo(gender, type, major, minor, start, limit) {
  return axios.get(
    `/api/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`
  );
}
// 获取分类（带子类）
export function bookClyList() {
  return axios.get(`/api/cats/lv2`);
}
// 获取排行榜
export function bookRank() {
  return axios.get(`/api/ranking/gender`);
}
// 获取排行榜分类书籍
export function bookRanks(id) {
  return axios.get(`/api/ranking/${id}`);
}
// 搜索
export function bookSearch(key) {
  return axios.get(`/books/auto-suggest?query=${key}`);
}
// 换源
export function bookHy(id) {
  return axios.get(`/api/atoc/?view=summary&book=${id}`);
}
// 轮播
export function getBanner() {
  return axios.get(
    `/api/recommendPage/node/spread/575f74f27a4a60dc78a435a3?pl=ios`
  );
}

// 书籍列表
export function getBookList(data) {
  return axios({
    method: 'get',
    url: "/category/booklist",
    params: data,
  });
}
// 评论
export function bookComment(data) {
  return axios({
    method: 'get',
    url: "/api/post/review/best-by-book",
    params: data,
  });
}