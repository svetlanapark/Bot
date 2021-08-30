// ==UserScript==
// @name         Ya_Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot
// @author       SvetlanaPorodina
// @match        https://yandex.ru/*
// @match        https://ya.ru/*
// @match        https://nat-geo.ru/*
// @grant        none
// ==/UserScript==

let keywords = ["жизнь китов", "ламантины вымирают",
                "кольцо Эйнштейна", "аллигаторы-альбиносы","светящееся гнездо"];
let btn = document.querySelectorAll('.button_theme_search')[0];
let yandexInput = document.querySelectorAll('.input__control')[0];
let links = document.links;
let keyword = keywords [getRandom(0,keywords.length)];
let nextPage = document.querySelector('[aria-label = "Следующая страница"]');


if (btn !== undefined) {
    let i = 0;
    let timerId = setInterval(() =>{
        yandexInput.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            btn.click();
        }
    },500);
}else if (location.hostname == 'nat-geo.ru') {
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101) >= 70) {
            location.href = "https://yandex.ru";
        }
        if (links[index].href.indexOf("nat-geo.ru")!== -1)
            links[index].click()}, getRandom (3000,7000));
}else{
    let nextYandexPage = true;
    for (let i=0; i<links.length; i++) {
        if (links[i].href.includes('https://nat-geo.ru/')){
            let link = links[i];
            link.removeAttribute("target");
            let nextYandexPage = false;
            setTimeout(()=>{link.click();},getRandom(1500,4500));
            console.log("Нашел строку" + links[i]);
            break;
        }
    }
    if(document.querySelector('[aria-label="Текущая страница 5"]')){
        let nextYandexPage = false;
        location.href = "https://yandex.ru";
    }
    if (nextYandexPage){
        setTimeout(()=>{nextPage.click();},getRandom(2000,6000));
    }
}
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}
