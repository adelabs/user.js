// ==UserScript==
// @name            Weibo Lite
// @namespace       https://github.com/adelabs
// @description     Clear the ads and add a toggle button to hide/show bottom bar and side bars.
// @version         1.2
// @license         GPL version 3
// @downloadURL     https://github.com/adelabs/user.js/raw/master/weibo_lite.user.js
// @include         *://weibo.com/*
// @require         http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant           none
// @run-at          document-end
// ==/UserScript==

/*
 *  https://github.com/adelabs/user.js/raw/master/weibo_lite.user.js
 */

// Add a button.
var button = $('<button></button>');
$('div.W_main_c').before(button.hide());
// Function the button.
var speed = 1000;
button.text('hide').click(function(){
    var bars = $('div.W_main_l, div.W_main_r, div.global_footer');
    if (button.text() == 'hide') {
       bars.hide(speed, function(){button.text('show');});
    } else {
       bars.fadeIn(speed, function(){button.text('hide');});
    }
});
// Show the button and then toggle.
button.show(speed, function(){button.click();});

// Hide ads.
function hide_ads() {
    console.log('hide_ads');
    var ads = $([
        // Header ads
        'div.tips_player',
        'div.title_area',
        // Left side ads
        // Right side ads
        'div.adver_contB',
        'div#pl_rightmod_ads36',
        'div.M_activities',
        'div.M_abverArea',
        // Footer ads
        'div.footer_adv',
        // Mid ads
        'div.W_no_border',
    ].join());
    ads.each(function(){
        if ($(this).css('display') == 'none') { return; }
        console.log('Hide', this);
        $(this).hide();
    });
}
// Try 10 times in 10 seconds.
for (var i=0; i<10; ++i) {
    setTimeout(function(){hide_ads()}, 1000 * i);
}
