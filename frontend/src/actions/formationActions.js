import axios from '../axios'
import {
  FORMATION_LIST_REQUEST,
  FORMATION_LIST_SUCCESS,
  FORMATION_LIST_FAIL,
  FORMATION_DETAILS_REQUEST,
  FORMATION_DETAILS_SUCCESS,
  FORMATION_DETAILS_FAIL,
  FORMATION_DELETE_REQUEST,
  FORMATION_DELETE_SUCCESS,
  FORMATION_DELETE_FAIL,
  FORMATION_CREATE_REQUEST,
  FORMATION_CREATE_SUCCESS,
  FORMATION_CREATE_FAIL,
  FORMATION_UPDATE_REQUEST,
  FORMATION_UPDATE_SUCCESS,
  FORMATION_UPDATE_FAIL,
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

export const getFormationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FORMATION_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/formations/${id}`)
    dispatch({
      type: FORMATION_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FORMATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteFormation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORMATION_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/formations/${id}`, config)

    dispatch({
      type: FORMATION_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: FORMATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createFormation = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORMATION_CREATE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/formations`, {}, config)
    dispatch({
      type: FORMATION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FORMATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateFormation = (formation) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORMATION_UPDATE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/formations/${formation._id}`,
      formation,
      config
    )
    dispatch({
      type: FORMATION_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FORMATION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
