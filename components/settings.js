import * as config from './config';
import {some, checkFetchStatus} from './helpers';
import {itemLoading} from './loading.state';
import { Scrollbars } from 'react-custom-scrollbars';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

const SETTINGS = 'SETTINGS'; // set setting action
const FETCH = 'FETCH'; // start fetching from server
const VALUE = 'values';
const ERROR = 'errors';

class settings extends React.Component {
    render ()  {
        let props = this.props
        if (props.loading) {return (<div className="r-settings">
                <div className="loading"></div>
            </div>
        )}
        return <div className="r-settings"> 
        <Scrollbars autoHide>
          <div className='settings-default'>
            <span>По умолчанию, сообщения будут:</span>
            <select value={props.historyDefault} onChange={props.setHistoryDefault} >
              {Object.keys(props.historyDefaultOptions).map((cv) => ( 
                  <option  value={cv} key={cv}>{props.historyDefaultOptions[cv]}</option>
              ))}
            </select>
          </div>
          <div className="settings-always">
            <span>Переписка с этими контактами будет сохраняться всегда:</span>
            <textarea value={props.historyAlwaysList} 
                onChange={props.setHistoryList('always')}
                onBlur={props.validate}
                placeholder="1 jid на строку (user@jabber.tld)">
            </textarea>
            <span className="errortext">{props.always_err?"Ошибка в списке контактов":null}</span>
          </div>
          <div className="settings-never">
            <span>Переписка с этими контактами не будет сохраняться никогда:</span>
            <textarea value={props.historyNeverList} 
                onChange={props.setHistoryList('never')}
                onBlur={props.validate}>
            </textarea>
            <span className="errortext">{props.never_err?"Ошибка в списке контактов":null}</span>
          </div>
          <div className="settings-save">
            <span>{props.form_err}</span>
            <button onClick={props.saveSettings}>Сохранить настройки</button>
          </div>
        </Scrollbars>
      </div>
    }
}



const mapStateToSettingsProps = (state) => {
    let defaultOptions = {roster:"сохраняться, если собеседник в ростере", always:"сохраняться всегда", never:"не сохраняться никогда"}
    return {
        loading: state.loading.settings || false,
        historyDefaultOptions: defaultOptions,
        historyDefault: state.settings[VALUE].default,
        historyAlwaysList: Array.prototype.join.call(state.settings[VALUE].always,"\n"),
        historyNeverList: Array.prototype.join.call(state.settings[VALUE].never,"\n"),
        always_err: state.settings[ERROR].always,
        never_err: state.settings[ERROR].never,
        form_err: state.settings[ERROR].form
    }
}
const mapDispatchToSettingsProps = (dispatch) => ({
        setHistoryDefault : (ev) => {dispatch(setSettingsValue('default', ev.target.value))},
        setHistoryList : (list) => (ev)=>{dispatch(setSettingsValue(list, ev.target.value.split('\n')))},
        saveSettings : () => {dispatch(saveSettings())},
        validate: ()=> {dispatch(validateSettingsLists())}
    }
)
export const Settings = ReactRedux.connect(mapStateToSettingsProps, mapDispatchToSettingsProps)(settings)

export const fetchSettings = () => (dispatch, getState) => {
    let item = 'settings'
    let state = getState()
    if (!state.user.loggedin) {
        console.log('user is not logged in')
        return () => {}
    }
    if (state.loading.settings) {
        console.log('Settings are already being fetched')
        return () => {}
    }
    dispatch(itemLoading(item))
    fetch(config.apiBase + 'mam/' + item, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((response) => checkFetchStatus(response,true))
      .then((json) => {
        if ('error' in json && json.error != "") {
            console.log('Error getting '+item+', something went wrong')
            console.log(json.error)
        }

        dispatch(setSettingsValue('default', json.default))
        if (json.never) dispatch(setSettingsValue('never', json.never))
        if (json.always) dispatch(setSettingsValue('always', json.always))
        dispatch(itemLoading(item))
    }).catch((error)=>{
        console.log('Something went wrong fetching', item,'Message was:', error)
        dispatch(itemLoading(item))
    })
}
const saveSettings = () => (dispatch, getState) => {
    dispatch(validateSettingsLists())
    dispatch(setSettingsError('form', false))
    let state = getState()
    if (some(state.settings[ERROR], (el) => !!el)) {
        return
    } else {
        dispatch(itemLoading('settings'))
        let body = state.settings[VALUE]
        console.log('settings settings to', JSON.stringify(body))
        fetch(config.apiBase + 'mam/settings', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((response) => checkFetchStatus(response,true))
        .then( (json) => {
            if ('error' in json && json.error != "") {
                console.log('Error getting settings: something went wrong')
                console.log(json.error)
                dispatch(setSettingsError('form', json.error))
            }
            dispatch(itemLoading('settings'))
        }).catch (( error ) => {
            console.log('Could not save settings due to:', error)
            dispatch(setSettingsError('form', "Попробуйте ещё раз позже, пожалуйста"))
            dispatch(itemLoading('settings'))
        })
    }
}
const setSettingsError = (err_type, value) => ({type: SETTINGS, kind: ERROR, value: {[err_type]:value}})
const setSettingsValue = (val_type, value) => ({type:SETTINGS, kind: VALUE, value: {[val_type]:value}})

const validateSettingsLists = () => (dispatch, getState) => {
    let state = getState()
    dispatch(setSettingsError('always', (!validateListOfJIDs(state.settings[VALUE].always))))
    dispatch(setSettingsError('never', (!validateListOfJIDs(state.settings[VALUE].never))))
}
const validateListOfJIDs = (list) => list.every((item,ind, ar) => {
    if (item.trim() == '') return true;
    let jid = item.split('@')
    return (jid.length == 2) && jid.every((it) => !! it) // false for empty string
})


export const settingsState = (state={
                                [VALUE]:{default:'roster', always:[], never:[]},
                                [ERROR]:{always:false, never:false, form:""}
                              }, action) => {
    if (action.type != SETTINGS) return state;
    
    return Object.assign({}, state, {[action.kind]:
        Object.assign({}, state[action.kind], action.value)
    })
}
