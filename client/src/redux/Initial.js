import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  mountApp: null,
  sagaWait: null,
  doneWait: null,
})

export const InitialTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isMounted: false,
  waited: false,
})

/* ------------- Reducers ------------- */
const mount = (state = INITIAL_STATE) => Immutable.merge(state, { isMounted: true })
const waitSaga = (state = INITIAL_STATE) => Immutable.merge(state, { waited: true })
const doneSaga = (state = INITIAL_STATE) => Immutable.merge(state, { waited: false })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOUNT_APP]: mount,
  [Types.SAGA_WAIT]: waitSaga,
  [Types.DONE_WAIT]: doneSaga,
})

/* ------------- Selectors ------------- */
