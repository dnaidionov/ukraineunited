/**
 * Created by ViS on 13.10.2014.
 */
$(function() {
    var previousScroll = 0;

    var scrollH = $('body').prop('scrollHeight');
    //console.log(scrollH);

    function setActive(element){
        element.parentNode.children.forEach(function(el){
            el.classList.remove('active')
        });
        element.classList.add('active');
    }

    function ScrollerItem( prStart, prStop, url){
        this.prStart = prStart;
        this.prStop = prStop;
        this.url = url;
    };

    function Scroller() {
        this.active;
        this.items = [];
    }

    Scroller.prototype.addItem = function(item){
        this.items.push(item);
    };

    Scroller.prototype.setActive = function(active){
        this.active = active;
        if(this.active !== -1){
            setActive(document.getElementById('photos').children[this.active])
        }

    };

    /*Scroller.prototype.changeImg = function(item){

        var photo = $("#photo");
        var items = this.items;

        photo.data('items', items).data('item', item).stop(true).fadeOut(300, function(){
            $(this).css('background-image', $(this).data('items')[$(this).data('item')]["url"])
        }).fadeIn(300);


    };*/

     Scroller.prototype.getItemByOffset = function(val){
       var b  =  $(document).height() - $(window).height();
       var c  =  val / b  ;
       var pr = val*100/b;
        //console.log("pr:",pr);
        for(var i=0; i < this.items.length;i++){
            if(pr >= this.items[i]['prStart'] && pr <= this.items[i]['prStop']){
                return i;
            }
        }
         return -1;

     }

    Scroller.prototype.update = function(iCurScrollPos){
        var currentItem = this.getItemByOffset(iCurScrollPos);
        if(this.active !== currentItem){
            if(currentItem !== -1){
                this.setActive(currentItem);
                //this.changeImg(currentItem );

            }

        }
        //console.log(this.active);
    };



    var scrl = new Scroller();
    // Сюда заполнять изображения (от в %, до в %, 'url("ссылка на изображение")')ж
    /*scrl.addItem(new ScrollerItem(0, 25, 'url("img/big_photo.jpg")'));
    scrl.addItem(new ScrollerItem(26, 50, 'url("http://javascript.ru/forum/images/ca_serenity/misc/logo.gif")'));
    scrl.addItem(new ScrollerItem(51, 70, 'url("img/team1.jpg")'));
    scrl.addItem(new ScrollerItem(71, 98, 'url("img/team2.jpg")'));
    scrl.addItem(new ScrollerItem(99, 100, 'url("img/team1.jpg")'));*/

    $( document ).ready(function() {

        /*$('#photos').each(function(i){
         var lolo = $(this).children()[i].style.backgroundImage;
         scrl.addItem(new ScrollerItem(26, 10, this.style.backgroundImage));
         });*/
        document.getElementById('photos').children.forEach(function (el) {
            scrl.addItem(new ScrollerItem(parseInt(el.getAttribute('data-from')), parseInt(el.getAttribute('data-to')), el.style.backgroundImage));

        });

    });

    /*width: 955px;
    z-index: 1;*/
    var photos = document.getElementById('photos');
    photos.addEventListener('mouseenter', function() {

        var height = document.getElementById('photos').offsetHeight;
        //$('photos').animate('width', 200, true);
        if(document.body.offsetWidth >= 975){
            photos.style.zIndex = 100;
            //photos.style.width =  height + 'px'; 
            
            
            //photos.style.boxShadow = "0px 30px 40px";

            photos.children.forEach(function (el) {
                el.style.width = height + 'px';
                //el.style.boxShadow = "0px 30px 40px";
            });
        }

    });

    photos.addEventListener('mouseleave', function() {
        //$('photos').animate('width', 200, true);
        photos.style.width =  '';
        photos.style.boxShadow = '';
        photos.children.forEach(function (el) {
            el.style.width = '';
        });

    });
    //parseInt(el.getAttribute('data-index'))


    scrl.setActive(-1);
    scrl.update($(window).scroll().scrollTop());


    var iScrollPos = 0;
    var header = $("#header");

    $(window).scroll(function () {

        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > iScrollPos) {
            //if (!header.data('faded')) header.data('faded', 1).stop(true).fadeTo(300, 0);
            //if (!header.data('faded'))
            document.getElementById('header').classList.add('active');
        } else {
            //Scrolling Up
            document.getElementById('header').classList.remove('active');
            //if (header.data('faded')) {
              //  header.data('faded', 0).stop(true).fadeTo(300, 1);
            //}
        }

        scrl.update(iCurScrollPos);
        iScrollPos = iCurScrollPos;

    });

});