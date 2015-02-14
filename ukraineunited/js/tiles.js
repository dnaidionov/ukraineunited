/**
 * Created by ViS on 10.10.2014.
 */
$(function() {
    var photosCount = 9;

    var rand_numbers = [];

    for(var i=0; i < 100; i++){
        var numb = Math.ceil(Math.random()*photosCount);
        $(".photos").append('<img src="img/photos/'+numb+'.jpg" />');
    }

    $(window).bind('mousewheel DOMMouseScroll', function(event){
        if (event.originalEvent.wheelDelta < 0 || event.originalEvent.detail > 0) {
            $("#page").slideUp(300, function(){
                window.location.href = "index.php"
            });
            $(".scroll").slideUp(300);

        }

    });
});