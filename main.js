import ReactDomServer from 'react-dom/server';
import {store,Routes} from './components/application.js';
import { syncHistoryWithStore } from 'react-router-redux'
//import createMemoryHistory from 'history';
import createMemoryHistory from 'history/lib/createMemoryHistory'
import {Yametrika} from './components/metrika.js'

//import {createLocation} from 'history/LocationUtils'
const SSI = {__html:
            '<!--# block name="vcard" -->{}<!--# endblock -->' +
            'var vcard = <!--# include virtual="/api/json/vcard" stub="vcard" -->;' +
            'var roster = <!--# include virtual="/api/json/roster" stub="vcard" -->;'
}
var HTMLWrap = (props) => 
<html>
  <head>
    <title>Jabber.ru</title>
    <meta charSet="utf-8"/>
    <meta name="theme-color" content="#233747"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content="Jabber.ru — жаббер сервер, вероятно, крупнейший, старейший и самый надёжный"/>
    <link rel="stylesheet" href="/css/flickity.css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="/css/fonts.css"/>
  
  </head>
  <body className="gradient"> 
    <div id="RC">
    {props.children}
    </div>
    <script dangerouslySetInnerHTML={SSI}></script>
    <script dangerouslySetInnerHTML={Yametrika}></script> 
    <noscript><div><img src="https://mc.yandex.ru/watch/24966088" style={{position:"absolute", left:-9999}} alt="" /></div></noscript> 
    <script src="/js/bundle.js"></script>
  </body>
</html>



const match = ReactRouter.match;
const RouterContext = ReactRouter.RouterContext;
const Provider = ReactRedux.Provider;



const History = syncHistoryWithStore(createMemoryHistory(),store);
const Rs = ReactRouter.createRoutes(Routes);

module.exports = function render(locals, callback) {
    const loc = History.createLocation(locals.path);
    match( {routes:Rs, location:loc}, (error, redirectLocation, renderProps) => {
            callback(null, '<!DOCTYPE html>'+ReactDomServer.renderToStaticMarkup(
                            <Provider store={store}>
                              <HTMLWrap>
                                <RouterContext {...renderProps} />
                              </HTMLWrap>
                            </Provider>),
            )
    })
}
