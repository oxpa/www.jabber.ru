import {Footer} from "./menus.js";
import {Anchor, Anchored} from "./anchor.js";
import {Link} from 'react-router';
import * as React from 'react';

const Placeholder = (props) => <img src="https://placeholdit.imgix.net/~text?txtsize=70&txt=250x350&w=350&h=450"/>

export const Svcs = Anchored(
    class extends React.Component {
    render () { return (
    <Footer>
      <div className="svcs">
        <div className="svc">
          <h1><Anchor id="rating">Рейтинг конференций</Anchor></h1>
          <div className="svcimg"><img src="/static/rating.png"/></div>
          <div className="svcdesc">

          <h2>Что это</h2>
            <p><a href="http://jc.jabber.ru">jc.jabber.ru</a> -  первая в России система рейтинга и поиска джаббер-конференций, которая собирает и обрабатывает статистику с ведущих джаббер-серверов Рунета, а также предоставляет интерфейс для удобного поиска по ним.</p>
            <p>Если вы тут первый раз и не поняли о чем шла речь в первом абзаце, то данный абзац как раз для вас. На самом деле все просто! Джаббер-конференция - это тот же чат(chat), т.е. место коллективного общения, если совсем в двух словах. А сам джаббер - это название протокола обмена мгновенными сообщениями, также известный как XMPP, который был принят в сети как стандарт, поэтому сегодня его используют все ведущие ресурсы Рунета для обмена сообщениями.</p>
            <p>Данный проект создавался для того, чтоб облегчить пользователям выбор места для общения, так называемых чат-комнат(конференций). На нашем сайте Вы можете воспользоваться удобным поиском, посмотреть рейтинг самых посещаемых конференций, найти информацию о программном обеспечении и других сопутствующих вещах.</p>

          <h2>Как это работает</h2>
            <p>Наша система производит постоянное сканирование наиболее популярных русскоязычных узлов сети, ведет каталог, поисковый индекс и собирает статистику джаббер-конференций.</p>

          <h2>Кто участвует в рейтинге</h2>
            <p>В рейтинге участвуют русскоязычные конференции, все остальные мы стараемся фильтровать. Также "под нож" попадают конференции с множеством ботов, с закрытым доступом, уличенные в рассылке рекламы или накрутке рейтинга.</p>
            <p>В рейтинге также учитывается и количественный показатель , после чего конференция начинает отображаться в рейтинге - это среднее количество участников за сутки, которое должно быть больше или равно пяти, но тут не стоит забывать, что мы не приветствуем накрутку и большое количество ботов в конференциях(обычно больше трех).</p>
            <p>Не создавайте себе лишних проблем: если конференция будет забанена, вернуть ее в рейтинг у вас так просто не получится.</p>

          <h2>У вас есть сервер конференций и вы хотите участвовать в рейтинге</h2>
            <p>Если конференции вашего сервера посещаемы, то воспользуйтесь формой обратной связи и оставьте нам сообщение. Для участия в рейтинге ваш сервер должен позволять получать информацию с аккаунтов jabber.ru через Discovery.</p>
        </div>
        </div>

        <div className="svc">
          <div className="svcdesc">
          <h1><Anchor id="archive">Архив сообщений</Anchor></h1>
          <div className="svcimg"><img src="/static/archive.png"/></div>
            <h2>Что это</h2>
            <p>Общедоступный архив сообщений конференций. В архив попадают только те, кто явно в него попросился. Логичное продолжение "Рейтинга конференций". Каждая фраза сказанная, каждая ссылочка на забавного котика, вомбата или капибару, заботливо сохраняется ежом в недрах его жёстких дисков. И наш архив даёт возможность найти историю сообщений каждой отдельной комнаты, за каждый отдельный день, по порядку написания.</p>
            <h2>Как это работает</h2>
            <p>Для конференций на серверах jabber.ru, история пишется непосредственно сервером сразу в лог. Для конференций, которые находятся вне серверов jabber.ru, история сохраняется специальными программами (ботами), которые слушают сообщения конференции. Как если бы участники строчили по три сообщения: себе, собеседникам и в архив. Только куда более дисциплинированно.</p>
            <h2>Как добавить комнату в архив</h2>
            <p>Так же, как и удалить</p>
            <h2>Как удалить архив сообщений комнаты</h2>
            <p>Так же, как и добавить</p>
            <h2>Что за дурацкий юмор?!</h2>
            <p>Ладно-ладно... Если вы хотите, чтобы логи вашего чата были доступны (или недоступны) в нашем сервисе — напишите в конференцию <a href="xmpp:support@conference.jabber.ru?join">support@conference.jabber.ru</a>, и мы что-нибудь придумаем. Но почти наверняка мы попросим вас предъявить права владельца конференции и общее согласие по вопросу добавления конференции в архив.</p>
        </div>
        </div>

        <div className="svc">
          <div className="svcdesc">
          <h1><Anchor id="juick">Juick</Anchor></h1>
          <div className="svcimg"><img src="/static/juick.png"/></div>
          <h2>Что это</h2>
          <p><a href="https://juick.com">Juick.com</a> — старомодная социальная сеть. Вы видели твиттер? Если вы хотите твиттер без толпы гламурных шутников и с доставкой сообщений в jabber, жуйк — ваш выбор. Просто напишите боту juick@juick.com и следуйте его неразборчивым инструкциям</p>
          <h2>Как это работает</h2>
          <p>Вы точно видели твиттер? Вот почти так же. Только основным интерфейсом для juick'а является бот. Вы пишете сообщения боту — бот размещает их на странице сервиса. Другие пользователи, если захотят, могут ответить вам. Просто командный интерфейс бота, описание которого можно увидеть по команде HELP, оставляет множество возможностей ошибиться. Для тех, кто не хочет вести свой блог, есть RSS.</p>
          <p>Сервис (и бот) поддерживают некоторые расширенные возможности форматирования текст. Подробнее о них можно узнать в <a href="https://juick.com/help/ru/">помощи</a> самого сервиса.</p>
          <p>Сейчас juick работает с джаббером и телеграммом. С whatsapp'ом и viber'ом не работает по очевидным причинам: закрытый протокол и несговорчивость в создании гейтов в другие сервисы.</p>
          <h2>Зачем вам вообще это?!</h2>
          <p>Мы пользовались juick'ом, когда это ещё не было модно. И продолжили пользоваться им позже, когда стало уже не модно. Как пользователи, мы дорожим juick'ом и хотели бы, чтобы он был популярнее. Кроме того, juick — отличная возможность писать код, получать отзывы и наблюдать за жизнью небольшого и не очень дружного сообщества. "Just for fun", если в двух словах.</p>
          <h2>А нам это зачем?</h2>
          <p>Juick — хорошее дополнение к мессенджеру. Если вы хотите сохранить какие-либо записки или поделиться со всеми чем-либо полезным, juick — то, что вам нужно. Кроме того, в социальных сетях намного проще получить совет почти на любую тему (если, конечно, вы не боитесь публичного обсуждения ваших проблем).</p>
          <p>В общем, знакомьтесь, дружите! Зачем ещё нужны социальные сети?</p>
        </div>
        </div>

        <div className="svc planning">
          <div className="svcdesc">
          <h1><Anchor id="saas">Ваш домен - наш сервер</Anchor></h1>
          <div className="svcimg"><img src="/static/saas.png"/></div>
          <h2>Что это</h2>
           <p> "Ваш домен" — это SaaS от Jabber.ru. "Почта для доменов", "виртуальный хостинг" — разные названия одной и той же услуги: SaaS, service as a service, "услуга как услуга",  предоставление крупными компаниями своих служб и сервисов под ваши нужны. Серверы Jabber.ru теперь тоже можно использовать со своим доменом. Мы обеспечим вам надёжные услуги передачи сообщений просто потому, что нам нравится заниматься этим (да-да, "потому что мы можем"). Мы не гарантируем вам 100% надёжности или уникальности предоставляемых услуг. Мы просто надёжны и бесплатны. А кроме того — готовы оказать поддержку, которая вам никогда не понадобиться, лично, живыми людьми, а не толстенными справочными страницами.</p>
          <h2>Как это работает</h2>
            <p>Как и любой другой SaaS в этой области: мы просто пересылаем, храним, цензурируем  ваши сообщения, охраняем их от полчищ опасных кенгуру и представляем, по возможности, удобные интерфейсы для работы с ними.</p>
          <h2>Что именно умеет jabber.ru</h2>
            <p>Jabber. Мы умеем jabber, мгновенные сообщения. В будущем мы планируем запустить виртуальный почтовый сервис. А также станцию слежения за астероидами в поясе Койпера. Но только после захвата мира.</p>
          <h2>Как начать использовать</h2>
            <p>Чтобы использовать сервера jabber.ru со своим доменом вам потребуется зарегистрировать учётную запись на нашем сервисе и настроить ДНС. После подтверждения учётной записи, вы сможете зарегистрировать в системе перенаправление ваших доменов на сервера jabber.ru. После проверки нашим сервисом ДНС записей - всё готово, вы можете добавлять свои пользователей и начинать общение под собственным доменным именем.
</p>
          <h2>Дополнительные услуги</h2>
            <p>Если у вас есть идеи связанные с jabber, а наш сервис их, на первый взгляд, не поддерживает, — напишите нам в <a href="xmpp:support@conference.jabber.ru?join">support@conference.jabber.ru</a>, и мы обязательно что-нибудь придумаем в индивидуальном порядке. Мы любим странные штуки и беспокойных людей.</p>
        </div>
        </div>
      </div> 
    </Footer>
)}})