import * as React from 'react';

let success = {};
success.login = 
        <div className="success">
            <h1>Успешно</h1>
            <p>Наш охранный ёж решил,<br/> 
               что может пустить вас.
            </p> 
            <div className="loader"></div>
        </div>
success.register = 
        <div className="success">
            <h1>Успешно</h1>
            <p>Выбранное вами имя зарегистрировано и на указанный email было отправлено письмо с дальнейшими инструкциями по активации аккаунта. Ссылка будет работать одни сутки.</p>
            <p>Пожалуйста, пройдите по ссылке из письма, чтобы завершить регистрацию.</p>
            <p className="regthanks"></p>
            <img src="/static/ok.png"/>
        </div>
success.remind = 
        <div className="success">
            <h1>Успешно</h1>
            <p>Наши ежи с трудом запоминают новые пароли, но мы знаем как упростить эту задачу. Вам на почту была отправлена ссылка с секретным словом для обучения ежей.</p>
            <p> Используйте ссылку из письма, чтобы указать новый пароль.</p>
            <img src="/static/ok.png"/>
        </div>
success.password = 
        <div className="success">
            <h1>Успешно</h1>
            <p>Пока мы пытаемся объяснить охранным ежам, что пароль изменился, попробуйте войти в личный кабинет с новым паролем.</p>
            <img src="/static/ok.png"/>
        </div>

let errors = {}
errors['not-authorized'] = 'Неверный логин или пароль'
errors['bad-key'] = 'Неверный токен. Попробуйте запросить ссылку ещё раз.'
errors['weak-password'] = 'Попробуйте ещё раз с более сложным паролем.'
errors['email-exceeds'] = 'На этот email зарегистрировано слишком много аккаунтов. Попробуйте другой.'
errors['email-not-exists'] = 'Мы не знаем, куда отправить письмо. Возможно, аккаунт был удалён.'
errors['invalid-content-type'] = 'Упс! Что-то пошло не так. Попробуйте ещё раз или сообщите нам.'
errors['service-error'] = 'Упс! Что-то пошло не так. Попробуйте ещё раз или сообщите нам.'
errors['incomplete-data'] = 'Упс! Что-то пошло не так. Попробуйте ещё раз или сообщите нам.'
errors['captcha-failure'] = 'Капча думает, что вы робот. Попробуйте ещё раз.'
errors['login-already-exists'] = 'Такая учётная запись уже есть :( Попробуйте другой логин.'
errors['item-not-found'] = 'Упс! Что-то пошло не так. Попробуйте ещё раз или сообщите нам.'
errors['invalid-email'] = 'Сервер считает, что ваша почта "плохая". Попробуйте другую.'
errors['invalid-jid'] = 'Имя пользователя не прошло проверку сервера. Вы точно не почту вводите? Попробуйте другой псевдоним.'
errors['email-not-match'] = 'Имя пользователя и почта не совпадают.'
errors['one-time-email'] = 'Выберите другой одноразовый ящик, этот мы знаем.'
errors['unknown-mail-domain'] = 'Наш почтовый сервер не знает про этот домен. Попробуйте другой домен или сообщите нам об ошибке.'


export {success, errors}