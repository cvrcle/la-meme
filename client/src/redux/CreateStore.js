import { applyMiddleware, createStore } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import logger from 'redux-logger'

export default (rootReducer, rootSaga) => {
   /* ------------- Redux Configuration ------------- */
  // const sagaMiddleware = createSagaMiddleware()
  const plugins = [
    // logger(),
    // sagaMiddleware,
  ]

    /* ------------- Logger Middleware --------------- */

    /* ------------- Assemble Middleware ------------- */

  const middleware = applyMiddleware(...plugins)

  /* ------------- AutoRehydrate Enhancer ------------- */

  const store = createStore(rootReducer, middleware)
  // sagaMiddleware.run(rootSaga)

  return store
}
