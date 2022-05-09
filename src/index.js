import { obj, spec, enRu, specShift } from './obj.js';
import { html } from './innerHTML.js';
// import './normalize.css'
// import './style.css'
document.body.innerHTML = html;
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
let lang = localStorage.getItem('lang') || "en";
let caps = false;
const textarea = get('textarea');



function get(selector) {
   return document.querySelector(selector);
}
function tabs () {
   textarea.textContent += '    ';
}
function backSpace () {
   textarea.textContent = textarea.textContent.split("").splice(0, textarea.textContent.length-1).join('');
}
function enter () {
   textarea.textContent += '\n';
}
function capsLockPress () {
   get("#capslock").classList.toggle("active");
   caps = (caps === false) ? true : false;
   (caps === true) ? capsLock('keydown') : capsLock('keyup');
}
function capsLock (q) {
   let n;
   for (let item of Object.keys(obj)) {
      if (q === 'keydown') {
         get(`${obj[item]} span`).textContent = get(`${obj[item]} span`).textContent.toUpperCase();
         n = lang === "ru"? 3 : 1;
       } else {
         get(`${obj[item]} span`).textContent = get(`${obj[item]} span`).textContent.toLowerCase();
         n = lang === "ru"? 2 : 0;
      }
   }
   for(let item of Object.keys(specShift)) {
      get(`${item} span`).textContent = specShift[item][n];
   }
}


function textareaEdit (e) {
   if(obj[e.keyCode]) {
      let n = get(obj[e.keyCode])
      textarea.textContent += (caps === true) ? n.textContent.toUpperCase() : n.textContent;
   }
   (e.keyCode === 13) ? enter() :0; 
   (e.keyCode === 8) ? backSpace(): 0; 
   (e.keyCode === 9) ? tabs() : 0; 
}
for(let item of Object.values(obj)) { 
   get(item).addEventListener('click', function() {
      textarea.textContent += (caps) ? get(item).textContent.toUpperCase() : get(item).textContent;
   })
}
get('#tab').addEventListener('click', tabs);
get('#backSpace').addEventListener('click', backSpace);
get('#enter').addEventListener('click', enter);
get('#capslock').addEventListener('click', capsLockPress);
get('#shift1').addEventListener('mousedown', function() {capsLock('keydown')});
get('#shift1').addEventListener('mouseup', function() {capsLock('keyup')});
get('#shift2').addEventListener('mousedown', function() {capsLock('keydown')});
get('#shift2').addEventListener('mouseup', function() {capsLock('keyup')});

function keydown (e) {
   textareaEdit(e);
   if(obj[e.keyCode]) {
      get(obj[e.keyCode]).classList.add("active");
   } else if(spec[e.code]){
      get(spec[e.code]).classList.add("active");
   } else {
      (e.keyCode === 20) ? capsLockPress() :0;
   }
   if(e.code === "ShiftLeft" || e.code === "ShiftRight") {
      capsLock('keydown');
   }

   if (e.shiftKey && e.ctrlKey) {
      console.log("caps " + caps);
      lang = (lang === "ru") ? "en" : "ru";
      changeLanguage(lang);
      setLocalStorageLang();
   }
}

function keyup (e) {
   if(obj[e.keyCode]) {
      get(obj[e.keyCode]).classList.remove("active");
   } else if(spec[e.code]){
      get(spec[e.code]).classList.remove("active");
   }
   if(e.code === "ShiftLeft" || e.code === "ShiftRight") {
      capsLock('keyup');
   }
}

function changeLanguage (lang) {
   if (lang === "ru") {
      for(let item of Object.keys(enRu)) {
         get(`${item} span`).textContent = enRu[item][1];
      }
   } else {
      for(let item of Object.keys(enRu)) {
         get(`${item} span`).textContent =  enRu[item][0];
      }
   }
}

function setLocalStorageLang() {
   localStorage.setItem('lang', lang);
 }
 window.addEventListener('beforeunload', setLocalStorageLang);
 function getLocalStorageLang() {
   if(localStorage.getItem('lang')) {
     const theme = localStorage.getItem('lang');
     (theme == 'ru') ?  changeLanguage("ru") :  changeLanguage("en");
   }
 }
 window.addEventListener('load', getLocalStorageLang);