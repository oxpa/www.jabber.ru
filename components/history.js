import {itemLoading} from './loading.state';
import {isEmpty,checkFetchStatus} from './helpers'
import { Scrollbars } from 'react-custom-scrollbars'
import * as config from './config.js';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

const HISTORY = 'HISTORY';      // history actions
const FETCH = 'FETCH';          // start fetching from server
const PEER = 'PEER';            // save current chat peer jid
const UPDATE = 'UPDATE';        // add messages into state
const UREQ = 'REQUEST_UPDATE';  // request history update 
const ALLMSG = 'ALL_MSG';       // all messages from history are fetched
const HEIGHT = 'HEIGHT';        // save previous scroller height to calculate offset later
const LONG_INTERVAL = 5000;     // poll for new messages every 5 seconds
const SHORT_INTERVAL = 200;     // 

class Scroller extends React.Component {
    render () {
        return <div className="scroller"></div>
    }
}

const message = (props) => {
    let dt = new Date(props.ts/1000)
    return <div className={"message " + props.direction}>
        <div className="message-author">
            <span className="peer">{props.peer_name}</span>
            <span className="me">{props.my_name}</span>
        </div>
        <div className="message-timestamp">
            <div className="ts-date">{'' + dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()}</div>
            <div className="ts-time">{'' + dt.getHours() + ':' + dt.getMinutes()}</div>
        </div>
        <div className="message-text">{props.txt}</div>
    </div>
}
const Message = message

const Nomsgs = (props) => <div className="no-history">
    Позднее здесь будет история общения с вашим собеседником
</div>

class thread extends React.Component {
    checkScrollerVisible () {
        return () => {
            if (this.should_update) {
                this.should_update = false
                //let tp = this.scrollbar.refs.view.scrollHeight - this.scrollbar.refs.view.scrollTop

                //console.log('visible hight mark is', tp)
                //let tp = this.props.old_height
                if (! this.props.loading && ! this.props.no_more) {
                    this.props.getMoreMessages(this.props.peer, this.props.oldest_ts)//, tp)
                }
            }
        }
    }
    componentDidMount () {
        if (this.scrollbar && (this.scrollbar.refs.view.scrollHeight !=0) ) {
                this.scrollbar.scrollToBottom()
        }
        if (this.props.peer)
            this.props.getMoreMessages(this.props.peer, this.props.oldest_ts)
    }
    componentWillReceiveProps (nextProps) {
        if ( (nextProps.messages.length != this.props.messages.length) 
                && this.props.peer == nextProps.peer 
                && this.scrollbar && nextProps.messages.length > 0) {
            //console.log('saving position for nextProps', nextProps)
            let srv = this.scrollbar.refs.view
            console.log('saving position:', srv.scrollHeight, srv.scrollTop, srv.scrollHeight - srv.scrollTop)
            this.props.saveScrollPosition(srv.scrollHeight - srv.scrollTop)
        } 
    }
    componentDidUpdate (newprops){
        if (this.props.peer != newprops.peer ) {
            if (this.scrollbar) {
                this.scrollbar.scrollToBottom()
            }
            this.props.saveScrollPosition(null)
        }
        if (this.props.old_height && this.scrollbar) {
            let srv = this.scrollbar.refs.view
            console.log(this.props.messages.length, newprops.messages.length)
            console.log('unscrolling to', srv.scrollHeight, '-', this.props.old_height, srv.scrollHeight  - this.props.old_height)
            this.scrollbar.scrollTop(srv.scrollHeight - this.props.old_height)
            this.should_update = true
        } 
        //console.log('loading', this.props.loading, 'no_more', this.props.no_more)
        if (this.scrollbar && ! this.props.loading && ! this.props.no_more ){
            console.log('no more is', this.props.no_more)
            // basically, if DOM had settled, there are not enough messages, 
            // but we didn't try fetching
            //console.log(scr.view.scrollHeight, '<=', scr.view.clientHeight)
            let srv = this.scrollbar.refs.view
            if (srv.scrollHeight <= srv.clientHeight) {
                console.log('visible high mark after update', srv.scrollHeight)
                
                this.props.getMoreMessages(this.props.peer, this.props.oldest_ts, srv.scrollHeight, this.props.old_height)
            }
        }
    }
    render ()  {
        let props = this.props
        let messages = []
        messages = props.messages.map((m, i) => <Message key={m.ts} {...m} peer_name={props.peer_name} my_name={props.my_name}/>) 

        if (messages.length == 0) {
            messages = <Nomsgs key="nomsg" />
        } else {
            if(this.props.no_more) {
            messages.unshift(<div className="roster-history-placeholder" key='loader' >
                &#203; &#203; &#203;
            </div>)}
        messages.push(<div className="start-placeholder" key="holder" >&#200; &#200; &#200;</div>)
        }
        
        return <div className="roster-history">
            <Scrollbars autoHide
                ref={(scrollbar) => this.scrollbar = scrollbar}
                hideTracksWhenNotNeeded={true}
                onScrollAtTop={this.checkScrollerVisible()}
                edgeYThreshold={500}
            >
                {messages}
            </Scrollbars>
        </div>
    }
}
const mapStateToThreadProps = (state) => {
    let msgs = []
    let oldest_ts = null
    let jid = state.MAMHistory.peer
    let peer = state.user.roster.filter((peer) => (peer.jid == jid))[0] || undefined
    let peer_name = peer && peer.name || state.MAMHistory.peer
    if (state.MAMHistory.msgs[state.MAMHistory.peer]) {
        let ids = Object.keys(state.MAMHistory.msgs[state.MAMHistory.peer]).sort()
        oldest_ts = ids[0]
        msgs = ids.map(
            (i) => state.MAMHistory.msgs[state.MAMHistory.peer][i]
        )
    }
    return {
        loading: state.loading[jid] || false,
        messages: msgs || [],
        no_more: (state.MAMHistory.no_more.indexOf(jid) != -1), 
        old_height: state.MAMHistory.old_height,
        peer: state.MAMHistory.peer,
        peer_name: peer_name,
        my_name: state.user.vcard? state.user.vcard.NICKNAME : state.user.jid || "My precious",
        oldest_ts: oldest_ts
    }
}
const mapDispatchToThreadProps = (dispatch) => ({
    saveScrollPosition: (height) => dispatch(saveHeight(height)),
    getMoreMessages: (jid, timestamp, height, oldheight) => { 
                            if(!oldheight || (height != oldheight)) {dispatch(saveHeight(height))}; 
                            dispatch(fetchHistory(jid, timestamp))
                    },
    shouldUpdate: () => dispatch(requestHistoryUpdate(true))
})

export const Thread = ReactRedux.connect(mapStateToThreadProps, mapDispatchToThreadProps)(thread)

const requestHistoryUpdate = (flag) => ({type: HISTORY, kind: UREQ, value: flag})
const updateHistory = (jid, history) => (
    {type: HISTORY, kind: UPDATE, value: [jid, history]}
)
const setPeerJid = (jid) => ({type: HISTORY, kind: PEER, value: jid})
const setEndReached = (jid) => ({type: HISTORY, kind: ALLMSG, value: jid})
const saveHeight = (height) => ({type: HISTORY, kind: HEIGHT, value: height})

export const setHistoryPeer = (jid) => (dispatch, getState) => {
    dispatch(setPeerJid(jid))
}
export const fetchHistory = (jid, timestamp=null) => (dispatch, getState) => {
    let state = getState()
    if (jid === undefined) return
    if (state.loading[jid]) {
        console.log('history for ', jid, ' is being fetched already')
        return
    }
    dispatch(itemLoading(jid))
    //console.log('fetching data since', timestamp)
    let body = Object.assign({jid:jid}, timestamp?{ts:parseInt(timestamp)}:{})
    fetch(config.apiBase + 'mam/messages', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    }).then((response) => checkFetchStatus(response,true)
     ).then((json) => {
        if ('error' in json && json.error != "") {
            //console.log('Error getting messages for '+ jid + ', something went wrong')
            console.log(json.error)
        }
        let messages = Object()
        if( json.messages) {
            json.messages.forEach((msg) => (messages[msg.ts] = msg))
        } else {
            dispatch(setEndReached(jid))
        }
        dispatch(updateHistory(jid, messages))
        dispatch(itemLoading(jid))
    }).catch((error)=>{
        console.log('Something went wront fetching messages for', jid,'.Message was:', error)
        dispatch(itemLoading(jid))
    })

}

export const MAMHistory = (state = {msgs:{}, no_more:[], old_height:null}, action) => {
    if (action.type != HISTORY) {return state}
    switch (action.kind)  {
      case UPDATE: {
        let [jid, messages] = action.value

        let jid_messages = Object.assign({}, state.msgs[jid]||{}, messages)

        
        return Object.assign({},
                state, 
                    { msgs: Object.assign({}, state.msgs, 
                            {[jid]: jid_messages}
                    )}
                )
      }
      case PEER: {
        return Object.assign({}, state, {peer: action.value, old_height: null})
      }
      case ALLMSG: {
        let no_more = [ ...state.no_more, action.value]
        return Object.assign({}, state, {no_more: no_more})
      }
      case HEIGHT: {
        return Object.assign({}, state, {old_height:action.value})
      }
    }
    return state;

}




