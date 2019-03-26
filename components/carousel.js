import * as React from 'react'
import * as ReactRedux from 'react-redux'
const platforms = [
    {id: 0, name:"Windows"},
    {id: 1, name:"WinPhone"},
    {id: 2, name:"OSX"},
    {id: 3, name:"IOS"},
    {id: 4, name:"Linux"},
    {id: 5, name:"Android"}
];
const clients = [
    {Name: "Xabber", ImgUrl: "https://lh3.googleusercontent.com/5ZCn-z0We-puYjQ_t1m3RATzuakUurga5gRvWkpNVZHhmgdHvIQj_tpvs93CKebOqquT=h600", Description: "<p>Jabber Клиент с открытым исходным кодом, простым и аккуратным дизайном. Можно использовать одновременно с несколькими аккаунтами. Разрабатывается с целью быть лучшим андроид клиентом: не просто открытым, но и свободным от рекламы.</p> <p>Поддерживает в том числе:<ul><li>Modern material interface</li><li>Multiple accounts support</li><li>Multi user chat (MUC)</li><li>Chat history</li><li>Avatars</li><li>Notification setting for each contact</li><li>Stream compression</li><li>OTR, TLS, SSL, SASL</li><li>Message delivery receipts</li></ul></p>", tags: [5]},
    {Name: "Conversations", ImgUrl: "https://lh3.ggpht.com/ib4uM-oxW1Q8zSHib_UJVPaw73G5AHF1B3Swx_MXDXNzXf3hBDqgHnMWtYxChZ1I4fs=h600", Description: "<p>Открытый jabber клиент разработанный специально для Android 4+ </p><p>Создавался с целью быть как можно более красивым и удобным, без ущерба для безопасности использования.</p><p>Поддерживает несколько аккаунтов, MUC, любые виды шифрования (OMEMO, OTR, PGP), отправку и приём изображений. Интегрируется с адресной книгой телефона. Почти не влияет на потребление электропитания. </p>", tags: [5]},
    {Name: "Yaxim", ImgUrl: "https://lh4.ggpht.com/9VvBWxJ7-S6SWb9_x8uVS8C_VVe9khX649Dzm_MWQ12a88hYexDCmMmgF4DuwEssHQ=h600", Description: "<p>Минималистичный клиент для Android.</p><p>Несмотря на простой дизайн, yaxim стремится быть надёжным и полезным приложением. Из существенных плюсов можно отметить легковесность, поддержку конференций, подтверждения о доставке сообщений.</p> <p><a href='https://yaxim.org/download/'>https://yaxim.org/download/</a></p>", tags: [5] },
    {Name: "Adium", ImgUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/AdiumX_screenshot.png", Description: "<p>Универсальный клиент мгновенного обмена сообщениями (мессенджер) для системы macOS, который поддерживает множество протоколов, и выпущен под лицензией GNU GPL.</p><p>Поддержка русского языка, использование многочисленных протоколов, tab-ы, уникальные возможности настройки интерфейса, возможность шифрования сообщений - вот далеко не полный список его возможностей.</p><p><a href='https://www.ixbt.com/td/adium.shtml'>https://www.ixbt.com/td/adium.shtml</a></p>", tags: [2]},
    {Name: "Pidgin", ImgUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Pidgin_Ubuntu_Buddy_List.png", Description: "<p>Один из лучших кроссплатформенных клиентов. Поддерживает сразу несколько протоколов и аккаунтов (ICQ, Jabber, MSN, умеет Twitter)</p><p>Позволяет сохранять комментарии к пользователям из контакт‐листа. Может объединять несколько контактов в один метаконтакт.</p><a href='https://ru.wikipedia.org/wiki/Pidgin'>https://ru.wikipedia.org/wiki/Pidgin</a>", tags: [0,2,4]},
    {Name: "IM+", ImgUrl: "https://upload.wikimedia.org/wikipedia/ru/c/c2/Im_plus_screenshot.png", Description: "<p>кроссплатформенная программа обмена мгновенными сообщениями для мобильных устройств, а также кроссплатформенное веб-приложение. Поддерживает протоколы Twitter, Facebook, Google Talk, XMPP, Yahoo!, AOL Instant Messenger, ICQ, Myspace, Windows Live Messenger/MSN, ВКонтакте, Mail.Ru Агент, Я.Онлайн, Одноклассники.ru.</p><p>Позволяет обмениваться файлами, сохраняет историю, допускает чат сразу с несколькими собеседниками, поддерживает скины и графические смайлики.</p>", tags: [0, 1, 3, 5]}
];
const emptyPage = [{Name:"Ничего не нашлось",Description:"По вашим критериям не нашлось ни одного клиента. Попробуйте подобрать пару хороших клиентов для разных платформ. Или напишите свой: чем вы хуже других?", tags:[]}]
import {Footer} from "./menus.js";
import {isEmpty} from "./helpers.js";
const TAB    = 'TAB';   // tab changed action
const TAG    = 'TAG';   // client tag lock action

const CarouselCell = (props) =>
  <div className="cellwrap">
    <div className="carousel-cell client-description">
        <h2 className="clientNameNarrow">{props.Client.Name}</h2>
        <div className="clientImg"><div><img className={('ImgUrl' in props.Client)?"":"hidden"} src={props.Client.ImgUrl||""} /></div></div>
        <span className="description-wrap1">
          <h2 className="clientNameWide">{props.Client.Name}</h2>
          <span dangerouslySetInnerHTML={{ __html: props.Client.Description }} tabIndex="-1"/>
        </span>
    </div>
  </div>
const OsTags = (props) =>
    <div className="platform-icons"> {
        props.platforms.map( (tag) =>
            <span className={"picon" + (props.selectedTags.indexOf(tag.id) < 0?"":" selected")
                                     + (props.lockedTags.indexOf(tag.id) < 0?"":" locked")}
                  key={tag.id}
                  onClick={props.onTagClick(tag.id)}
            >
                <span data-txt={tag.name}></span> 
                {/*tag.name*/}
            </span>
    )}</div>
var Carousel = React.createClass({
  componentWillUpdate: function (newProps) {
    if (this.props.lockedTags != newProps.lockedTags) {
      this.flkty.deactivate();
    }
  },
  componentDidUpdate: function (oldProps) {
    //console.log('tags changes?',this.props,oldProps);
    if (this.props.lockedTags != oldProps.lockedTags) {
        this.flkty.activate();
        //this.flkty.reloadCells();
    }
  },
  componentDidMount: function () {
    if (typeof(document.querySelector) !== "undefined") {
        var elem = document.querySelector('.main-carousel');
        require.ensure(["flickity"], (require)=> {
            let flickity = require('flickity')
            var flkty = new flickity( elem, {
                            contain: true,
                            setGallerySize: true,
                            wrapAround: true,
                            noDomMod: true,
                            dragThreshold: 20,
                            watchCSS: true
            });
            flkty.on('cellSelect', this.props.onCellSelect(flkty));
            this.flkty = flkty;
        }, 'flickity');
    }
  },
  render: function() {
    var cells = this.props.clients.map(function(client){
                  return (<CarouselCell Client={client} key={client.Name}/>)
                });
    return (
      <Footer>
          <div id="carousel">
            <OsTags platforms={this.props.platforms}
                    lockedTags={this.props.lockedTags}
                    selectedTags={this.props.selectedTags}
                    onTagClick={this.props.onTagClick}
            />
            <div className="main-carousel">
              <div className="flickity-viewport">
                <div className="flickity-slider" style={{transform: "translateX(10%)"}}>
                {cells}
                </div>
              </div>
            </div>
          </div>
      </Footer>
    )
  }
});

export function carouselState(state={clients:clients, selectedTags:clients[0].tags, lockedTags: []}, action){
    if (action.type == TAG) {

        var lockedTags = Object.assign([],state.lockedTags);
        var idx;
        if ((idx = lockedTags.indexOf(action.tag)) < 0 ) {
            lockedTags.push(action.tag)
        }else {
            lockedTags.splice(idx,1)
        };
        var clientsToShow = [];
        if (lockedTags.length>0) {
            console.log('locked tags:', lockedTags);
            clientsToShow = clients.filter(
                        client =>  lockedTags.every( tag => client.tags.indexOf(tag)>-1)
            )
            if (isEmpty(clientsToShow)) { clientsToShow=emptyPage}
            
        } else {
            clientsToShow = clients
        }
        var selectedTags = clientsToShow.length>0?clientsToShow[0].tags:[]
        return Object.assign({},state,{clients: clientsToShow,
                                       lockedTags: lockedTags,
                                       selectedTags: selectedTags})
    }
    if (action.type == TAB){
        console.log('setting tags by tab', action.tab);
        return Object.assign({}, state, {selectedTags:state.clients[action.tab].tags})
    }
    return state
}

function setLockedTag(tagId) {
  return {type:TAG, tag: tagId}
}
function setSelectedPlatformsByTab(TabIndex) {
  return {type:TAB, tab:TabIndex}
}

const mapCarouselStateToProps = (state) => {
    return {
        clients: state.carouselState.clients,
        platforms: platforms,
        selectedTags: state.carouselState.selectedTags,
        lockedTags: state.carouselState.lockedTags
    }
}
const mapCarouselDispatchToProps = (dispatch) => {
    return {
        onCellSelect: (flkty) => { return function () {dispatch(setSelectedPlatformsByTab(flkty.selectedIndex)) } },
        onTagClick: (tagId) => {return function() {dispatch(setLockedTag(tagId))}}
    }
}
const PropTypes = React.PropTypes
Carousel.propTypes = {
    onCellSelect: PropTypes.func.isRequired,
    clients: PropTypes.array.isRequired,
    platforms: PropTypes.array.isRequired,
    selectedTags: PropTypes.array.isRequired
}

export const ConnectedCarousel = ReactRedux.connect(mapCarouselStateToProps,mapCarouselDispatchToProps)(Carousel)

