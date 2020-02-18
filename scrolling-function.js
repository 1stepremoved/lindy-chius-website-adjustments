function() {
    var t = true,
        y = $(this).scrollTop(),
        w = $(window).height();
    $(window).resize(function(){
        w = $(window).height();
    });

    const slideAndWaitWrapper = (slideFunction) => () => {
        if (t) {
            slideFunction();
            t = false;
            setTimeout(function(){ t = true }, 1200);
        }
    };

    const slideDown = () => {
        y = $(this).move(y, w);
    };

    const slideUp = () => {
        y = $(this).move(y, -w);
    };

    const slideDownAndWait = slideAndWaitWrapper(slideDown);
    const slideUpAndWait = slideAndWaitWrapper(slideUp);

    $(this).bind('mousewheel', function(event){
        var delta = event.deltaY;
        if (delta < 0)
            slideDownAndWait();
        else if (delta > 0)
            slideUpAndWait();
    });

    var ts;
    $(this).bind('touchstart', function (e){
        ts = e.originalEvent.touches[0].clientY;
    });

    $(this).bind('touchend', function (e){
        var te = e.originalEvent.changedTouches[0].clientY;
        if(ts > te+5){
            slideDownAndWait();
        }else if(ts < te-5){
            slideUpAndWait();
        }
    });

    $(this).on('keydown', function(event){
        var k = event.which;
        if (k == 32 || k == 74 || k == 40)
            slideDownAndWait();
        else if (k == 75 || k == 38)
            slideUpAndWait();
    });
}
