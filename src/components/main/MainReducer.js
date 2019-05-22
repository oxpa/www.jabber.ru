import {List, Map} from "immutable";

const initialState = Map({
    clients: List(),
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CLIENTS_SUCCESS':
            return state.set('clients', action.payload);
        default:
            return state;
    }
};


