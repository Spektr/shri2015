(function(window){

    var app = new Application(),

        Player = function(parameters){

            var source = parameters.source,
                visual = parameters.visual,
                startBtn = parameters.startBtn,
                stopBtn = parameters.stopBtn,
                settings = parameters.settings,
                songName = parameters.songName,
                songAuthor = parameters.songAuthor,
                statusBar = parameters.statusBar;

            //try{

                this.source = this.getElements(source)[0];
                this.visual = this.getElements(visual)[0];
                this.startBtn = this.getElements(startBtn)[0];
                this.stopBtn = this.getElements(stopBtn)[0];
                this.settings = this.getElements(settings)[0];
                this.songName = this.getElements(songName)[0];
                this.songAuthor = this.getElements(songAuthor)[0];
                this.statusBar = this.getElements(statusBar)[0];

                this.initialize();

            //}catch(e){
            //    this.exception('Can`t initialize player');
            //}
        };

    Player.prototype = {
        "constructor":Player,
        "_input":null,           // скрытое поле файла
        "_audioContext":null,    // апи
        "_buffer":null,          // текущий аудио буфер
        "_pauseTime":null,       // время прослушивания
        "_songTime":null,        // общее время трэка


        // фильтры
        "_filters": {
            "normal": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "pop": [-2, -1, 0, 3, 5, 5, 2, 0, -1, -3],
            "rock": [4, 3, 0, -3, -4, -4, -1, 2, 3, 4],
            "jazz": [4, 3, 1, 2, -3, -3, 0, 1, 3, 4],
            "classic": [5, 4, 3, 2, -2, -2, 0, 2, 3, 4]
        },

        // расширяем функционалом приложения
        "getElements":app.getElements,
        "exception":function(msg){return app.exception(msg);},

        /**
         * Инициализатор
         */
        "initialize":function(){
            var _this = this;

            // поле для загрузки файлов
            if(!_this._input){
                _this._input = document.createElement('input');
                _this._input.type = 'file';
            }

            // создаем аудио контекст
            if(!_this._audioContext)_this._audioContext = new AudioContext();

            // создаем эквалайзер
            _this.equalizerNode = _this.createEqualizerNode();

            // создаем вывод звука
            _this.destinationNode = _this._audioContext.destination;

            // делаем схему обработки аудио (начиная с эквалайзера)
            _this.equalizerNode.connect(_this.destinationNode);

            // задаем двумерный контекст канве
            _this.visual.getContext('2d');

            // обработчик клика на области загрузки
            _this.source.addEventListener("click", function(){_this._input.click();});

            // загрузка файла при перетаскивании
            _this.source.addEventListener('drag', _this.loadFile(), false);

            // загрузка файла при выборе
            _this._input.addEventListener('change', _this.loadFile(function(){_this.startBtn.innerHTML = "пауза";}), false);

            // установка настройки эквалайзера
            _this.settings.addEventListener('change', function(){
                var type = this.options[this.selectedIndex].value;
                _this.equalizerNode.setType(type);
            }, false );

            // обработчик клика на старт/пауза
            _this.startBtn.addEventListener("click", function(){
                if(_this.play()){
                    _this.startBtn.innerHTML = "пауза";
                }else{
                    _this.startBtn.innerHTML = "старт";
                }
            });

            // обработчик клика на стоп
            _this.stopBtn.addEventListener("click", function(){
                _this.stop();
                _this.startBtn.innerHTML = "старт";
            });

        },

        // загрузка файла
        "loadFile":function(callback){
            var _this = this;   // замкнем текущий проигрыватель чтоб не потерялся

            return function(e){
                var file = (e.dataTransfer)?e.dataTransfer.files[0]:_this._input.files[0],
                    fileReader = new FileReader();

                e.preventDefault();
                _this.stop();

                if(!(/\.(wav|mp3|ogg)$/i).test(file.name))return _this.exception('Wrong file format (correct is wav|mp3|ogg)');

                _this.setStatus('loading...');

                fileReader.onload = function(e) {
                    _this._audioContext.decodeAudioData(
                        e.target.result,
                        function(buffer){
                            _this._buffer = buffer;
                            _this.showAudio();
                            _this.play();
                            _this.getMeta(file);
                            callback();
                        },
                        function(){_this.exception("Decode audio data error");}
                    );
                };
                fileReader.readAsArrayBuffer(file);

            }
        },

        // старт|пауза музыки
        "play":function(){
            var _this = this;

            if(_this.sourceNode){
                _this.sourceNode.stop(0);
                _this.pauseTime = (Date.now() - _this.pauseTime)/1000;
                _this.sourceNode = null;
                return false;
            }

            // создаем источник и связываем с эквалайзером
            _this.sourceNode = _this._audioContext.createBufferSource();
            _this.sourceNode.connect(_this.equalizerNode);
            _this.sourceNode.buffer = _this._buffer;

            // отслеживаем паузу
            if(_this.pauseTime){
                _this.sourceNode.start(0, _this.pauseTime);
            }else{
                _this.sourceNode.start(0);
                _this._songTime = _this._buffer.duration*1000;
                _this.setStatus(_this._songTime, 5000);
            }

            _this.pauseTime = Date.now();

            return true;
        },


        // стоп музыки
        "stop":function(){
            var _this = this;

            if(_this.sourceNode)_this.sourceNode.stop(0);

            _this.sourceNode = null;
            _this.pauseTime = null;

        },

        // показ музыки
        "showAudio":function(){

        },

        // получение|отображение меты файла
        "getMeta":function(){

        },

        // отображение статуса (покачто только для загрузки файла)
        "setStatus":function(msg, time){
            var _this = this,
                bar = _this.statusBar,
                old = bar.innerHTML;

            bar.innerHTML = msg;

            if(time){
                window.setTimeout(function(){
                    bar.innerHTML = old;
                }, time);
            }
        },

        // создаем узел эквалайзера (из 10 фильтров)
        "createEqualizerNode":function(){
            var _this = this,
                equalizer, filter, prevFilter;

            // делаем подборку фильтров разной частоты и связываем их
            equalizer = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000].map(function(frequency){

                filter = _this._audioContext.createBiquadFilter();

                filter.type = 'peaking';            // тип
                filter.frequency.value = frequency; // частота
                filter.Q.value = 1;                 // качество
                filter.gain.value = 0;              // децибелы

                if(prevFilter)prevFilter.connect(filter);
                prevFilter = filter;

                return filter;
            });

            // РИСКОВЫЕ ПЕРЕГРУЗКИ МЕТОДОВ
            // для связки (filter === equalizer[equalizer.length-1])
            equalizer[0].connect = function(){
                return filter.connect.apply(filter, arguments);
            };

            // для настройки эквалайзера
            equalizer[0].setType = function(type){
                equalizer.map(function(filter, index){
                    filter.gain.value = _this._filters[type][index];
                });
            };

            equalizer[0].setType('normal');

            return equalizer[0];
        }


    };


    // создаем проигрыватель
    var playerok = new Player({
        source: 'bTask3__file',
        visual: 'bTask3__visual',
        statusBar: 'bTask3__file',
        settings: 'bTask3__settings',
        startBtn: 'bTask3__play',
        stopBtn: 'bTask3__stop'
    });




})(window);