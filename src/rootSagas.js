import {fork} from 'redux-saga/effects';

import mainSage from './components/main/sagas';

export default function* rootSaga() {
    yield fork(mainSage)
}
