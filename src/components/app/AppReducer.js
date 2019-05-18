import {Map} from "immutable";

const initialState = Map({
    waiting: false,
    failed: false,
    token: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_STARTED':
            return state.set('failed', false).set('waiting', true);
        case 'LOGIN_SUCCESSFUL':
            return state.set('token', action.token).set('failed', false).set('waiting', false);
        case 'LOGIN_FAILED':
            return state.set('failed', true).set('waiting', false);
        default:
            return state;
    }
};


