import {put, takeLatest} from 'redux-saga/effects';
import {fromJS} from 'immutable';

const clientsStub = [
    {
        name: "Xabber",
        imgUrl: "https://lh3.googleusercontent.com/5ZCn-z0We-puYjQ_t1m3RATzuakUurga5gRvWkpNVZHhmgdHvIQj_tpvs93CKebOqquT=h600",
        link: "https://xabber.com"
    },
    {
        name: "Conversations",
        imgUrl: "https://lh3.ggpht.com/ib4uM-oxW1Q8zSHib_UJVPaw73G5AHF1B3Swx_MXDXNzXf3hBDqgHnMWtYxChZ1I4fs=h600",
        link: "https://conversations.im"
    },
    {
        name: "Yaxim",
        imgUrl: "https://lh4.ggpht.com/9VvBWxJ7-S6SWb9_x8uVS8C_VVe9khX649Dzm_MWQ12a88hYexDCmMmgF4DuwEssHQ=h600",
        link: "https://yaxim.org/"
    },
    {
        name: "Adium",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/AdiumX_screenshot.png",
        link: "https://adium.im/"
    },
    {
        name: "Pidgin",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Pidgin_Ubuntu_Buddy_List.png",
        link: "https://pidgin.im/"
    },
    {
        name: "IM+",
        imgUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c2/Im_plus_screenshot.png",
        link: "https://plus.im/"
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
