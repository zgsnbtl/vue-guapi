import {
  SET_HEADER_INFO
} from './mutationsType'
export default {
  [SET_HEADER_INFO](state, header) {
    state.header.headtype = header.headtype
    state.header.headtitle = header.headtitle
  }
}
