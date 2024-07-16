import { legacy_createStore as createStore } from 'redux'
/* import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; */

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)

/* const store = configureStore({
  reducer: rootReducer,
}); */

export default store;
