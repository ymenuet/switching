import {
  PURCHASE_FORMATION_REQUEST,
  PURCHASE_FORMATION_SUCCESS,
  PURCHASE_FORMATION_FAIL,
} from '../constants/purchaseConstants'

export const purchaseFormationReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_FORMATION_REQUEST:
      return { loading: true, purchaseInfo: '' }
    case PURCHASE_FORMATION_SUCCESS:
      return { loading: false, success: true, purchaseInfo: action.payload }
    case PURCHASE_FORMATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
