// ==UserScript==
// @name            Weibo Classic
// @namespace       https://github.com/adelabs
// @description     恢复微博V5
// @version         2.1
// @license         GPL version 3
// @include         *://weibo.com/*
// @include         *://.weibo.com/*
// @grant           none
// @run-at          document-start
// ==/UserScript==

//http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; domain=.weibo.com; path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

setCookie('wvr6', '0', -1);
setCookie('wvr6', '0', 999);
console.log(getCookie('wvr6'));

console.log(window.location.toString());
if (window.location.pathname.match(/home$/) && 
    window.location.search.match('wvr=5')) {
  var new_href = (window.location.protocal || 'http:') + '//' + window.location.host + window.location.pathname + '?upfrom=v5';
  console.log(new_href);
  location.href = new_href;
}
