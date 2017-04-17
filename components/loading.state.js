export const LOAD = 'LOAD';
export const itemLoading = (item) => ({type: LOAD, kind: item})
export const loading = (state = {}, action) => {
    if (action.type != LOAD) return state
    console.log('trying set "',action.kind,'" item loading')
    let new_state = Object.assign({}, state)
    if (action.kind in new_state) {
        // invert value we have
        new_state[action.kind] = !new_state[action.kind]
    } else {
        // set loading, if key is not know
        new_state[action.kind] = true
    }
    return new_state
}
