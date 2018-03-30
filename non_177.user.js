// ==UserScript==
// @name            non-177
// @namespace       https://github.com/adelabs
// @description     hide all messages containing "177" in wx.qq.com 
// @version         0.1
// @downloadURL     https://github.com/adelabs/user.js/raw/master/non_177.user.js
// @include         https://wx.qq.com/
// @require         http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant           none
// @run-at          document-end
// ==/UserScript==

function initialize() {
  console.log('initialize', location.href);
  var observer = new MutationObserver(function(mutations) {
    console.log('mutation', mutations);
    filter('177');
  });
  var messageBox = getMessageBox();
  console.log('observe', messageBox);
  observer.observe(messageBox, {childList: true});
}

//  .main
//    .main_inner
//      .panel
//      .ng-scope
//        #chatArea .chatRoom
//          .chat_bd
//            .ng-scope .adelabs
//              .ng-scope

function getMessageBox() {
  var messageBoxSelector = $('.chat_bd .ng-scope');
  if (messageBoxSelector.length == 0) { return null; }
  var messageBox = messageBoxSelector[0];
  $(messageBox).addClass('adelabs');
  return messageBox;
}

function filter(key) {
  $(".adelabs .ng-scope:visible:contains("+key+")").each(function(i,o){
    console.log('filter', key, o);
    $(o).attr('hidden', 'true');
  });
}

initialize();
