import axios from '../axios'
import {
  FORMATION_LIST_REQUEST,
  FORMATION_LIST_SUCCESS,
  FORMATION_LIST_FAIL,
} from '../constants/formationConstants'

export const listFormations = () => async (dispatch) => {
  try {
    dispatch({ type: FORMATION_LIST_REQUEST })
    const { data } = await axios.get('/api/formations')
    dispatch({
      type: FORMATION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FORMATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
