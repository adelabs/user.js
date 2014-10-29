// ==UserScript==
// @name        Weibo Classic
// @namespace       https://github.com/adelabs
// @description     A.T.T
// @version         0.9
// @license         GPL version 3
// @downloadURL     https://github.com/adelabs/user.js/raw/master/weibo_classic.user.js
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
    document.cookie = cname + "=" + cvalue + "; " + expires;
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

document.cookie="wvr6=0; expires=31 Dec 2012 12:00:00 UTC; domain=.weibo.com; path=/"
document.cookie="wvr=0; expires=31 Dec 2012 12:00:00 UTC; domain=.weibo.com; path=/"
document.cookie="wvr6=0; expires=31 Dec 2015 12:00:00 UTC; domain=.weibo.com; path=/"
document.cookie="wvr=4; expires=31 Dec 2015 12:00:00 UTC; domain=.weibo.com; path=/"
