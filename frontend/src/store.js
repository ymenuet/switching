import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  formationListReducer,
  formationDetailsReducer,
  formationDeleteReducer,
  formationCreateReducer,
  formationUpdateReducer,
} from './reducers/formationReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userFormationsReducer,
} from './reducers/userReducers'
import { purchaseFormationReducer } from './reducers/purchaseReducers'

const reducer = combineReducers({
  formationList: formationListReducer,
  formationDetails: formationDetailsReducer,
  formationDelete: formationDeleteReducer,
  formationCreate: formationCreateReducer,
  formationUpdate: formationUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  formationPurchase: purchaseFormationReducer,
  userFormations: userFormationsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  // userDetails: { test: 'testy' },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
