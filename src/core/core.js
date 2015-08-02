'use strict';

(function(window){

    /** small js extender (for get elements) */
    document.getElementsByClassName||(document.getElementsByClassName=function(b){var d=[],c=document.getElementsByTagName("*");b=new RegExp("(^|\\s)"+b+"(\\s|$)");for(var a=0;a<c.length;a++)b.test(c[a].className)&&d.push(c[a]);return d});

    /**
     * application constructor
     *
     * @constructor Application
     * @param {string|null} src      server url when resource located
     * @param {string} logo     logotype selector
     * @param {string} content  content selector
     * @param {string} tasks    task links selector name
     *
     */
    var Application = function(src, logo, content, tasks){
        try{
            this.src = src || '/src/tasks/task';
            this.head = document.getElementsByTagName('head')[0];
            this.logo = this.getElements(logo)[0];
            this.content = this.getElements(content)[0];
            this.tasks = this.getElements(tasks);
            this.initialize();
        }catch(e){
            this.exception('Can`t initialize application');
        }
    };

    Application.prototype = {
        'constructor':Application,

        /**
         * Exception handler
         *
         * @param msg   some message
         */
        'exception':function(msg){
            console.log(msg);
        },

        /**
         * Get dom element collection by class name
         *
         * @param {string} selector class-name
         * @returns {NodeList}
         */
        'getElements':function(selector){
            return document.getElementsByClassName(selector);
        },

        /**
         * Load task from server to content block
         *
         * @param {object} ajax     parameters (use url for load html and success  for set handler)
         */
        'load':function(ajax){

            var _this = this,
                xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE ) {
                    if(xhr.status == 200){
                        ajax.success(xhr.responseText);
                    }else{
                        _this.exception('Error when get ajax data.');
                        ajax.success();
                    }
                }
            };

            xhr.open("GET", ajax.url, true);
            xhr.send();
        },
        'loading':function(flag){
            var logo = this.logo;

            if(flag){
                logo.setAttribute('class',logo.getAttribute('class')+' bShri__logo_loading');
            }else{
                logo.setAttribute('class',logo.getAttribute('class').replace(/ bShri__logo_loading/g,''));
            }

        },
        'initialize':function(){
            var _this = this,
                tasks = _this.tasks,
                len = tasks.length,
                i = 0,
                currentCss, currentJs;

            for(;i<len;i++){
                tasks[i].onclick = function(){
                    var id = this.getAttribute("data-task"),
                        url = _this.src+id+'/task'+id;

                    _this.loading(true);

                    _this.load({
                        'url':url+'.html',
                        'success':function(data){
                            var css = document.createElement('link'),
                                js = document.createElement('script');

                            if(currentCss)_this.head.removeChild(currentCss);
                            if(currentJs)_this.head.removeChild(currentJs);

                            css.rel="stylesheet";
                            css.type="text/css";
                            css.href= url+".css";
                            js.src = url+".js";

                            currentCss = css;
                            currentJs = js;

                            _this.head.appendChild(currentCss);
                            _this.content.innerHTML = data;
                            _this.head.appendChild(currentJs);

                            window.setTimeout(function(){_this.loading();}, 2000);
                        }
                    });
                }
            }
        }
    };

    window.Application = Application;

})(window);

var app = new Application(
    '/shri2015/src/tasks/task',
    'bShri__logo',
    'bShri__content',
    'bShri__task'
);
