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


    /** генерируем тестовые данные */
    var testData =[],
        date = (new Date()).getTime(),
        num = 756,
        temp, dateObj, airline, plane, flight, i;

    for(i=0; i<48; i++){

        date+= 30*60*1000;
        dateObj = new Date(date);

        airline = app.random([
            {"name":"Air Canada", "logo":"AC"},
            {"name":"DAT", "logo":"DX"},
            {"name":"EAE", "logo":"EA"},
            {"name":"Thai Air Asia", "logo":"FD"},
            {"name":"Bulgaria Air", "logo":"FB"},
            {"name":"Icelandair", "logo":"FI"},
            {"name":"54", "logo":"5H"},
            {"name":"Cartilago Airlines", "logo":"5R"},
            {"name":"Canadian North", "logo":"5T"},
            {"name":"Germanwings", "logo":"4U"},
            {"name":"LAN", "logo":"XL"},
            {"name":"CCM Airlines", "logo":"XK"},
            {"name":"Владивосток Авиа", "logo":"XF"}
        ]);

        plane = app.random([
            {"name":"Boeing 737-800", "short":"B737"},
            {"name":"Airbus A319", "short":"A319"},
            {"name":"Airbus A320", "short":"A320"},
            {"name":"Airbus A330-200", "short":"A330"}
        ]);

        temp = {
            "id":num++,
            "flight":(flight = app.random(["arrivals","departures"])),
            "airline":airline.name,
            "logo":airline.logo,
            "type":plane.name,
            "shorttype":plane.short,
            "airport":app.random([
                "Париж(Шарль Де Голь)",
                "Сеул(Инчеон)",
                "Краснодар(Пашковский)",
                "Прага(Вацлав Гавел)",
                "Гамбург(Гамбург)",
                "Токио(Нарита)",
                "Стамбул(Ататюрк)",
                "Шанхай(Пудон)"
            ]),
            "time":dateObj.getHours()+":"+dateObj.getMinutes(),
            "status":(flight == "departures")?app.random(["регистрация", "ожидание посадки", "посадка закончена", "вылетел", "задерживается до", "отменён"]):app.random(["по расписанию", "летит", "приземлился", "задерживается до", "отменён"]),
            "note":app.random(["-", "-", "-", "-", "-", airline.logo+"/AN",airline.logo+"/EX",airline.logo+"/FA"])
        };

        if(temp.status == "задерживается до")temp.status+=(new Date(date+(Math.random()*10*60*60*1000))).getHours()+":00"

        testData.push(temp);
    }

    /** отрисовываем */
    for(var key in testData){

        /** костыль для правильной подсветки выбранных маршрутов */
        testData[key].container = (testData[key].flight == 'arrivals')?'span':'div';

        content.innerHTML += app.template(rowTemplate,testData[key]);
    }


})();
