/**
 * Created by ViS on 23.10.2014.
 */
$(function(){
    var popup = document.createElement('div');

    readFile('search.php', function(result){
        popup.innerHTML = result;
        document.body.appendChild(popup)
    });


    $('.about').bind('click', function(){
        window.location.href = "credits.php"
    });

    $('.closeButA').bind('click', function(){
        window.location.href = "index.php";
    });
    
    $('.logo').bind('click', function(){
        window.location.href = "index.php";
    });
    
    $('.closeP').bind('click', function(){
        window.location.href = "index.php";
    });

    $('.closeN').bind('click', function(){
        window.location.href = "index.php";
    });

    $('.author-photo').bind('click', function(){
        window.location.href = "article.php?id=" + parseInt(this.getAttribute('data-id'));
    });

    $('.search-control').bind('click', function(){

        popup.classList.add('active');
    });

    popup.id = 'popup';

    $('.closePopupBut').bind('click', function(){
        popup.classList.remove('active')
    });
});