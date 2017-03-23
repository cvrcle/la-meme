import { combineReducers } from 'redux'

// import rootSaga from '../sagas'
import configureStore from './CreateStore'

// import { reducer as initialReducer } from './Initial'

import lesson from './lesson'

export default () => {
  const rootReducer = combineReducers({
    // initialReducer,
    lesson,
  })
  return configureStore(rootReducer)
}