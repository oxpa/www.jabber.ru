import {isEmpty} from "./helpers";
import {setVcard, setRoster, setJid} from "./user";
import {browserHistory as history, Link} from 'react-router'

import { Scrollbars } from 'react-custom-scrollbars';
import * as React from 'react';
import * as ReactRedux  from 'react-redux';

const RosterItem = (props) =><Link className="r-item" key={props.jid} 
                                   to={'/personal/roster/'+encodeURIComponent(props.jid)} 
                                   activeClassName="selected">
                                       <div>{props.name || props.jid}</div>
                             </Link>

class RRoster extends React.Component {
    render () { 
        let props = this.props
        let roster = props && props.roster || []
        let classes = "roster"
        if ((roster.length == 0) && (! props.loggedin)) {classes = classes + " empty"}
        if ((roster.length == 0) && (props.loggedin)) {classes = classes + " nocontacts"}
        return <div className={classes}>
                    {roster.map((item, ind) => (<RosterItem {...item} renew_me={item.jid == this.props.peer} key={item.jid || ind}/>))}
            </div>
    }
}
RRoster.contextTypes = {
    router: React.PropTypes.object
}

class PersonalMenu extends React.Component {
    render () { return <div className="p-menu">
        <Scrollbars autoHide>
            <div>
                <Link to='/personal' className="p-settings" activeClassName="selected" onlyActiveOnIndex={true} >Настройки</Link>
            </div>
            <Roster />
        </Scrollbars>
    </div>
    }
}

export class Personal extends React.Component {
    componentDidMount() {
        if (! this.props.loggedin) {
            this.context.router.push('/login')
        }
    }
    render () {
        if (! this.props.loggedin) return <div className="waiting"></div>
        return <div className="personal">
            <PersonalMenu />
            {this.props.children}
        </div>
        return <div className="personal">
            <h1>У нас обед!</h1>
            <p>Мы обязательно сделаем здесь много интересного. Но несколько позже.</p>
            { this.props.user.vcard.PHOTO && this.props.user.vcard.PHOTO.BINVAL != "" ?
                <img src={"data:" + this.props.user.vcard.PHOTO.TYPE + ";base64," + this.props.user.vcard.PHOTO.BINVAL} />
              : ""
            }
        </div>
    }
}

Personal.contextTypes = {
    router: React.PropTypes.object
}

export const settlePersonal = () => (dispatch, getState) => {
    let state = getState()
    if (isEmpty(state.user.roster)) {
        dispatch(setRoster(false)) 
    }
    if (isEmpty(state.user.vcard)) {
        dispatch(setVcard(true))
    }
}

const mapStateToPersonalProps = (state) => {
    return {
        loggedin: state.user.loggedin,
        vcard: state.user.vcard,
        roster: state.user.roster,
        user: state.user
    }
}
const mapDispatchToPersonalProps = (dispatch) => {
    return {
        getVcard: () => dispatch(setVcard(true)),
        getRoster: () => dispatch(setRoster(false))
    }
}

const mapStateToRosterProps = (state) => {
    return {
        peer: state.MAMHistory.peer,
        roster: state.user.roster || [],
        loggedin: state.user.loggedin
    }
}

export const PersonalSpace = ReactRedux.connect(mapStateToPersonalProps, mapDispatchToPersonalProps)(Personal)
export const Roster = ReactRedux.connect(mapStateToRosterProps)(RRoster)

