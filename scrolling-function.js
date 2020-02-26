

$.fn.extend({
  move: function(y, w) {
      var h = $(this).height();
      if (y < h - w && y >= -w) {
          y = y + w;
          $('html, body').animate({ scrollTop: y }, 1200);
      }
      return y
  },
  slide: function() { // photoset slideshows
      $(this).find('.photo:first-child').addClass('active');
      $(this).find('.photo').click(function(){
          $(this).removeClass('active');
          var $next = $(this).next('.photo');
          if ($next.length != 0) {
              $(this).next('.photo').addClass('active');
          }
          else {
              $(this).parent('.post').find('.photo:first-child').addClass('active');
          }
          return false
      });
  },
  plyrs: function(hex) { // audio players
      $(this).find('.soundcloud_audio_player').each(function(){
          $(this).attr({ src: $(this).attr('src').split('&')[0] + '&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=false&amp;origin=tumblr&amp;color=' + hex.split('#')[1], height: 20, width: '100%' });
      });
      $(this).find('.tumblr_audio_player').each(function(){
          $(this).attr({ src: $(this).attr('src').split('&color=')[0] + '&color=transparent&simple=1 '});
      });
  }
});
$(document).ready(function(){
  var color = '#ededed',
      $document = $(document),
      $content = $('.content');
  $content.slide();
  $content.plyrs(color);
  $('.photo-slideshow').pxuPhotoset({
      lightbox: true,
      rounded: false,
      gutter: '6px',
      photoset: '.photo-slideshow',
      photoWrap: '.photo-data',
      photo: '.pxu-photo'
  });
  $('.b a').click(function(){
      $(this).parents('.entry').find('.info').fadeToggle(300).css({ zIndex: 3 });
      $('#notes').delay(300).fadeOut(300);
      return false
  });
  $('.no').click(function(){
      $('#notes').fadeToggle(300);
      $('.info').delay(300).fadeOut(300).css({ zIndex: 0 });
      return false
  });
  // infinite scroll
  var $container = $('.content');
  $container.infinitescroll({
      itemSelector: '.entry',
      navSelector: '.pagination',
      nextSelector: '.next',
      loadingImg: '',
      loadingText: '<em></em>',
      bufferPx: 2000
  },
  function( newElements ) {
      var $newElems = $( newElements );
      $newElems.slide();
      $newElems.plyrs(color);
      $newElems.find('.button').click(function(){
          $(this).parents('.entry').find('.info').fadeToggle(300);
          return false
      });
      // pxu photosets
      $newElems.find('.photo-slideshow').pxuPhotoset({
          lightbox: true,
          rounded: false,
          gutter: '6px',
          photoset: '.photo-slideshow',
          photoWrap: '.photo-data',
          photo: '.pxu-photo'
      });
      // videos
      resizeVideos();
  });
});
