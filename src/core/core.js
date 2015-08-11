'use strict';

(function(window){

    /** js shim (for get elements) */
    document.getElementsByClassName||(document.getElementsByClassName=function(b){var d=[],c=document.getElementsByTagName("*");b=new RegExp("(^|\\s)"+b+"(\\s|$)");for(var a=0;a<c.length;a++)b.test(c[a].className)&&d.push(c[a]);return d});

    /**
     * js shim (for work with classes)
     * @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js
     */
    if("document" in self&&!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}


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
        if(singleton !== null)return singleton;

        try{
            this.src = src || '/src/tasks/task';
            this.head = document.getElementsByTagName('head')[0];
            this.logo = this.getElements(logo)[0];
            this.content = this.getElements(content)[0];
            this.tasks = this.getElements(tasks);
            this.initialize();
            singleton = this;

        }catch(e){
            this.exception('Can`t initialize application');
        }
    },
    singleton = null;

    Application.prototype = {
        'constructor':Application,

        /**
         * Get some random value
         *
         * @param {[]} arr some array
         * @returns {*}
         */
        'random':function(arr){
            if(!arr.length)return this.exception('Need array!');
            return arr[Math.floor(Math.random() * arr.length)];
        },


        /**
         * Small template engine
         *
         * @param {string} string       template
         * @param {object} replaceObj   substitute values
         * @returns {XML|string|void}
         */
        'template':function(string, replaceObj){
            return string.replace(/{[^{}]+}/g, function(key){
                return replaceObj[key.replace(/[{}]+/g, "")] || "";
            });
        },

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

        /**
         * Visualization of loading
         *
         * @param {boolean} flag   loading checker
         */
        'loading':function(flag){
            var logo = this.logo;

            if(flag){
                logo.setAttribute('class',logo.getAttribute('class')+' bShri__logo_loading');
            }else{
                logo.setAttribute('class',logo.getAttribute('class').replace(/ bShri__logo_loading/g,''));
            }

        },

        /**
         * Set handlers for links
         */
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

// инициируем приложение (оно спрячется в синглтон)
var app = new Application(
    '/shri2015/src/tasks/task',
    'bShri__logo',
    'bShri__content',
    'bShri__task'
);
