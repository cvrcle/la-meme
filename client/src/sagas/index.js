import { takeEvery } from 'redux-saga'

/* ------------- Types ------------- */
import { InitialTypes } from '../redux/Initial'

/* ------------- Sagas ------------- */
import { sagaTest } from './InitialSagas'

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield [
    takeEvery(InitialTypes.SAGA_WAIT, sagaTest)
  ]
}
