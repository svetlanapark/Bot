// ==UserScript==
// @name         Ya_Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot
// @author       SvetlanaPorodina
// @match        https://yandex.ru/*
// @match        https://ya.ru/*
// @match        https://nat-geo.ru/*
// @match        https://www.psyholog.me/*
// @match        https://www.motoreforma.com/*
// @grant        none
// ==/UserScript==

let sites = {
    "nat-geo.ru":["жизнь китов", "ламантины вымирают",
                  "кольцо Эйнштейна", "аллигаторы-альбиносы","светящееся гнездо"],
    'psyholog.me':["центр здоровых отношений", "Услуги центра здоровых отношений", "Чекалина Елена психолог"],
    'motoreforma.com':["мотореформа", "прошивки для CAN-AM", "тюнинг Maverikc X3", "тюнинг для квадроциклов CAN-AM", "вариатор CV-Tech для Can-Am"]
}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let btn = document.querySelectorAll('.button_theme_search')[0];
let yandexInput = document.querySelectorAll('.input__control')[0];
let links = document.links;
let keyword = keywords [getRandom(0,keywords.length)];
let nextPage = document.querySelector('[aria-label = "Следующая страница"]');

if (btn !== undefined) {
    document.cookie = `site = ${site}`;
}else if(location.hostname == "yandex.ru"){
    site = getCookie("site");
}else {
    site = location.hostname;
}


if (btn !== undefined) {
    document.cookie = `site = ${site}`;
    let i = 0;
    let timerId = setInterval(() =>{
        yandexInput.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            btn.click();
        }
    },500);
}else if (location.hostname == site) {
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101) >= 70) {
            location.href = "https://yandex.ru";
        }
        if (links[index].href.indexOf(site)!== -1)
            links[index].click()}, getRandom (1000,5000));
}else{
    let nextYandexPage = true;
    for (let i=0; i<links.length; i++) {
        if (links[i].href.includes(site)){
            let link = links[i];
            link.removeAttribute("target");
            let nextYandexPage = false;
            setTimeout(()=>{link.click();},getRandom(3000,7000));
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

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
