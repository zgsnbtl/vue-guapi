import {
  SET_HEADER_INFO,
  SET_BOOK,
  BOOK_UPDATE,
  BOOK_USERCOLOR,
  BOOK_USERFONT
} from './mutationsType'
import {
  setStore
} from './const'
export default {
  [SET_HEADER_INFO](state, header) {
    state.header.headtype = header.headtype
    state.header.headtitle = header.headtitle
  },
  [SET_BOOK](state, book) {
    state.calbook = book
    setStore('SHEFLBOOK', state.calbook)
  },
  [BOOK_UPDATE](state, books) {
    state.shuajiabook = books
    setStore('BOOK_UPDATE', state.shuajiabook)
  },
  [BOOK_USERCOLOR](state, usercolor) {
    state.usercolor = usercolor
    setStore('BOOK_USERCOLOR', state.usercolor)
  },
  [BOOK_USERFONT](state, userfont) {
    state.userfont = userfont
    setStore('BOOK_USERFONT', state.userfont)
  }
}
