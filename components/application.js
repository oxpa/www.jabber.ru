import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import {CallbackForm, cbFormState } from './callbackForm.js';
import {setResetForm, loginForm, LoginFormConnected, setLoginForm, setRegForm, setRemindForm}  from "./loginForm.js";
import {carouselState, ConnectedCarousel} from "./carousel.js";
import {ConnectedMainMenu} from "./menus.js";
import {About} from "./about.js";
import {Svcs} from "./svcs.js";
import {PersonalSpace, settlePersonal} from "./personal.js";
import {Settings, settingsState as settings, fetchSettings} from "./settings.js";
import {Thread, MAMHistory, fetchHistory, setHistoryPeer} from "./history.js";
import {user, userLogout} from "./user.js";
import {loading} from "./loading.state.js"
import {Root} from "./root.js";
import {Chatlogs} from "./chatlogs.js";
import {Router as Router_i, Route as Route_i}  from 'react-router';
import * as ReactRedux from 'react-redux';
import * as React from 'react';
import * as Redux from 'redux';


const Router =  ReactRedux.connect()(Router_i);
//const DefaultRoute =  ReactRedux.connect()(ReactRouter.Router.DefaultRoute);
const Route =  ReactRedux.connect()(Route_i);
//const IndexRoute = ReactRedux.connect()(ReactRouter.IndexRoute);
const Provider = ReactRedux.Provider;

const Body = (props) =>
    <div className="bodywrap">
        <ConnectedMainMenu {...props}/>
           {props.children}
    </div>
const ConnectedBody =  ReactRedux.connect()(Body);

let preset_vcard = {}
let preset_jid = undefined;
let loggedin = false;
let preset_roster = [];
if ((typeof(vcard) !== 'undefined') && vcard.vcard) {
    preset_vcard = vcard.vcard.vCard || {};
    preset_jid = vcard.vcard.jid || {};
    loggedin = true;
    preset_roster = roster.roster;
}
let preset_user = {vcard: preset_vcard, jid: preset_jid, loggedin: loggedin, roster: preset_roster}

export var store = Redux.createStore(Redux.combineReducers({
    routing:routerReducer,
    loginForm,
    carouselState,
    cbFormState,
    user,
    loading,
    settings,
    MAMHistory
}),{user:preset_user}, Redux.applyMiddleware(thunk))

const loadSvcs = (nextState,cb)=>{
    require.ensure(
        ['./svcs.js']
       ,(require)=>{
            let svcs=require('./svcs.js');
            cb(null,svcs.Svcs)
        }
       ,'/svcs/svcs')

}

const loadAbout = (nextState,cb)=>{ 
    require.ensure(
        ['./about.js']
       ,(require)=>{ 
            let about=require('./about.js');
            cb(null,about.About)
        } 
       ,'/about/about') 

}
        
       /*,{path:'about', getComponents: loadAbout }
       ,{path:'svcs', getComponent: loadSvcs}*/

export const Routes = [{
    path: '/',
    component: ConnectedBody,
    indexRoute: {component: Root},
    childRoutes: [
        {path: 'login', component: LoginFormConnected, store: store, onEnter: () => store.dispatch(setLoginForm())}
       ,{path: 'logout', store: store, onEnter: (route, replace, hook) => {store.dispatch(userLogout()), replace("/")}}
       ,{path: 'register', component: LoginFormConnected, store: store, onEnter: () => {store.dispatch(setRegForm())}}
       ,{path: 'remind', component: LoginFormConnected,store: store, onEnter:  () => {store.dispatch(setRemindForm())}}
       ,{path: 'reset', component: LoginFormConnected, store: store, onEnter:  () => {store.dispatch(setResetForm())}} //used to generate html form
       ,{path: 'reset/:ehash', component: LoginFormConnected, store: store, onEnter: () => {store.dispatch(setRemindForm(true))}}
       ,{path: 'register/:ehash', component: LoginFormConnected, store: store, onEnter: () => {store.dispatch(setRegForm(true))}}
       ,{path: 'about', component: About, store:store}
       ,{path: 'svcs', component: Svcs, store:store}
       ,{path: 'chatlogs', component: Chatlogs, store:store}
       ,{path: 'personal', 
            component: PersonalSpace, 
            store: store, 
            onEnter: () => {store.dispatch(settlePersonal())},
            indexRoute: {component: Settings, onEnter: () => {store.dispatch(fetchSettings())}}, 
            childRoutes: [
                {path: 'roster/:jid', component: Thread, store: store, 
                    onEnter: (nextSt) => {
                        store.dispatch(setHistoryPeer(nextSt.params.jid))
                        store.dispatch(fetchHistory(nextSt.params.jid))
                    },
                    onLeave: (nextSt) => {
                        store.dispatch(setHistoryPeer(undefined))
                    }
                },
                {path: 'roster/:jid/:timestamp', component: Thread, store: store, 
                    onEnter: (nextSt) => {
                        store.dispatch(setHistoryPeer(nextSt.params.jid))
                        store.dispatch(fetchHistory(nextSt.params.jid, nextSt.params.timestamp))
                    } 
                },
            ]
        }
       ,{path:'download',component: ConnectedCarousel, store: store}
    ],
    //onEnter: function(){resetCaptcha();console.log('entering main route')}
}]
export const App = (history) => (props)=>
    <Provider store={store}>
      <Router history={history} routes={Routes}>
      </Router>
    </Provider>

/*
export const Routes = (
        <Route path="/" component={ConnectedApp}>
          <IndexRoute component={ConnectedCarousel}/>
          <Route path="login" component={LoginFormConnected}/>
          <Route path="about" component={About}/>
          <Route path="svcs" component={Svcs}/>
        </Route>
)
*/

