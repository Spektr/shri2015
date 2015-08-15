(function(window){

    var app = new Application(),

        Player = function(source, destination, startBtn, stopBtn, settings, songName, songAuthor){

            try{

                this.source = this.getElements(source)[0];
                this.destination = this.getElements(destination)[0];
                this.startBtn = this.getElements(startBtn)[0];
                this.stopBtn = this.getElements(stopBtn)[0];
                this.settings = this.getElements(settings)[0];
                this.songName = this.getElements(songName)[0];
                this.songAuthor = this.getElements(songAuthor)[0];

                this.initialize();

            }catch(e){
                this.exception('Can`t initialize player');
            }
        };

    Player.prototype = {
        "constructor":Player,
        "input":null,
        "audioContext":null,

        "filters": {
            "default": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "pop": [-2, -1, 0, 3, 5, 5, 2, 0, -1, -3],
            "rock": [4, 3, 0, -3, -4, -4, -1, 2, 3, 4],
            "jazz": [4, 3, 1, 2, -3, -3, 0, 1, 3, 4],
            "classic": [5, 4, 3, 2, -2, -2, 0, 2, 3, 4]
        },

        // расширяем функционалом приложения
        "getElements":app.getElements,
        "exception":function(msg){
            return app.exception(msg);
        },

        /**
         * Инициализатор
         */
        "initialize":function(){
            var _this = this;

            // поле для загрузки файлов
            if(!_this.input){
                _this.input = document.createElement('input');
                _this.input.type = 'file';
            }

            // создаем аудио контекст
            if(!_this.audioContext)_this.audioContext = new AudioContext();

            // задаем двумерных контекст канве
            _this.destination.getContext('2d');

            // обработчик клика на области загрузки
            _this.source.addEventListener("click", function(){
                _this.input.click();
            });

            // загрузка файла при перетаскивании
            _this.source.addEventListener('drop', _this.loadFile(), false);

            // загрузка файла при выборе
            _this.input.addEventListener('change', _this.loadFile(), false);

        },

        "loadFile":function(){
            var _this = this;

            return function(e){
                return console.log(_this, this, e);

            }
        },

        "play":function(){},
        "stop":function(){},
        "getMeta":function(){}
    };



    var playerok = new Player('bTask3__file', 'bTask3__visual');


})(window);