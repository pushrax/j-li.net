$(document).ready(function() {

  // Eww, mega gross.. TODO: handlebars this and make it not have to load a file when ajaxing to the page

  SC.get('/users/1170895/tracks', function(tracks) {
    for (var i = 0; i < tracks.length; ++i) {
      var a = '<div class="track">';
      a += '<div class="left">';
      a += '<a href=\'' + tracks[i].permalink_url + '\' class="link">';
      if (tracks[i].artwork_url)
        a += '<img src="' + tracks[i].artwork_url + '">';
      else a += '<img src="https://a2.sndcdn.com/assets/images/default/cloudx120-1ec56ce9.png" class="image-placeholder">';
      a += '</a>';
      a += '<a href=\'' + tracks[i].permalink_url + '\' class="stratus">' + tracks[i].title + '</a>';
      a += '</div>';
      a += '<div class="right">';
      a += '<div class="genre">' + tracks[i].genre + '</div>';
      //a += '<a href=\'' + tracks[i].permalink_url + '\' class="link"><i class="icon-external-link"></i></a>';
      a += '</div>';
      a += '</div>';
      $('.tracks').append(a);
      $('.track').last().animate({ opacity: 1 }, 200);
    }
    updateClickHandlers(false);
  });
});