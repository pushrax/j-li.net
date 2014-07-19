function openPage(path, updateHistory, callback) {
  if (updateHistory) {
    if (path == document.location.pathname) return callback ? callback(false) : undefined;
    window.history.pushState('j-li.net-hist|' + path, 'Title', path);
  }

  $('#content-wrapper').animate({ opacity: 0 }, 100, function() {
    $.getJSON(path + "?ajax", function(data) {
      if (_gaq) {
        _gaq.push(['_trackPageview', path]);
      }
      $('header').removeClass('hidden');
      $('body').removeClass().addClass(data.view);
      $('#content-wrapper').html(data.html).animate({ opacity: 1 }, 100);
      updateClickHandlers(false);
      if (updateHistory) window.scrollTo(0, 1);
      if (data.title !== '') document.title = data.title + ' » Justin Li';
      else document.title = 'Justin Li';

      if (callback) callback(true);
    });
  });
}

var stratus = false;

function startStratus(href) {
  if (stratus) return;
  $.stratus({
    color: 'd91e76',
    links: href,
    //animate: false,
    auto_play: true,
    volume: 100
    //theme: 'http://stratus.sc/themes/dark.css'
  });
  stratus = true;
}

function updateClickHandlers(globalAjax) {
  $(globalAjax ? 'a.ajax' : '#content a.ajax').click(function() {
    openPage($(this).attr("href"), true);
    $(this).blur();
    return false;
  });

  if (stratus) $.stratus.bindClickHandler();
  else $('a.stratus').click(function() {
    $('a.stratus').unbind('click');
    startStratus($(this).attr('href'));
    return false;
  });
}

var initialPopState = false;

window.onpopstate = function(event) {
  if (initialPopState) return initialPopState = false;
  if (event.state && event.state.substr(0, 14) == 'j-li.net-hist|') {
    openPage(event.state.substr(14), false);
  }
};

$(document).ready(function() {
  if (Modernizr.history) {
    initialPopState = true;
    window.history.replaceState('j-li.net-hist|', 'Title', window.location.pathname);
    updateClickHandlers(true);
  }

  $('#email-link').unbind('click').click(function() {
    openPage($(this).attr("href"), true, function(navigated) {
      function highlightContact() {
        var elem = $('#frontpage .contact').addClass('highlighted');
        setTimeout(function() { elem.removeClass('highlighted'); }, 300);
      }
      if (navigated) setTimeout(highlightContact, 300);
      else highlightContact();
    });
    $(this).blur();
    return false;
  });

  SC.initialize({
    client_id: "77272076b9c38d199fad773ce817a2fc"
  });

  AffixedScroller(document.getElementsByTagName('header')[0]);
});
