import {
  SET_HEADER_INFO,
  SET_BOOK,
  BOOK_UPDATE,
  BOOK_userColor,
  BOOK_userFonts
} from './mutationsType'
import {
  setStore
} from './const'
export default {
  [SET_HEADER_INFO](state, header) {
    state.header.headType = header.headType
    state.header.headTitle = header.headTitle
  },
  [SET_BOOK](state, book) {
    state.calBook = book
    setStore('SHEFLBOOK', state.calBook)
  },
  [BOOK_UPDATE](state, books) {
    state.bookrack = books
    setStore('BOOK_UPDATE', state.bookrack)
  },
  [BOOK_userColor](state, userColor) {
    state.userColor = userColor
    setStore('BOOK_userColor', state.userColor)
  },
  [BOOK_userFonts](state, userFonts) {
    state.userFonts = userFonts
    setStore('BOOK_userFonts', state.userFonts)
  }
}
