// ==UserScript==
// @name            Fudan BBS NoNavBar
// @namespace       https://github.com/adelabs
// @description     Hide/show navbar for Fudan BBS
// @version         2.0.1
// @license         GPL version 3
// @downloadURL     https://github.com/adelabs/user.js/raw/master/fudan_bbs_hide_navbar.user.js
// @include         *://bbs.fudan.edu.cn/*
// @include         *://bbs.fudan.sh.cn/*
// @require         http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant           none
// @run-at          document-end
// ==/UserScript==

// Add a button
var button = $('<button>hide</button>');
$([
    'div#main > form',     // Forms (new post, reply, forward, user query)
    'div#main > img',      // Index
    'div#main > table',    // Sections
    'div.heading > div',   // Board
    'div.ptop > a',        // Post
].join(',')).first().before(button);

// Toggle
speed = 500;
var navbar = $('ul#nav');
var headerbar = $('div#hd');
var main = $('div#main');
button.click(function(){
    console.log('toggle');
    if (button.text() == 'show') {
        navbar.show(speed);
        headerbar.show(speed);
        main.attr('style', 'margin:6px 6px 6px 144px');
        button.text('hide');
    } else {
        navbar.hide();
        headerbar.hide();
        main.attr('style', 'margin:6px 6px 6px 6px');
        button.text('show');
    }
}).hide().click().show(speed);
