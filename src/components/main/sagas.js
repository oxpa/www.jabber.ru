import {put, takeLatest} from 'redux-saga/effects';
import {fromJS} from 'immutable';

const clientsStub = [
    {
        name: 'gajim',
    },
    {
        name: 'psi'
    },
    {
        name: 'conversations'
    },
    {
        name: 'dino'
    },
    {
        name: 'xabber'
    },
    {
        name: 'pidgin'
    }
];

function* loadClients() {
    try {
        //const clients = yield call(Api);
        const payload = fromJS(clientsStub);
        yield put({type: 'LOAD_CLIENTS_SUCCESS', payload: payload})
    } catch (e) {
        yield put({type: 'LOAD_CLIENTS_FAILED'})
    }
}

function* mainSaga() {
    yield takeLatest('LOAD_CLIENTS_STARTED', loadClients)
}

export default mainSaga;
