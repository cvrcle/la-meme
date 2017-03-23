import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import InitialActions from '../redux/Initial'

// need second to get rid of error
export function* sagaTest() {
  try {
    yield call(delay, 300)
    yield put(InitialActions.doneWait())
  } catch (err) {
    console.error('sagaTest Error')
  }
}
