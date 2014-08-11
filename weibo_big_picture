// ==UserScript==
// @name            Weibo Big Picture
// @namespace       https://github.com/adelabs
// @description     New buttons for opening full sized pictures in new background tabs. Add "href" attributes to "Full size"/"查看大图"/"查看大圖" anchors so that you can mid-click or right-click them with more options.
// @version         3.2.1
// @license         GPL version 3
// @include         *://weibo.com/*
// @require         http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant           GM_openInTab
// @run-at          document-end
// ==/UserScript==

/*
 *  https://gist.github.com/adelabs/7f483736baca2d5c1c90/raw/weibo_big_picture.user.js
 */

function create_button(text, hrefs) {
    var a = $('<a class="W_btn_b"><span>' + text + '</span></a>');
    return a.click(function(e){
        for (var i=0; i<hrefs.length; ++i) {
            GM_openInTab(hrefs[i], true);
        }
    });
}

setInterval(function(){
    // For each thumbnail (`img.bigcursor`) create an anchor (`<a/>`), which opens a background tab for the full sized picture when clicked.
    $('ul.WB_media_list').each(function(){
        if ($(this).attr('adelabs') == '1') { return; }
        $(this).attr('adelabs', '1');
        var hrefs = [];
        $(this).find('img.bigcursor').each(function(i){
            if ($(this).attr('action-type') != 'fl_pics' &&
                $(this).attr('node-type') != 'feed_list_media_bgimg') {
                return;
            }
            var src = $(this).attr('src');
            var basename = src.replace(/.*\//, '');
            var href = '//ww3.sinaimg.cn/large/' + basename;
            hrefs.push(href);
        });
        for (var i=0; i<hrefs.length; ++i) {
            var a = create_button((i+1).toString(), [hrefs[i]]);
            $(this).before(a).before(' ');
        }
        if (hrefs.length > 1) {
            var a = create_button('all', hrefs);
            $(this).before(a);
        }
    });

    // Where there is a "Full size" anchor (`a.show_big`), set its "href" and create an extra anchor (`<a/>`) aside, which opens a backgroud tab for the full size picture when clicked.
    $('a.show_big').each(function(i){
        var action_data = $(this).attr('action-data');
        var pid = action_data.replace(/.*\bpid=(\w+).*/, '$1');
        var href = '//ww3.sinaimg.cn/large/' + pid;
        if ($(this).attr('href') != href) {
            $(this).attr('href', href);
            var a = $(this).next();
            if (a.attr('class') == 'W_btn_b') { a.remove(); }
            a = create_button('open', [href]);
            $(this).after(a);
        }
    });
}, 500);
