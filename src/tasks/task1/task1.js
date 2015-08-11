(function(){
    var app = new Application(),

        /** элементы табло (шапка и тело) */
        header = app.getElements('bTask1__header')[0],
        content = app.getElements('bTask1__content')[0],

        /** для фиксации шапки табло */
        offsetTop = header.offsetTop,
        parent = header,

        /** шаблон для детальной информации по рейсу */
        detailTemplate = '' +
            '<div id="{id}" class="bTask1__detailsBody">' +
                '<a href="#">X</a>' +
                '<div><img src="http://tablo.novene.ru/themes/aviatablo/images/airline_logos/{logo}@2x.png"/></div>' +
                '<strong>Рейс №{id}</strong> <div class="bTask1__icon bTask1__icon_{flight}"></div>' +
                '<div> Воздушное судно: {type}</div>' +
                '<div> Авиакомпания: {airline}</div>' +
                '<div> Аэропорт назначения: {airport}</div>' +
                '<div> Время: {time}</div>' +
                '<div> Статус рейса: {status}</div>' +
                '<div> Примечание: {note}</div>'+
            '</div>'
        ,
        rowTemplate = ''+
            '<{container} class="row {flight}">' +
                '<a href="#{id}" class="bTask1__details">' +
                    '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"><div class="bTask1__icon bTask1__icon_{flight}"></div></div>' +   // тип рейса
                    '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">{id}</div>'+                      // номер рейса
                    '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 visible-lg">{airline}</div>'+      // авиакомпания
                    '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-1"><img src="http://tablo.novene.ru/themes/aviatablo/images/airline_logos/{logo}@2x.png"/> </div>' +     // логотип
                    '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 hidden-xs">{type}</div>'+          // тип воздушного судна
                    '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 visible-xs">{shorttype}</div>'+    // сокращенный тип воздушного судна
                    '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">{airport}</div>'+                 // аэропорт назначения
                    '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">{time}</div>'+                    // плановое время вылета или прилёта
                    '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">{status}</div>'+                  // статус рейса
                    '<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">{note}</div>'+                    // примечание
                '</a>'+
                detailTemplate +
            '</{container}>';


    /** приклеиваем шапку табло при прокрутке */
    while (parent = parent.offsetParent)offsetTop += parent.offsetTop;
    function onScroll(e) {

        var scrollY = ('scrollY' in window)?window.scrollY:window.pageYOffset;

        (scrollY >= offsetTop) ? header.classList.add('bTask1__header_fixed') :
            header.classList.remove('bTask1__header_fixed');
    }
    document.addEventListener('scroll', onScroll);


    /** задаем тестовые данные */
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


    /** отрисовываем */
    for(var key in testData){

        /** костыль для правильной подсветки выбранных маршрутов */
        testData[key].container = (testData[key].flight == 'arrivals')?'span':'div';

        content.innerHTML += app.template(rowTemplate,testData[key]);
    }


})();
