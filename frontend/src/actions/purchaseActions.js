import axios from 'axios'

import {
  PURCHASE_FORMATION_REQUEST,
  PURCHASE_FORMATION_SUCCESS,
  PURCHASE_FORMATION_FAIL,
} from '../constants/purchaseConstants'

export const purchaseFormation = (stripe, cardElement, bill) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PURCHASE_FORMATION_REQUEST,
    })

    const { data: clientSecret } = await axios.post('/api/payments', {
      amount: bill.amount,
      email: bill.email,
      formation: bill.formation,
      password: bill.password,
      confirmPassword: bill.confirmPassword,
    })

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: 'bob',
        email: bill.email,
      },
    })
    dispatch({
      type: PURCHASE_FORMATION_SUCCESS,
      // payload: data,
    })

    await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    })
  } catch (error) {
    dispatch({
      type: PURCHASE_FORMATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
