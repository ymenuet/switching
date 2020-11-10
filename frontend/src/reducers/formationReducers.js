import {
  FORMATION_LIST_REQUEST,
  FORMATION_LIST_SUCCESS,
  FORMATION_LIST_FAIL,
} from '../constants/formationConstants'

export const formationListReducer = (state = { formations: [] }, action) => {
  switch (action.type) {
    case FORMATION_LIST_REQUEST:
      console.log('request')
      return { loading: true, formations: [] }
    case FORMATION_LIST_SUCCESS:
      console.log('success')
      return { loading: false, formations: action.payload }
    case FORMATION_LIST_FAIL:
      console.log('fail')
      return { loading: false, error: action.payload }
    default:
      console.log('hi man')
      return state
  }
}
