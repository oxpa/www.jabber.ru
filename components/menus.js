import {isEmpty} from './helpers';
import {Link} from 'react-router';
import {setVcard, setRoster, setJid} from "./user";
import {Roster} from "./personal";
import {itemLoading} from './loading.state';
import Swipeable from 'react-swipeable'; 
import * as React from 'react';
import * as ReactRedux from 'react-redux';

const LogoutMMItem = (props) => {
    if (props.loggedin) {
        return (
        <span className="mmitem logout" onClick={(e)=> e.stopPropagation()}>
            <Link className="logout" activeClassName="selected" to="/logout" >
                <span className="text">Выход</span>
                <span className="ico"></span>
            </Link>
        </span>
    )}
    else return null
}

class Mainmenu extends React.Component {
    render () {
        let props = this.props
        return (
            <div className={"logorow" + (props.location.pathname=='/'?" nologo":"")}>
              <div className="clicker" onClick={props.toggleMenu(true, 'lgr')}></div>
              <div className="logowrap">
                <Link to="/">
                  <span className="logo"></span>
                  <span className="logotext"><span className="wtxt">Jabber</span><span className="rtxt">.ru</span></span>
                </Link>
              </div>
              <Swipeable className={"scrollout-container" + (props.open?" openned":"")} 
                    onSwipedLeft={props.toggleMenu(false, 'swp')}
                    onClick={props.toggleMenu(true, 'lgr')}>
                <div className="scrollout">
                  <div className="scrollbar">
                    <span className="mmitem root"><Link activeClassName="selected" onlyActiveOnIndex={true} to="/" >Главная</Link></span>
                    <span className="mmitem"><Link activeClassName="selected" to="/about" >Помощь</Link></span>
                    <span className="mmitem"><Link activeClassName="selected" to="/svcs"  >Сервисы</Link></span>
                    <span className="mmitem"><Link activeClassName="selected" to="/download">Скачать</Link></span>
                    <span className="mmitem"><Link activeClassName="selected" onlyActiveOnIndex={true} to="/personal" >Кабинет</Link></span>
                    <Roster/>
                  </div>
                </div>
              </Swipeable>
              <div className="mainmenu">
                <span className="mmitem p-menu-ico"></span>
                <span className="mmitem root"><Link activeClassName="selected" onlyActiveOnIndex={true} to="/" >Главная</Link></span>
                <span className="mmitem"><Link activeClassName="selected" to="/about" >Помощь</Link></span>
                <span className="mmitem"><Link activeClassName="selected" to="/svcs"  >Сервисы</Link></span>
                <span className="mmitem"><Link activeClassName="selected" to="/download">Скачать</Link></span>
                <span className="mmitem"><Link activeClassName="selected" onlyActiveOnIndex={true} to="/personal" >Кабинет</Link></span>
                <span className="mmitem peer"><Link activeClassName="selected" onlyActiveOnIndex={true} to={"/personal/roster/"+encodeURIComponent(props.peer)}>{props.peer_name}</Link></span>
                <LogoutMMItem loggedin={props.loggedin} />
              </div>
            </div>)
        }
}

const mapMMStateToProps = (state) => {
    let jid = state.MAMHistory.peer
    let peer = state.user.roster.filter((peer) => (peer.jid == jid))[0] || undefined
    let peer_name = peer && peer.name || state.MAMHistory.peer
    return {
            loggedin:   state.user.loggedin,
            skipLogo:   state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname == '/' || false,
            open:       state.loading.menu || false,
            peer:       state.MAMHistory.peer || undefined,
            peer_name:  peer_name
        } 
}
const mapDispatchToMMProps = (dispatch) => {
    return {
        getVcard: () => dispatch(setVcard(false)),
        getRoster: () => dispatch(setRoster(false)),
        toggleMenu: (onclick, tgt) => (e) => {if ((onclick && e.type == 'click')||!onclick) {e.preventDefault(); e.stopPropagation();dispatch(itemLoading('menu'))}}
    }
}
export const ConnectedMainMenu = ReactRedux.connect(mapMMStateToProps, mapDispatchToMMProps)(Mainmenu);


export const Footer = (props) =>
      <div className="footerwrap">
        {props.children}
        <div className="footer-holder"></div>
        <div className="footer">
          <div className="footmenu">
            <span className="about fblock">
            <div className="footmenuheader">Help</div>
            <div className="footmenuitem"><Link to={"/about#tech"}>FAQ</Link></div>
            <div className="footmenuitem"><a href="/about#callback">Contacts</a></div>
            {/*<div className="footmenuitem"><a href="">Roadmap</a></div>*/}
            </span>
            <span className="confs fblock">
            <div className="footmenuheader">Сервисы</div>
            <div className="footmenuitem"><a href="http://jc.jabber.ru">Рейтинг Конференций</a></div>
            <div className="footmenuitem"><a href="http://chatlogs.jabber.ru">Архив сообщений</a></div>
            <div className="footmenuitem"><a href="https://juick.com">Juick</a></div>
            {/*<div className="footmenuitem"><a href="">Ваш домен</a></div>*/}
            </span>
            <span className="clients fblock">
            <div className="footmenuheader">Клиенты</div>
            <div className="footmenuitem"><a href="https://chat.jabber.ru">chat.jabber.ru</a></div>
            <div className="footmenuitem"><a href="https://psi-plus.com">Psi+</a></div>
            <div className="footmenuitem"><a href="https://www.xabber.com/">Xabber</a></div>
            <div className="footmenuitem"><a href="https://conversations.im/">Conversations</a></div>
            </span>
          </div>
        </div>
        <div className="hg">
          <span><img src="/static/hg.png"/></span>
        </div>
      </div>

