$(function(){
	"use strict";

	var wrapper = document.getElementsByClassName('carousel-wrapper')[0], carousel, contentData;

	carousel = new Carousel(wrapper, contentData);

	carousel.init();

});