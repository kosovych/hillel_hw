!function r(o,a,l){function u(e,t){if(!a[e]){if(!o[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(c)return c(e,!0);var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}var s=a[e]={exports:{}};o[e][0].call(s.exports,function(t){return u(o[e][1][t]||t)},s,s.exports,r,o,a,l)}return a[e].exports}for(var c="function"==typeof require&&require,t=0;t<l.length;t++)u(l[t]);return u}({1:[function(t,e,n){"use strict";function i(t,e){var n=this;this.options=e,this.$container=document.querySelector(t),(this.$container.carouselObj=this).$carouselWrapper=this.$container.firstElementChild,this.$carouselWrapper.firstElementChild.append(this.$carouselWrapper.firstElementChild.children[0].cloneNode(!0)),this.$carouselWrapper.firstElementChild.insertBefore(this.$carouselWrapper.firstElementChild.children[this.$carouselWrapper.firstElementChild.children.length-2].cloneNode(!0),this.$carouselWrapper.firstElementChild.children[0]),this.$slidesWrapper=this.$carouselWrapper.firstElementChild,this.$slides=Array.from(this.$slidesWrapper.children),this.curentSlide=1,this.$carouselWrapper.style="max-width: "+(this.$container.offsetWidth-40)+"px";var i=this;this.slideWidth=this.$carouselWrapper.offsetWidth*this.$slides.length,this.slidesWidth=this.$slides.map(function(t){return t.offsetWidth}),this.$slides.map(function(t){t.style.width=n.$slidesWrapper.offsetWidth+"px"}),r(null,"start",this),setTimeout(function(){n.$slidesWrapper.style.transition="left 0.3s"},0),this.$slidesWrapper.style.width=this.slideWidth+"px",this.$prevSlideBtn=s("button","carousel-btn prev",this.$container),this.$prevSlideBtn.addEventListener("click",function n(t){t.target.removeEventListener("click",n),i.prevSlide(t,i),i.$slidesWrapper.addEventListener("transitionend",function t(e){e.target.removeEventListener("transitionend",t),i.$prevSlideBtn.addEventListener("click",n)})}),this.$nextSlideBtn=s("button","carousel-btn next",this.$container),this.$nextSlideBtn.addEventListener("click",function n(t){t.target.removeEventListener("click",n),i.nextSlide(t,i),i.$slidesWrapper.addEventListener("transitionend",function t(e){e.target.removeEventListener("transitionend",t),i.$nextSlideBtn.addEventListener("click",n)})}),this.autoPlayMethod()}function s(t,e,n){var i=document.createElement(t);return i.setAttribute("class",e),n.appendChild(i),i}function r(t,e,n){"start"===e&&(n.$slidesWrapper.style.left="-"+n.slideWidth/n.$slides.length+"px"),"end"===e&&(n.$slidesWrapper.style.left="-"+n.slidesWidth.slice(0,n.slidesWidth.length-2).reduce(function(t,e){return t+e})+"px")}e.exports=function(t,e){return new i(t,e)},i.prototype.nextSlide=function(t,i){i.curentSlide+=1,i.$slides[i.curentSlide+1]||(i.curentSlide=1,i.$slidesWrapper.addEventListener("transitionend",function t(e,n){i.$slidesWrapper.style.transition="none",r(e,"start",i),i.$slidesWrapper.removeEventListener("transitionend",t),setTimeout(function(){i.$slidesWrapper.style.transition=" left 0.3s"},0)}));var e=i.$slides[i.curentSlide].offsetWidth;i.$slidesWrapper.style.left=""===i.$slidesWrapper.style.left?-e+"px":parseInt(i.$slidesWrapper.style.left)-e+"px"},i.prototype.prevSlide=function(t,i){i.curentSlide-=1,i.$slides[i.curentSlide-1]||(i.curentSlide=i.$slides.length-2,this.$slidesWrapper.addEventListener("transitionend",function t(e,n){e.target.style.transition="none",r(e,"end",i),e.target.removeEventListener("transitionend",t),setTimeout(function(){e.target.style.transition=" left 0.3s"},0)}));var e=i.$slides[i.curentSlide].offsetWidth;i.$slidesWrapper.style.left=""===i.$slidesWrapper.style.left?e+"px":parseInt(i.$slidesWrapper.style.left)+e+"px"},i.prototype.autoPlayMethod=function(){if(this.options.autoPlay){this.setIntervalId&&clearInterval(this.setIntervalId);var e=this;this.setIntervalId=setInterval(this.nextSlide,1500,null,this),this.$slidesWrapper.addEventListener("mouseover",function(t){clearInterval(e.setIntervalId),t.target.addEventListener("mouseout",function(){return e.autoPlayMethod()})})}}},{}],2:[function(t,e,n){"use strict";function i(){this.$activeTab=null,this.$activeTabContent=null,this.$tabsContainer=document.querySelector(".tabs"),this.$tabsControllers=Array.from(document.querySelectorAll(".tab-el"));var e=this;this.$tabsContainer.addEventListener("click",function(t){e.showTabContent(t,e)}),this.showDefaultTab()}(e.exports=i).prototype.init=function(t){this.showTabContent()},i.prototype.showTabContent=function(t,e){t.target.classList.contains("tab-el")&&t.target!==e.$activeTab&&(delete e.$activeTab.dataset.tab,e.$activeTabContent.style="display: none",e.$activeTab=t.target,e.$activeTab.dataset.tab="selected",e.$activeTabContent=document.querySelector("*[data-tab-content = "+e.$activeTab.dataset.tabName+"]"),this.$activeTabContent.style="display: block")},i.prototype.showDefaultTab=function(t){this.$activeTab=document.querySelector('*[data-tab="selected"]'),this.$activeTab&&(this.$activeTabContent=document.querySelector("*[data-tab-content = "+this.$activeTab.dataset.tabName+"]"),this.$activeTabContent.style="display: block")}},{}],3:[function(t,e,n){"use strict";function i(t,e){if(null!==t&&null===e){var n=t.target;n.value?n.nextElementSibling.classList.add("has-value"):n.nextElementSibling.classList.remove("has-value")}null===t&&null!==e&&(e.value?e.nextElementSibling.classList.add("has-value"):e.nextElementSibling.classList.remove("has-value"))}e.exports=function(t){Array.from(t).forEach(function(t){i(null,t),t.addEventListener("blur",function(t){i(t,null)})})}},{}],4:[function(t,e,n){"use strict";e.exports=a;var o=t("./setDublesumbolVal.js");function a(t,e,n){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,s=!(4<arguments.length&&void 0!==arguments[4])||arguments[4],r=new Date;this.isClock=s,this.hours=this.isClock?r.getHours():0,this.minutes=this.isClock?r.getMinutes():0,this.seconds=this.isClock?r.getSeconds():0,this.$hours=t,this.$minutes=e,this.$seconds=n,this.$container=i,s||(this.$container.addEventListener("mouseover",a.prototype.stop.bind(this)),this.$container.addEventListener("mouseout",a.prototype.start.bind(this))),this.$hours.innerHTML=o(this.hours,this.$hours.innerHTML,10),this.$minutes.innerHTML=o(this.minutes,this.$minutes.innerHTML,10),this.$seconds.innerHTML=o(this.seconds,this.$seconds.innerHTML,10)}a.prototype.log=function(){console.log(this)},a.prototype.incHour=function(){this.hours<23?this.hours=this.hours+1:this.hours=0,this.$hours.innerHTML=o(this.hours,this.$hours.innerHTML,10)},a.prototype.incMinute=function(){this.minutes<59?this.minutes=this.minutes+1:(this.incHour(),this.minutes=0),this.$minutes.innerHTML=o(this.minutes,this.$minutes.innerHTML,10)},a.prototype.incSecond=function(){this.seconds<59?this.seconds=this.seconds+1:(this.incMinute(),this.seconds=0),this.$seconds.innerHTML=o(this.seconds,this.$seconds.innerHTML,10)},a.prototype.start=function(){var t=this;this.timerID=setInterval(function(){t.incSecond()},1e3)},a.prototype.stop=function(){this.isClock||clearInterval(this.timerID)},a.prototype.reset=function(){this.isClock||(this.hours=0,this.minutes=0,this.seconds=0,this.$hours.innerHTML="00",this.$minutes.innerHTML="00",this.$seconds.innerHTML="00")}},{"./setDublesumbolVal.js":7}],5:[function(t,e,n){"use strict";e.exports=function(t){var e=t.target,n=e.parentElement,i=Array.from(n.children);console.dir(i),alert("Index of current cell is "+i.indexOf(e))}},{}],6:[function(t,e,n){"use strict";var i=t("./clock.js"),s=t("./tableGenerator.js"),r=t("./getIndexOfEl.js"),o=t("./checkInputsHasValue.js"),a=t("./windowSizeBadge.js"),l=t("./Tab.js"),u=t("./Carousel"),c=document.getElementById("table-generator"),d=document.getElementsByClassName("input-component__input"),h=document.getElementById("viewport-badge"),p=document.getElementById("table-generator"),f=(new l,new i(document.getElementById("clock-hour"),document.getElementById("clock-minute"),document.getElementById("clock-second"))),m=new i(document.getElementById("timer-hour"),document.getElementById("timer-minute"),document.getElementById("timer-second"),document.getElementById("timer"),!1);f.start(),m.start(),window.addEventListener("keyup",function(t){27===t.keyCode&&m.reset()}),p.addEventListener("reset",function(t){setTimeout(function(){o(document.querySelectorAll("#"+t.target.id+" .input-component__input"))},0)},"passive"),window.addEventListener("resize",function(t){a(h)},!0),a(h),o(d),c.addEventListener("submit",function(t){t.preventDefault();var e=s(document.getElementById("table-rows").value,document.getElementById("table-cols").value);e?(t.target.reset(),document.getElementById("table-container").appendChild(e),e.addEventListener("click",function(t){r(t)})):t.target.reset()});u(".carousel",{autoPlay:!0}),u(".another-cats",{autoPlay:!1})},{"./Carousel":1,"./Tab.js":2,"./checkInputsHasValue.js":3,"./clock.js":4,"./getIndexOfEl.js":5,"./tableGenerator.js":8,"./windowSizeBadge.js":9}],7:[function(t,e,n){"use strict";e.exports=function(t,e,n){e=t<n?"0"+t:""+t;return e}},{}],8:[function(t,e,n){"use strict";e.exports=function(t,e){var n=parseFloat(t),i=parseFloat(e);if(!function(t,e){if(isNaN(t)||isNaN(e))return alert("Please, enter the quantity of rows & columns correct."),!1;if(t<=0||e<=0)return alert("The quantity of rows & columns must be a positive number."),!1;if(!Number.isInteger(t)||!Number.isInteger(e))return alert("Please, enter the integer quantity of rows & columns correct."),!1;return!0}(n,i))return;var s=document.createElement("table");s.setAttribute("class","table");for(var r=0;r<n;r++){var o=document.createElement("tr");o.setAttribute("class","table__tr");for(var a=0;a<i;a++){var l=document.createElement("td");l.setAttribute("class","table__td"),o.appendChild(l)}s.appendChild(o)}return s}},{}],9:[function(t,e,n){"use strict";e.exports=function(t){t.setAttribute("style",""),i.curentSetTimeoutId&&clearInterval(i.curentSetTimeoutId);t.innerText=window.innerWidth+"px × "+window.innerHeight+"px",i.curentSetTimeoutId=setTimeout(function(){t.setAttribute("style","opacity: 0")},2e3)};var i={curentSetTimeoutId:void 0}},{}]},{},[6]);