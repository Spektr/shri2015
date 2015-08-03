(function(){
    var app = new Application(),
        header = app.getElements('bTask1__header')[0],
        content = app.getElements('bTask1__content')[0],
        offsetTop = header.offsetTop,
        parent = header,
        rowTemplate = ''+
            '<tr>'+
                '<td>{flight}</td>'+                        // тип рейса
                '<td>{id}</td>'+                            // номер рейса
                '<td class="visible-lg">{airline}</td>'+    // авиакомпания
                '<td>{logo}</td>'+                          // логотип
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


    for(var i=0;i<20;i++){
        content.innerHTML += rowTemplate;
    }


})();
