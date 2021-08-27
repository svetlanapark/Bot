// ==UserScript==
// @name         Ya_Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot
// @author       SvetlanaPorodina
// @match        https://yandex.ru/*
// @match        https://ya.ru/*
// @grant        none
// ==/UserScript==

let keywords = ["жизнь китов", "ламантины вымирают",
"кольцо Эйнштейна", "аллигаторы-альбиносы"];
let btn = document.querySelectorAll('.button_theme_search')[0];
let links = document.links;
let keyword = keywords [getRandom(0,keywords.length)];
document.querySelectorAll('.input__control')[0].value = keyword;

if (btn !== undefined) {
    btn.click();
}else{
    for (let i=0; i<links.length; i++) {
        if (links[i].href.includes('https://nat-geo.ru/')){
            let link = links[i];
            link.removeAttribute("target");
            link.click();
            console.log("Нашел строку" + links[i]);
            break;
        }
    }
}
function getRandom(min,max){
return Math.floor(Math.random()*(max-min)+min)
}
