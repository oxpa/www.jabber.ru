import {Footer} from "./menus.js";
import {CallbackForm} from "./callbackForm.js";
import {Anchor, Anchored} from "./anchor.js";
import {Link} from 'react-router';
import * as React from 'react';

export const About = Anchored(class extends React.Component {
    render() { return (
    <Footer>
        <h1><Anchor id="general">Часть общая</Anchor></h1>
        <h2>Где я?</h2>
        <p>Это - jabber.ru, крупнейший jabber сервер в рунете. По совместительству - старейший и, вероятно, самый надёжный. Если вы не представляете себе что такое jabber или xmpp, то вы можете прочесть <a href="https://ru.wikipedia.org/wiki/XMPP">статью</a> в wikipedia (она излишне заумная). Просто поверьте нам на слово: jabber — это чат. Чат, который одинаково хорошо работает на телефоне, компьютере и вообще где угодно. </p>
        <p>Jabber правильно называть XMPP (Extensible Messaging and Presence Protocol), но мы по привычке продолжим использовать старое название.</p>
        <h2>Просто чат?</h2>
        <p>Да, просто чат. Чат 1 на 1, чат со множеством людей, чат с самим собой. Просто, надёжно и легко. Не способ найти собеседников, поддерживать социальную сеть или контролировать пользователя. Просто чат.</p>
        <p>Уже потом, на волне популярности, к этому чату приделали возможность играть в шахматы, оповещения о почте, прогнозы погоды, всяческих ботов и "шлюзы" в другие сети (например, icq). Но изначально, jabber - попытка сделать общение между людьми проще.</p>
        <h2><Anchor id="why">Чем вы лучше других сервисов?</Anchor></h2>
        <p>Вот далеко не полный список наших плюсов:</p>
          <ul>
            <li>Мы бесплатны, надёжны и независимы. И это, пожалуй, самое важное.</li>
            <li>В jabbere используется множество независимых серверов. Неполадки одного сервера или банкротство компании не разрушат систему общения в целом;</li>
            <li>Наличие клиентов под все основные платформы. Можно пользоваться одним чатом и на телефоне, и на компьютере, и где угодно ещё;</li>
            <li>Отсутствие рекламы. Ваши сообщения не используются для продажи вам же рекламы. А со спамом мы боремся;</li>
            <li>Возможность использовать со своими адресами (user@your.domain.tld). Как email, только быстрее (это же "instant messaging"!);</li>
            <li>Зашифрованные сообщения позволяют передавать в jabber'е любую важную информацию без опасений её перехвата (эта функция выключена по умолчанию, но полюбилась очень многим);</li>
          </ul>
        <p>Если же сравнивать нас (jabber.ru) с другими публичными серверами, то из плюсов можно выделить надёжную и, главное, долгую работу нашего сервиса: несмотря на бесплатность, мы серьёзно относимся к своему делу.</p>
        <h2>Вы классные, я хочу помочь</h2>
        <p>Да, мы - классные. Но мы можем быть куда лучше. Да и существуем только благодаря поддержке сообщества. Если у вас есть идеи, предложения или возможность помочь проекту, вы можете обратиться к нам через форму обратной связи или через jabber, написав в конференцию <a href="xmpp:support@conference.jabber.ru?join">support@conference.jabber.ru</a>.</p>
        <h1><Anchor id="tech">Часть техническая</Anchor></h1>
            <h2><Anchor id="whyjustwhy">Помогите, ничего не понимаю!</Anchor></h2>
            <p>Джаббер - это просто. Чтобы начать общаться нужно:</p>
            <ul>
                <li><a href="/register" target="_blank">Зарегистрироваться</a>, указав имя пользователя и email;</li>
                <li>В почте найти письмо от нас, пройти по ссылке и указать свой пароль;</li>
                <li>Скачать <Link to="/download">программу</Link>, которая пришлась по вкусу;</li>
                <li>В программе ввести имя пользователя (будет выглядеть так: user@jabber.ru, где "user" — нужно заменить на свой логин) и пароль;</li>
                <li>Если вы дошли до этого места — помочь другу и добавить его в контакты;</li>
                <li>Начать общение.</li>
            </ul>
            <h2><Anchor id="whyjabber">Какой клиент выбрать?</Anchor></h2>
            <p>На ваш выбор. Мы рекомендует Xabber для телефона, встроенный Messages для macOS, для Windows: Psi+, VacuumIM, Miranda NG. Если вы пользуетесь Линуксом, то вы сами знаете, какой клиент поставить. Также мы разрабатываем веб-клиент <a href="https://chat.jabber.ru">Kaiwa</a>, который вы тоже можете попробовать.</p>
            <h2><Anchor id="whynot">Клиент не работает, что делать?</Anchor></h2>
            <p>Во-первых, попытайтесь решить проблему сами: проверьте логин (должен содержать "@"), пароль, попробуйте поискать текст ошибки в интернете и почитать советы. Если ничего не помогает — попросите помощи у друзей или у нас через <Link to="#callback">форму обратной связи</Link>.</p>
            <h2><Anchor id="whyusername">Как друзьям найти меня?</Anchor></h2>
            <p>Друзьям нужно сообщить имя, которое состоит из двух частей: вашего логина на сайте и домена "jabber.ru". Получится что-то похожее на "user@jabber.ru".</p>
            <h2><Anchor id="whyat">Зачем в имени пользователя "@"?</Anchor></h2>
            <p>Символ "собачки", изначально, используется для указания принадлежности пользователя системе: user@server — пользователь "user" на сервере "server". Так и в джаббере, и в почте: user@jabber.ru — пользователь "user" на сервере "jabber.ru". Разделение имени пользователя на две части позволяет использовать множество серверов. А серверам — находить нужных пользователей.</p>
            <h2><Anchor id="nomail">Мне не приходит письмо о регистрации, помогите</Anchor></h2>
            <p>Если письмо с регистрацией не приходит — проверьте папку "Спам", попробуйте зарегистрироваться ещё раз. Если ничего не помогает — напишите нам в форму обратной связи внизу страницы. Возможно, наш почтовый сервер тупит и нам нужно починить его. Вместо ответа на обращение вы просто получите письмо с ссылкой на регистрацию.</p>
            <h2><Anchor id="whymail">Могу ли я отправлять/принимать почту со своего адреса в jabber.ru?</Anchor></h2>
            <p>Нет, не можете. Несмотря на то, что адреса очень похожи внешне, они используется разными программами. Позже, мы постараемся добавить возможность отправлять и принимать почту. Но использоваться для этого будет другая программа, не чат.</p>
            <h2><Anchor id="whyresource">Клиент хочет, чтобы я указал ему какой-то "ресурс". Что это?</Anchor></h2>
            <p>С одним именем пользователя вы можете подключаться к джабберу несколькими клиентами. Ресурс — это имя клиента. Можете вписать туда название устройства, случайную строку или вовсе игнорировать. Работать чат будет и без "ресурса".</p>
            <h2><Anchor id="ohmyserver">У меня не работает другой сервер с вами.</Anchor></h2>
            <p>В большинстве случаев, проблемы будут на вашей стороне. Прежде чем вы напишете нам в <a href="xmpp:support@conference.jabber.ru?join">support@c.j.r</a>, не поленитесь проверить свой сервер через сервис <a href="https://xmpp.net">XMPP Observatory</a>. Если по их данным с вашим сервером всё хорошо, проверьте, что регистрация на вашем сервере закрыта капчей. Так как мы не любим получать спам, мы предпочитаем закрываться от сервисов с открытой регистрацией. Проверить наличие вашего сервера в нашем спам листе можно сделав запрос к нашей DNSBL зоне 'dnsbl.jabber.ru'. Например, "jabber.ru.dnsbl.jabber.ru". Если же регистрация у вас закрыта, XMPP Observatory говорит, что с сервисом всё хорошо, а в DNSBL листе вы не значитесь — добро пожаловать в саппорт. Возможно, вы действительно нашли проблему у нас.</p>
            <h2><Anchor id="beahero">Как удалить свой аккаунт?</Anchor></h2>
            <p>Принципиально, удалять аккаунт смысла нет. Но если осознание наличие аккаунта не даёт спокойно жить, то советуем воспользоваться функцией "Отмена регистрации" в различных клиентах. Например, такая функциональность есть в Psi+. Администрация удалением аккаунтов не занимается.</p>
            <h2><Anchor id="newpassword">Как сменить свой пароль?</Anchor></h2>
            <p>В большинстве клиентов есть соответствующая функциональность. Попытайтесь воспользоваться ей. Если клиент не умеет менять пароль, то вы можете воспользоваться ссылкой <a href="/remind">"напомнить пароль"</a>, ввести свой логин, и вам придёт ссылка для ввода нового пароля.</p>
            <h2><Anchor id="antispam">Ко мне не приходят сообщения, почините!</Anchor></h2>
            <p>В феврале 2017 года мы запустили антиспам. Условия доставки сообщений достаточно просты: собеседник должен быть у вас в контакт листе и вы должны авторизовать его. Если вы уверены, что эти условия выполнены, а сообщения не проходят всё равно — напишите нам в <a href="xmpp:support@conference.jabber.ru?join">support@c.j.r</a>.</p>
            <h2><Anchor id="spam">От вас приходит спам! (You are sending spam!)</Anchor></h2>
            <p>Пожалуйста, свяжитесь с нами через форму обратной связи или в <a href="xmpp:support@conference.jabber.ru?join">support@c.j.r</a> и мы постараемся прекратить поток спама.</p>
            <p>Please report spam through feedback form at the bottom of this page or report spam to <a href="xmpp:support@conference.jabber.ru?join">support@c.j.r</a>. We'll do our best to stop spam.</p>
        <h1><Anchor id="dreams">Часть планомечтательная</Anchor></h1>
          <p>Наши планы не всегда реалистичны или адекватны нашим возможностям. Но тем не менее, мы стремимся к следующему:</p>
          <ul> 
            <li>Запуск почтового сервиса;</li>
            <li>Запуск платных услуг на базе jabber.ru (хостинг доменов);</li>
            <li>Запуск собственного клиентского приложения с упрощённой регистрацией;</li>
            <li>Захват мира.</li>
          </ul>
{/*
        <h1><Anchor id="historic">Часть историческая</Anchor></h1>
          <h2>Начало начал</h2>
            <p>История домена начинается со славного города Мытищи, <s>промышленного и научного центра России</s>. Домен изначально числился за провайдером east.ru. Почти год с этим доменом ничего не происходило, публичного сервиса как такого не было. В 2001 году домен фактически оказывается в руках ermine: знакомые по Фидо предлагают заняться jabber'ом, и предлагают помощь с оборудованием.</p>
            <p>С этого момента на jabber.ru появлется сайт и, собственно, jabber сервер. Изначально - jabber14. Позднее jabber мигрировали на ejabberd.</p>
            <p>Первые несколько лет jabber.ru переезжал несколько раз с одного сервера знакомых на другой, пока в 2003 году не был куплен собственный сервер на коммерческом хостинге.</p> 
            <p>Значительное влияние на развитие проекта оказал Irsi (ныне забаненный на ЛОРе), который очень активно пиарил сервис на разных площадках. С его помощью аудитория начала расти куда быстрее.</p>
            <p>В 2005 году в историю сервиса ворвался Бобук. Он предложил обратиться к kukutz с просьбой о хостинге в Яндексе. И Яндекс, в лице kukutz, на эту просьбу дал согласие. Так Jabber.ru оказался в датацентрах Яндекса. Сначала на двух серверах, а ещё позже - на четырёх. Тут важно заметить, что во внутренние дела Яндекс никогда не вникал и сервис всегда оставался независимым.</p>
            <p>Почти все остальные события носят больше технических, нежели исторических характер. К проекту приложили свою руку разные люди, многие из которых значительно изменили лицо jabber.ru.</p>
          <h2>Команда сегодня</h2>
            <p>Сегодня основная команда jabber.ru, пожалуй, состоит из трёх человек. Найти их можно в <a href="xmpp:support@conference.jabber.ru?join">support@conference.jabber.ru</a></p>
            <p className="person"><span>ermine</span><img src="https://placeholdit.imgix.net/~text?txtsize=70&txt=150x150&w=150&h=150"/> Владычица, менеджер, директор - назовите как хотите. Но jabber.ru - детище именно ermine.</p>
            <p className="person"><span>zinid</span><img src="https://placeholdit.imgix.net/~text?txtsize=70&txt=150x150&w=150&h=150"/> Программист, спортсмен <s>и просто красавец</s>. Человек, который отвечает за безперебойную работу собственно jabber'a, патчит и чинит сервер.</p>
            <p className="person"><span>vt</span><img src="https://placeholdit.imgix.net/~text?txtsize=70&txt=150x150&w=150&h=150"/> Мастер на все руки. Помогает оказывать техническую поддержку пользователям, помогает конструктивной критикой, кодом в клиентские приложения.</p>
            <p className="person"><span>oxpa</span><img src="https://placeholdit.imgix.net/~text?txtsize=70&txt=150x150&w=150&h=150"/> Системный администратор. Что-то чинит, что-то ломает и постоянно строит утопические планы.</p>
*/}
        <h1><Anchor id="callback">Часть <span>обратно</span><span>контактная</span></Anchor></h1>
        <CallbackForm/>
    </Footer>
)}})
