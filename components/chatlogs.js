import {Footer} from "./menus.js";
import {Anchor, Anchored} from "./anchor.js";
import {Link} from 'react-router';
import * as React from 'react';

const conferences_jabber_ru = ["42fm", "4pda.ru", "bombus-talks", "bombus", "bombusmod", "clubjabber", "codingteam", "comp.lang.c", "coq", "debian", "devel", "dotnet", "ejabberd", "emacs", "english", "erlang", "erlim", "fangamedev", "freebsd", "freestyle", "gentoo", "golang", "haskell", "icfpc", "java", "javascript", "jtalk", "linux-talks", "linux", "lisp", "mint", "miranda-im", "miranda-ng", "mobile", "moto", "nethack", "ocaml", "pikabu", "programming", "psi-dev", "rock", "scala", "sex", "siemens", "support", "symbian", "sysadmins", "talks", "tcl", "tkabber", "vim", "web", "world_of_tanks", "xmonad", "yaroslavl"]
const with_img_jabber_ru = ["bombusmod", "ejabberd", "linux", "miranda-ng", "ocaml", "debian", "emacs", "scala", "tkabber", "xmonad", "codingteam", "haskell", "jtalk", "dotnet", "erlang"]

const style = (name) => { 
    if (with_img_jabber_ru.includes(name)) {
        return {backgroundImage:'url(https://chatlogs.jabber.ru/img/chatlogs/'+name+'.ico)'}
    } else {
        return {}
    }
}
const Conference = (props) => (
    <div className="conference">
        <a href={"https://chatlogs.jabber.ru/" + props.conf + "@" + props.conf_server} >
            <div className="confico" style={style(props.conf)}></div>
            <div className="confname">{props.conf}</div>
        </a>
    </div>
)
const conf_server = "conference.jabber.ru"
const conferences = conferences_jabber_ru.map((c) => (<Conference conf={c} conf_server={conf_server} key={c}/>))
export const Chatlogs = (props) => (
    <Footer>
        <h1>История конференций</h1>
        <p>Если вы не понимаете что тут происходит, вы можете почитать <Link to="/svcs#archive">разъяснение</Link>.</p>
        <h2>@conference.jabber.ru</h2>
        <div className="conferences">
            {conferences}
        </div>
    </Footer>
)
