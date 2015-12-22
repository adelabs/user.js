// ==UserScript==
// @name            Weibo Big Picture (新浪微博查看大图)
// @namespace       https://github.com/adelabs
// @description     New buttons for opening full sized pictures in new background tabs. Add "href" attributes to "Full size"/"查看大图"/"查看大圖" anchors so that you can mid-click or right-click them with more options.
// @version         4.0
// @license         GPL version 3
// @downloadURL     https://github.com/adelabs/user.js/raw/master/weibo_big_picture.user.js
// @include         *://weibo.com/*
// @require         http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant           GM_openInTab
// @run-at          document-end
// ==/UserScript==

/*
 *  https://github.com/adelabs/user.js/raw/master/weibo_big_picture.user.js
 */

(function initialize() {
    console.log('initialize');
    // Wait until feed list is found.
    if ($('.WB_feed').length == 0) {
        return setTimeout(initialize, 500);
    }
    // Launch!
    run();
    // Observe post list loading
    $('.WB_feed').each(function(i, o){
        var observer = new MutationObserver(function(mutations) {
            run();
        });
        observer.observe(o, {childList: true});
    });
    // Observe tab changing
    $('#plc_main').each(function(i, o){
        var observer = new MutationObserver(function(mutations) {
            initialize();
        });
        observer.observe(o, {childList: true});
    });
})();

function run() {
    console.log('run');
    // Create open-in-background buttons for thumbnails.
    $('ul.WB_media_a:not(.adelabs)').each(function(i, list){
        console.log($(list));
        $(list).addClass('adelabs');
        // Get one href for each thumbnail.
        var hrefs = [];
        $(list).find('img[node-type="fl_media_bgimg"], ' +  // single pic
                     'img[action-type="fl_pics"]'           // multiple pic
                     ).each(function(){
            hrefs.push(get_href_from_bigcursor($(this)));
        });
        // One button for each thumbnail.
        for (var i=0; i<hrefs.length; ++i) {
            var button = create_button((i+1).toString(), [hrefs[i]]);
            $(list).before(button).before(' ');
        }
        // One extra button for all.
        if (hrefs.length > 1) {
            var button = create_button('all', hrefs);
            $(list).before(button);
        }
    });
    
    // Observe all "Full size" anchors and create buttons for them.
    $('div.WB_media_expand:not(.adelabs), ' +  // post
      'div.expand:not(.adelabs)'  // repost
     ).each(function(i, expand){
        $(expand).addClass('adelabs');
        // Each time a mid sized pic is expanded,
        var observer_for_expand = new MutationObserver(function(mutations) {
            // for its "Full size" anchor,
            $(expand).find('a.show_big').each(function(i, show_big){
                // set its href and add a new button
                function update(show_big) {
                    href = get_href_from_show_big(show_big);
                    if (show_big.attr('href') == href) { return; }
                    show_big.attr('href', href);
                    show_big.parent().find('a.adelabs').remove();
                    var button = create_button('Open', [href]);
                    show_big.after(button);
                    button.hide().show(50);
                }
                update($(show_big));
                // Observe it and update it again when it changes.
                var observer_for_show_big = new MutationObserver(function(mutations) {
                    update($(show_big));
                });
                observer_for_show_big.observe(show_big, {attributes:true, 
                                                         attributeFilter: ['action-data']});
            });
        });
        observer_for_expand.observe(expand, {childList: true});
    });
}

// Create a button which opens `hrefs` in backgroud tabs when clicked.
function create_button(text, hrefs) {
    var a = $('<a class="S_txt1 adelabs"><em class="W_new_count">' + text + '</em></a>');
    return a.click(function(e){
        for (var i=0; i<hrefs.length; ++i) {
            GM_openInTab(hrefs[i], true);
        }
    });
}
function get_href_from_show_big(show_big) {
    var action_data = $(show_big).attr('action-data');
    var pid = action_data.replace(/.*\bpid=(\w+).*/, '$1');
    var href = '//ww3.sinaimg.cn/large/' + pid;
    return href;
}
function get_href_from_bigcursor(bigcursor) {
    var src = bigcursor.attr('src');
    var basename = src.replace(/.*\//, '');
    var href = '//ww3.sinaimg.cn/large/' + basename;
    return href;
}
