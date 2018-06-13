(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });
})(jQuery); // End of use strict

/*
 * Video carousel - Dynamically load in YouTube videos based on 'data-id'
 */
    //Load the YouTube Iframe API
    var tag = document.createElement('script');

    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    //This will be the object name for interacting with the videos in the rest of this code
    var videoArray = new Array();
    var player;

    $('#flow img').add('#flow i').click(function() {
        $(this).parent().find('.embed-responsive').removeClass('hide');

        dataset = $(this).parent().find('.embed-responsive .youtube-video')[0].dataset.id;
        
        //This will be the variable name for inserting videos into the HTML divs
        var divID = 'vid-' + $(this)[0].dataset.id.toString();

        $(this).parent().find('img').remove();
        $(this).parent().find('i').remove();
        
        //Setup video object, configure how videos should be presented
        player = new YT.Player(divID, {
            height: '100%',
            width: '100%',
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'loop': 1,
                'iv_load_policy': 3
            },
            videoId: dataset, //Uses current looped ID from array
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });


/*
    //Function: onYouTubePlayerAPIReady - Run when API is ready
    function onYouTubePlayerAPIReady() {
        
        //Look for video 'data-id' in the '.youtube-video' div
        var videos = document.querySelectorAll('#video-carousel .youtube-video');
        
        
        //Loop through each div found
        for (var i = 0; i < videos.length; i++) {

            //Create an array to hold the video IDs from 'data-id'
            dataset = videos[i].dataset.id;
            
            //This will be the variable name for inserting videos into the HTML divs
            var divID = 'vid-' + i.toString();
            
            //Setup video object, configure how videos should be presented
            videoArray[i] = new YT.Player(divID, {
                height: '100%',
                width: '100%',
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                    'modestbranding': 1,
                    'rel': 0,
                    'showinfo': 0,
                    'loop': 1,
                    'iv_load_policy': 3
                },
                videoId: dataset, //Uses current looped ID from array
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            
        }
    }
*/


    //Function: onPlayerReady - Run when video player is ready
    function onPlayerReady(event) {

        //When the Bootstrap Carousel moves
        $('#video-carousel').on('slide.bs.carousel', function () {

            //Find each Iframe within '#video-carousel'
            $(this).find('iframe').each(function(){
                
                //Pause all YouTube videos
                event.target.pauseVideo();
                
            });

            
            //Show custom video button
            $('.play-button-wrapper .btn-video').show();

        });


    }



    //Function: onPlayerStateChange - Run when a videos state has changed
    function onPlayerStateChange(event) {

        //Find all custom video buttons within '#video-carousel'
        $("#video-carousel").find('.play-button-wrapper .btn-video').each(function(){

            //If video has Ended
            if (event.data == YT.PlayerState.ENDED) {
                $(this).fadeIn("Slow");//Fade out
                $(this).find('i').attr("class", "fa fa-play");
            }

            //If video is Playing
            if (event.data == YT.PlayerState.PLAYING) {
                $(this).find('i').attr("class", "fa fa-pause");//Change icon
                $(this).fadeOut("Slow");//Fade out
            }

            //If video is Paused
            if (event.data == YT.PlayerState.PAUSED) {
                $(this).fadeIn("Slow");//Fade out
                $(this).find('i').attr("class", "fa fa-play");
            }

            //If video is Buffering
            if (event.data == YT.PlayerState.BUFFERING) {
                $(this).find('i').attr("class", "fa fa-circle-o-notch fa-spin fa-fw");
            }

        });
    }

    //Bind Click and Touchstart events to the custom video button
    $( ".play-button-wrapper" ).bind("click touchstart", function() {

        //Find the active carousel slide and target the Iframe within it
        $("#video-carousel").find('.active iframe').each(function(){
            //If the active slide's video is Playing
            if (player.getPlayerState() == 1) {
                player.pauseVideo();     //Pause video on click

            //If the active slide's video is Paused
            } else if (player.getPlayerState() == 2) {
                player.playVideo();      //Play video on click

            //If the video is doing anything else
            } else {
                player.playVideo();      //Play video on click
            }

        });
    });
/*
    //Bind Click and Touchstart events to the custom video button
    $( ".play-button-wrapper" ).bind("click touchstart", function() {

        //Find the active carousel slide and target the Iframe within it
        $("#video-carousel").find('.active iframe').each(function(){
            
            //Find the integer from the div ID and split - Use objectID[1] to output the integer
            var objectID = $(this).attr('id').split('-');

            
            //If the active slide's video is Playing
            if (videoArray[ objectID[1] ].getPlayerState() == 1) {
                videoArray[ objectID[1] ].pauseVideo();     //Pause video on click

            //If the active slide's video is Paused
            } else if (videoArray[ objectID[1] ].getPlayerState() == 2) {
                videoArray[ objectID[1] ].playVideo();      //Play video on click

            //If the video is doing anything else
            } else {
                videoArray[ objectID[1] ].playVideo();      //Play video on click
            }

        });
    });
*/
