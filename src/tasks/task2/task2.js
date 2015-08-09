/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже.
 *
 * Для начала спрячем все и слегка систематизируем.
 */
(function(){
    var app = new Application(),

        /** элементы интерфейса */
        continent   = app.getElements('bTask2__continent')[0],  // континент
        country     = app.getElements('bTask2__country')[0],    // страна
        city        = app.getElements('bTask2__city')[0],       // город
        counter     = app.getElements('bTask2__counter')[0],    // кнопка рассчета
        shower      = app.getElements('bTask2__shower')[0],     // поле ответа

        /** переменные и данные */
        requests    = ['/countries', '/cities', '/populations'],
        responses   = {},
        request, callback, i,

        /**
         * Считалка населения
         *
         * @param {object} parameters  набор параметров для подсчета населения
         * @void рассчитывает население и вызывает функцию обратного вызова
         */
        count = function(parameters){
            var responses   = parameters.responses || {},   // блок данных
                continent   = parameters.continent || '',   // выбранный континет
                country     = parameters.country || '',     // выбранная страна
                city        = parameters.city || '',        // выбранный город
                callback    = parameters.callback || function(){},  // функция обратного вызова
                c = [], cc = [], p = 0, i;

            for (i = 0; i < responses['/countries'].length; i++) {
                if (responses['/countries'][i].continent === continent) {
                    c.push(responses['/countries'][i].name);
                }
            }

            /** Добавляем указанную страну */
            if(country!=='' && c.indexOf(country) == -1)c.push(country);

            for (i = 0; i < responses['/cities'].length; i++) {
                for (j = 0; j < c.length; j++) {
                    if (responses['/cities'][i].country === c[j]) {
                        cc.push(responses['/cities'][i].name);
                    }
                }
            }

            /** Добавляем указанный город */
            if(city!=='' && cc.indexOf(city) == -1)cc.push(city);

            for (i = 0; i < responses['/populations'].length; i++) {
                for (j = 0; j < cc.length; j++) {
                    if (responses['/populations'][i].name === cc[j]) {
                        p += responses['/populations'][i].count;
                    }
                }
            }

            parameters.result = p;
            parameters.c = c;
            parameters.cc = cc;

            callback(parameters);
        },

        /**
         * Отображалка населения
         *
         * @param {object} parameters  набор параметров для подсчета населения
         * @void отображает в поле/консоли рассчитанное население
         */
        show = function(parameters){

            // визуальное
            shower.value = parameters.result + ' чел.';

            // детальное
            console.log('Total population in '+parameters.cc.join(', ')+' cities: ' + parameters.result);
        };


    /** назначим обработчик для подсчета населения */
    counter.onclick = function(){

        for (i = 0; i < 3; i++) {

            request = requests[i];

            /** замыкаем адрес запроса (устранение прошлой ошибки) */
            callback = (function(request){

                return function (error, result) {
                    var l = [], K;
                    responses[request] = result;

                    for (K in responses)
                        l.push(K);

                    if (l.length == 3) {
                        count({
                            'responses':responses,
                            'continent': continent.value,
                            'country':country.value,
                            'city':city.value,
                            'callback':show
                        });
                    }
                };

            })(request);

            getData(request, callback);
        }

        /** очищаем данные */
        responses = {};
    }

})();
