!function r(o,a,l){function d(e,t){if(!a[e]){if(!o[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(u)return u(e,!0);var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}var i=a[e]={exports:{}};o[e][0].call(i.exports,function(t){return d(o[e][1][t]||t)},i,i.exports,r,o,a,l)}return a[e].exports}for(var u="function"==typeof require&&require,t=0;t<l.length;t++)d(l[t]);return d}({1:[function(t,e,n){"use strict";function s(t,e){var n=this;this.options=e,this.$container=document.querySelector(t),this.$carouselWrapper=this.$container.firstElementChild,this.$carouselWrapper.firstElementChild.append(this.$carouselWrapper.firstElementChild.children[0].cloneNode(!0)),this.$carouselWrapper.firstElementChild.insertBefore(this.$carouselWrapper.firstElementChild.children[this.$carouselWrapper.firstElementChild.children.length-2].cloneNode(!0),this.$carouselWrapper.firstElementChild.children[0]),this.$slidesWrapper=this.$carouselWrapper.firstElementChild,this.$slides=Array.from(this.$slidesWrapper.children),this.curentSlide=1;var s=this;this.$carouselWrapper.style="max-width: "+(this.$container.offsetWidth-40)+"px",this.slideWidth=this.$carouselWrapper.offsetWidth*this.$slides.length,this.slidesWidth=this.$slides.map(function(t){return t.offsetWidth}),this.$slides.forEach(function(t){t.style.width=n.$slidesWrapper.offsetWidth+"px"}),this.$slidesWrapper.style.width=this.slideWidth+"px",r(null,"start",this),setTimeout(function(){n.$slidesWrapper.style.transition="left 0.3s"},0),this.$prevSlideBtn=i("button","carousel-btn prev",this.$container),this.$prevSlideBtn.addEventListener("click",function n(t){t.target.removeEventListener("click",n),s.prevSlide(t,s),s.$slidesWrapper.addEventListener("transitionend",function t(e){e.target.removeEventListener("transitionend",t),s.$prevSlideBtn.addEventListener("click",n)})}),this.$nextSlideBtn=i("button","carousel-btn next",this.$container),this.$nextSlideBtn.addEventListener("click",function n(t){t.target.removeEventListener("click",n),s.nextSlide(t,s),s.$slidesWrapper.addEventListener("transitionend",function t(e){e.target.removeEventListener("transitionend",t),s.$nextSlideBtn.addEventListener("click",n)})}),this.options.autoPlay&&this.autoPlayMethod(),this.options.dots&&this.dotsInit(),this.options.title&&this.titleInit("init"),Object.defineProperty(this,"_curentSlide",{get:function(){return this.curentSlide},set:function(t){this.updateDot("rm",this.curentSlide),this.curentSlide=t,this.updateDot("add",this.curentSlide)}}),window.addEventListener("resize",function(){n.responsive()})}function i(t,e,n){var s=document.createElement(t);return s.setAttribute("class",e),n.appendChild(s),s}function r(t,e,n){"start"===e&&(n.$slidesWrapper.style.left="-"+n.slideWidth/n.$slides.length+"px"),"end"===e&&(n.$slidesWrapper.style.left="-"+n.slidesWidth.slice(0,n.slidesWidth.length-2).reduce(function(t,e){return t+e})+"px")}e.exports=function(t,e){return new s(t,e)},s.prototype.nextSlide=function(t,s){s.$slides[s._curentSlide+1]&&(s._curentSlide=s._curentSlide+1),s.$slides[s._curentSlide+1]||(s._curentSlide=1,s.$slidesWrapper.addEventListener("transitionend",function t(e,n){s.$slidesWrapper.style.transition="none",r(e,"start",s),s.$slidesWrapper.removeEventListener("transitionend",t),setTimeout(function(){s.$slidesWrapper.style.transition=" left 0.3s"},0)}));var e=s.$slides[s.curentSlide].offsetWidth;s.$slidesWrapper.style.left=""===s.$slidesWrapper.style.left?-e+"px":parseInt(s.$slidesWrapper.style.left)-e+"px"},s.prototype.prevSlide=function(t,s){s._curentSlide=s._curentSlide-1,s.$slides[s.curentSlide-1]||(s._curentSlide=s.$slides.length-2,this.$slidesWrapper.addEventListener("transitionend",function t(e,n){e.target.style.transition="none",r(e,"end",s),e.target.removeEventListener("transitionend",t),setTimeout(function(){e.target.style.transition=" left 0.3s"},0)}));var e=s.$slides[s.curentSlide].offsetWidth;s.$slidesWrapper.style.left=""===s.$slidesWrapper.style.left?e+"px":parseInt(s.$slidesWrapper.style.left)+e+"px"},s.prototype.autoPlayMethod=function(){this.setIntervalId&&clearInterval(this.setIntervalId);var e=this;this.setIntervalId=setInterval(this.nextSlide,1500,null,this),this.$slidesWrapper.addEventListener("mouseover",function(t){clearInterval(e.setIntervalId),t.target.addEventListener("mouseout",function(){return e.autoPlayMethod()})})},s.prototype.dotsInit=function(){var s=this,t=this.$slides.length-3,e=document.createElement("div");e.classList.add("dots");for(var n=0;n<=t;n++){var i=document.createElement("i");i.classList.add("dots__el"),e.appendChild(i)}this.dots=Array.from(e.children),e.addEventListener("click",function(t){var e,n;"i"===t.target.tagName.toLowerCase()&&(n=(e=s).dots.indexOf(t.target),e.$slidesWrapper.style.left="-"+(e.slideWidth/e.$slides.length*n+e.slideWidth/e.$slides.length)+"px",e._curentSlide=n+1)}),this.$carouselWrapper.appendChild(e),this.updateDot("add",this.curentSlide)},s.prototype.updateDot=function(t,e){this.options.dots&&("rm"===t&&this.dots[e-1]&&this.dots[e-1].classList.remove("active"),"add"===t&&this.dots[e-1]&&this.dots[e-1].classList.add("active"))},s.prototype.titleInit=function(t){var e=this,n=document.createElement("div");n.classList.add("slide-title"),this.$carouselWrapper.appendChild(n),this.$title=n,this.$carouselWrapper.addEventListener("mouseover",function(){e.$title.innerText=e.$slides[e.curentSlide].dataset.slideTitle,e.$title.style.opacity=1}),this.$carouselWrapper.addEventListener("mouseout",function(){e.$title.style.opacity=0})},s.prototype.responsive=function(){var t=this;this.currentResponsiveTimeout&&clearTimeout(this.currentResponsiveTimeout),this.currentResponsiveTimeout=setTimeout(function(){t.$carouselWrapper.style="max-width: "+(t.$container.offsetWidth-40)+"px"},500)}},{}],2:[function(t,e,n){"use strict";e.exports=function(t,e){var i=document.createDocumentFragment();t.forEach(function(t){var e=r("tr",null,"");for(var n in t){var s=r("td","table__td",t[n]);e.appendChild(s)}e.appendChild(r("td","table__td",r("button","edit-btn",'<i class="fas fa-pen"></i>'))),e.appendChild(r("td","table__td",r("button","rm-btn",'<i class="fas fa-trash-alt"></i>'))),i.appendChild(e)}),e.appendChild(i)};var r=t("./createEl.js")},{"./createEl.js":7}],3:[function(t,e,n){"use strict";function s(){this.$activeTab=null,this.$activeTabContent=null,this.$tabsContainer=document.querySelector(".tabs"),this.$tabsControllers=Array.from(document.querySelectorAll(".tab-el"));var e=this;this.$tabsContainer.addEventListener("click",function(t){e.showTabContent(t,e)}),this.showDefaultTab()}(e.exports=s).prototype.init=function(t){this.showTabContent()},s.prototype.showTabContent=function(t,e){t.target.classList.contains("tab-el")&&t.target!==e.$activeTab&&(delete e.$activeTab.dataset.tab,e.$activeTabContent.style="display: none",e.$activeTab=t.target,e.$activeTab.dataset.tab="selected",e.$activeTabContent=document.querySelector("*[data-tab-content = "+e.$activeTab.dataset.tabName+"]"),this.$activeTabContent.style="display: block")},s.prototype.showDefaultTab=function(t){this.$activeTab=document.querySelector('*[data-tab="selected"]'),this.$activeTab&&(this.$activeTabContent=document.querySelector("*[data-tab-content = "+this.$activeTab.dataset.tabName+"]"),this.$activeTabContent.style="display: block")}},{}],4:[function(t,e,n){"use strict";e.exports=function(t){Array.from(t).forEach(function(t){s(null,t),t.addEventListener("blur",function(t){s(t,null)})})};var s=t("./checkInputsHasValueHandler.js")},{"./checkInputsHasValueHandler.js":5}],5:[function(t,e,n){"use strict";e.exports=function(t,e){if(null!==t&&null===e){var n=t.target;n.value?n.nextElementSibling.classList.add("has-value"):n.nextElementSibling.classList.remove("has-value")}null===t&&null!==e&&(e.value?e.nextElementSibling.classList.add("has-value"):e.nextElementSibling.classList.remove("has-value"))}},{}],6:[function(t,e,n){"use strict";e.exports=a;var o=t("./setDublesumbolVal.js");function a(t,e,n){var s=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,i=!(4<arguments.length&&void 0!==arguments[4])||arguments[4],r=new Date;this.isClock=i,this.hours=this.isClock?r.getHours():0,this.minutes=this.isClock?r.getMinutes():0,this.seconds=this.isClock?r.getSeconds():0,this.$hours=t,this.$minutes=e,this.$seconds=n,this.$container=s,i||(this.$container.addEventListener("mouseover",a.prototype.stop.bind(this)),this.$container.addEventListener("mouseout",a.prototype.start.bind(this))),this.$hours.innerHTML=o(this.hours,this.$hours.innerHTML,10),this.$minutes.innerHTML=o(this.minutes,this.$minutes.innerHTML,10),this.$seconds.innerHTML=o(this.seconds,this.$seconds.innerHTML,10)}a.prototype.log=function(){},a.prototype.incHour=function(){this.hours<23?this.hours=this.hours+1:this.hours=0,this.$hours.innerHTML=o(this.hours,this.$hours.innerHTML,10)},a.prototype.incMinute=function(){this.minutes<59?this.minutes=this.minutes+1:(this.incHour(),this.minutes=0),this.$minutes.innerHTML=o(this.minutes,this.$minutes.innerHTML,10)},a.prototype.incSecond=function(){this.seconds<59?this.seconds=this.seconds+1:(this.incMinute(),this.seconds=0),this.$seconds.innerHTML=o(this.seconds,this.$seconds.innerHTML,10)},a.prototype.start=function(){var t=this;this.timerID=setInterval(function(){t.incSecond()},1e3)},a.prototype.stop=function(){this.isClock||clearInterval(this.timerID)},a.prototype.reset=function(){this.isClock||(this.hours=0,this.minutes=0,this.seconds=0,this.$hours.innerHTML="00",this.$minutes.innerHTML="00",this.$seconds.innerHTML="00")}},{"./setDublesumbolVal.js":12}],7:[function(t,e,n){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports=function(t,e,n){var s=document.createElement(t);e&&s.classList.add(e);"string"==typeof n||"number"==typeof n?s.innerHTML=n:"object"===(void 0===n?"undefined":i(n))&&s.appendChild(n);return s}},{}],8:[function(t,e,n){"use strict";e.exports=function(t){t.target.classList.contains("rm-btn")&&(e=this,n=t.target,e.removeChild(n.parentNode.parentNode));var e,n;t.target.classList.contains("edit-btn")&&function(n,t,e){e.removeEventListener("submit",a);var s=t.parentNode.parentNode,i=Array.from(document.querySelectorAll("#"+e.id+" input[name]")),r=[];Array.from(s.children).forEach(function(t){t.firstChild.tagName||r.push(t.innerText)}),i.forEach(function(t,e){t.value=r[e]}),i.forEach(function(t){o(null,t)}),s.classList.add("on-edit"),n.classList.add("event-none"),e.addEventListener("submit",function t(e){!function(t,e,n){var s=new FormData(t.target),i=[],r=[];Array.from(e.children).forEach(function(t){t.firstChild.tagName||r.push(t)});var o=!0,a=!1,l=void 0;try{for(var d,u=s.keys()[Symbol.iterator]();!(o=(d=u.next()).done);o=!0){var c=d.value;i.push(s.get(c))}}catch(t){a=!0,l=t}finally{try{!o&&u.return&&u.return()}finally{if(a)throw l}}r.forEach(function(t,e){t.innerText=i[e]}),t.target.reset()}(e,s),this.removeEventListener("submit",t),s.classList.remove("on-edit"),this.addEventListener("submit",a),n.classList.remove("event-none")})}(this,t.target,document.getElementById("student-table"))};var o=t("./checkInputsHasValueHandler.js"),a=t("./studentsAddEventHandler.js")},{"./checkInputsHasValueHandler.js":5,"./studentsAddEventHandler.js":13}],9:[function(t,e,n){"use strict";e.exports=function(t){var e=t.target,n=e.parentElement,s=Array.from(n.children);alert("Index of current cell is "+s.indexOf(e))}},{}],10:[function(t,e,n){"use strict";e.exports=function(t,r){var e=document.getElementById(t);e.addEventListener("click",function(t,e){var n,s,i;return n=r,s=o,(i=new XMLHttpRequest).open("GET",n,!0),i.onload=function(){200!=i.status||s(JSON.parse(i.responseText),document.querySelector("#students-table tbody"))},void i.send()})};var o=t("./GenerStudentTable")},{"./GenerStudentTable":2}],11:[function(t,e,n){"use strict";var s=t("./clock.js"),i=t("./tableGenerator.js"),r=t("./getIndexOfEl.js"),o=t("./checkInputsHasValue.js"),a=t("./windowSizeBadge.js"),l=t("./Tab.js"),d=t("./Carousel"),u=t("./getParseJSON"),c=(t("./GenerStudentTable"),t("./studentsAddEventHandler.js")),h=t("./editStudentsHandler.js"),p=document.getElementById("table-generator"),f=document.getElementsByClassName("input-component__input"),m=document.getElementById("viewport-badge"),v=document.getElementById("table-generator"),y=document.getElementById("student-table"),b=(new l,new s(document.getElementById("clock-hour"),document.getElementById("clock-minute"),document.getElementById("clock-second"))),$=new s(document.getElementById("timer-hour"),document.getElementById("timer-minute"),document.getElementById("timer-second"),document.getElementById("timer"),!1);b.start(),$.start(),window.addEventListener("keyup",function(t){27===t.keyCode&&$.reset()}),v.addEventListener("reset",function(t){setTimeout(function(){o(document.querySelectorAll("#"+t.target.id+" .input-component__input"))},0)},"passive"),y.addEventListener("reset",function(t){setTimeout(function(){o(document.querySelectorAll("#"+t.target.id+" .input-component__input"))},0)},"passive"),window.addEventListener("resize",function(t){a(m)},!0),a(m),o(f),p.addEventListener("submit",function(t){t.preventDefault();var e=i(document.getElementById("table-rows").value,document.getElementById("table-cols").value);e?(t.target.reset(),document.getElementById("table-container").appendChild(e),e.addEventListener("click",function(t){r(t)})):t.target.reset()});d(".carousel",{autoPlay:!1,dots:!0,title:!0}),d(".another-cats",{autoPlay:!0}),u("get-students-btn","/database/students.json");document.getElementById("student-table").addEventListener("submit",function(t){return t.preventDefault()}),document.getElementById("student-table").addEventListener("submit",c),document.querySelector("#students-table tbody").addEventListener("click",h)},{"./Carousel":1,"./GenerStudentTable":2,"./Tab.js":3,"./checkInputsHasValue.js":4,"./clock.js":6,"./editStudentsHandler.js":8,"./getIndexOfEl.js":9,"./getParseJSON":10,"./studentsAddEventHandler.js":13,"./tableGenerator.js":14,"./windowSizeBadge.js":15}],12:[function(t,e,n){"use strict";e.exports=function(t,e,n){e=t<n?"0"+t:""+t;return e}},{}],13:[function(t,e,n){"use strict";e.exports=function(t){t.preventDefault();var e=new FormData(t.target),n={},s=[],i=!0,r=!1,o=void 0;try{for(var a,l=e.keys()[Symbol.iterator]();!(i=(a=l.next()).done);i=!0){var d=a.value;n[d]=e.get(d)}}catch(t){r=!0,o=t}finally{try{!i&&l.return&&l.return()}finally{if(r)throw o}}s.push(n),u(s,document.querySelector("#students-table tbody")),t.target.reset()};var u=t("./GenerStudentTable")},{"./GenerStudentTable":2}],14:[function(t,e,n){"use strict";e.exports=function(t,e){var n=parseFloat(t),s=parseFloat(e);if(!function(t,e){if(isNaN(t)||isNaN(e))return alert("Please, enter the quantity of rows & columns correct."),!1;if(t<=0||e<=0)return alert("The quantity of rows & columns must be a positive number."),!1;if(!Number.isInteger(t)||!Number.isInteger(e))return alert("Please, enter the integer quantity of rows & columns correct."),!1;return!0}(n,s))return;var i=document.createElement("table");i.setAttribute("class","table");for(var r=0;r<n;r++){var o=document.createElement("tr");o.setAttribute("class","table__tr");for(var a=0;a<s;a++){var l=document.createElement("td");l.setAttribute("class","table__td"),o.appendChild(l)}i.appendChild(o)}return i}},{}],15:[function(t,e,n){"use strict";e.exports=function(t){s.curentSetTimeoutId&&clearInterval(s.curentSetTimeoutId);s.curentSetTimeoutId=setTimeout(function(){t.innerText=window.innerWidth+"px × "+window.innerHeight+"px",t.setAttribute("style","opacity: 1"),setTimeout(function(){t.setAttribute("style","opacity: 0")},2e3)},2e3)};var s={curentSetTimeoutId:void 0}},{}]},{},[11]);