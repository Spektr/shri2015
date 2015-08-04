(function(){
    var app = new Application(),
        header = app.getElements('bTask1__header')[0],
        content = app.getElements('bTask1__content')[0],
        offsetTop = header.offsetTop,
        parent = header,
        detailTemplate = '' +
            '<a href="#" class="bTask1__details">' +
                '{id}' +
                '<div>' +
                    '<div> Тип рейса: {flight}</div>' +
                    '<div> Код рейса: {id}</div>' +
                    '<div> Авиакомпания: {airline}</div>' +
                    '<div> Логотип: <img src="http://tablo.novene.ru/themes/aviatablo/images/airline_logos/{logo}@2x.png"/></div>' +
                    '<div> Тип саполета: {type}</div>' +
                    '<div> Аэропорт назначения: {airport}</div>' +
                    '<div> Время: {time}</div>' +
                    '<div> Статус рейса: {status}</div>' +
                    '<div> Примечание: {note}</div>'+
                '</div>' +
            '</a>'
        ,
        rowTemplate = ''+
            '<tr class="{flight}">' +
                '<td>{flight}</td>'+                        // тип рейса
                '<td>'+detailTemplate +'</td>'+             // номер рейса
                '<td class="visible-lg">{airline}</td>'+    // авиакомпания
                '<td><img src="http://tablo.novene.ru/themes/aviatablo/images/airline_logos/{logo}@2x.png"/> </td>'+                          // логотип
                '<td class="hidden-xs">{type}</td>'+        // тип воздушного судна
                '<td class="visible-xs">{shorttype}</td>'+  // сокращенный тип воздушного судна
                '<td>{airport}</td>'+                       // аэропорт назначения
                '<td>{time}</td>'+                          // плановое время вылета или прилёта
                '<td>{status}</td>'+                        // статус рейса
                '<td>{note}</td>'+                          // примечание
            '</tr>';


    /** приклеиваем шапку табло при прокрутке */
    while (parent = parent.offsetParent)offsetTop += parent.offsetTop;

    function onScroll(e) {
        (window.scrollY >= offsetTop) ? header.classList.add('bTask1__header_fixed') :
            header.classList.remove('bTask1__header_fixed');
    }

    document.addEventListener('scroll', onScroll);
    /** приклеиваем шапку табло при прокрутке */


    var testData = [
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"AC",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"DX",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"EA",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"FD",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"FB",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"FJ",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"FI",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"5H",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"5R",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"5T",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"4U",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"XL",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"XK",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"XF",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"XF",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"Y0",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"XR",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"XF",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"departures",
            "airline":"Aeroflot",
            "logo":"XF",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        },
        {
            "id":"1",
            "flight":"arrivals",
            "airline":"Aeroflot",
            "logo":"XF",
            "type":"Boeing 737-800",
            "shorttype":"B737",
            "airport":"ABQ",
            "time":"11:30",
            "status":"регистрация",
            "note":"примечание"
        }
    ];

    for(var key in testData){
        content.innerHTML += app.template(rowTemplate,testData[key]);
    }


})();
