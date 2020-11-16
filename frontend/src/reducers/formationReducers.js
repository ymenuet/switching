import {
  FORMATION_LIST_REQUEST,
  FORMATION_LIST_SUCCESS,
  FORMATION_LIST_FAIL,
  FORMATION_DETAILS_REQUEST,
  FORMATION_DETAILS_SUCCESS,
  FORMATION_DETAILS_FAIL,
  FORMATION_DELETE_SUCCESS,
  FORMATION_DELETE_REQUEST,
  FORMATION_DELETE_FAIL,
  FORMATION_CREATE_RESET,
  FORMATION_CREATE_SUCCESS,
  FORMATION_CREATE_FAIL,
  FORMATION_CREATE_REQUEST,
  FORMATION_UPDATE_RESET,
  FORMATION_UPDATE_SUCCESS,
  FORMATION_UPDATE_FAIL,
  FORMATION_UPDATE_REQUEST,
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

export const formationDetailsReducer = (state = { formation: {} }, action) => {
  // export const formationDetailsReducer = (state = { formation: { videos: [] } }, action) => {
  switch (action.type) {
    case FORMATION_DETAILS_REQUEST:
      return { loading: true, ...state }
    case FORMATION_DETAILS_SUCCESS:
      return { loading: false, formation: action.payload }
    case FORMATION_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const formationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FORMATION_DELETE_REQUEST:
      return { loading: true }
    case FORMATION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case FORMATION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const formationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FORMATION_CREATE_REQUEST:
      return { loading: true }
    case FORMATION_CREATE_SUCCESS:
      return { loading: false, success: true, formation: action.payload }
    case FORMATION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case FORMATION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const formationUpdateReducer = (state = { formation: {} }, action) => {
  switch (action.type) {
    case FORMATION_UPDATE_REQUEST:
      return { loading: true }
    case FORMATION_UPDATE_SUCCESS:
      return { loading: false, success: true, formation: action.payload }
    case FORMATION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case FORMATION_UPDATE_RESET:
      return { formation: {} }
    default:
      return state
  }
}
