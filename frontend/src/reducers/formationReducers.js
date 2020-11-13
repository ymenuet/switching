import {
  FORMATION_LIST_REQUEST,
  FORMATION_LIST_SUCCESS,
  FORMATION_LIST_FAIL,
  FORMATION_DELETE_SUCCESS,
  FORMATION_DELETE_REQUEST,
  FORMATION_DELETE_FAIL,
} from '../constants/formationConstants'

export const formationListReducer = (state = { formations: [] }, action) => {
  switch (action.type) {
    case FORMATION_LIST_REQUEST:
      return { loading: true, formations: [] }
    case FORMATION_LIST_SUCCESS:
      return { loading: false, formations: action.payload }
    case FORMATION_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const formationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FORMATION_DELETE_REQUEST:
      return { loading: true, formations: [] }
    case FORMATION_DELETE_SUCCESS:
      return { loading: false, formations: action.payload }
    case FORMATION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
