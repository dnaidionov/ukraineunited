$(function(){
	var wrapper = document.getElementsByClassName('carousel-wrapper')[0],
		carousel,  header = $('#header'),
		getCities = function(data){
		var cities = [], citiesWrap, publicCities = [], interviewCities = [];
		citiesWrap = document.createElement('div');
		citiesWrap.className = 'cities-wrapper';
        citiesWrap.classList.add('hided');

		
		
		data.news.forEach(function(el, index){
			if(cities.indexOf(el.city) == -1){
				cities.push(el.city);
				publicCities.push(el.city);
			}
		});
		data.interview.forEach(function(el, index){
			if(cities.indexOf(el.author.city) == -1){
				cities.push(el.author.city);
				interviewCities.push(el.author.city);
			}
		});

        var fakePostsElem = document.getElementsByClassName('carousel-element');
        var fakeImagesElem = document.getElementsByClassName('author-photo');

		for(var i = 0; i < cities.length; i++){
			(function(i){
				var city = document.createElement('div'),
					p = document.createElement('p');
				city.className = 'city';
				p.innerHTML = cities[i];
				city.appendChild(p);
				p.addEventListener('mouseover', function(){
					city.classList.add('city-hover');
					contentData.news.forEach(function(el, index){
						if((el.city).toUpperCase() === city.textContent.replace(/[\r\n]/g, '').toUpperCase()){
							fakePostsElem[index].classList.add('selected')
						}
					});
					contentData.interview.forEach(function(el, index){
						if((el.author.city).toUpperCase() === city.textContent.replace(/[\r\n]/g, '').toUpperCase()){
							fakeImagesElem[index].classList.add('selected')
						}
					});
				});
				p.addEventListener('mouseout', function(){
					city.classList.remove('city-hover');
					contentData.news.forEach(function(el, index){
						if((el.city).toUpperCase() === city.textContent.replace(/[\r\n]/g, '').toUpperCase()){
							fakePostsElem[index].classList.remove('selected')
						}
					});
					contentData.interview.forEach(function(el, index){
						if((el.author.city).toUpperCase() === city.textContent.replace(/[\r\n]/g, '').toUpperCase()){
							fakeImagesElem[index].classList.remove('selected')
						}
					});
				});
				citiesWrap.appendChild(city);
			})(i)
		}
		return citiesWrap;
	};

	


    header.append(getCities(contentData));

	$('.scale-control').bind('click', function(){
		carousel.scale()
	});


		//contentData.interview.forEach(function(interview, index){
		//	fakeImagesElem[index].addEventListener('mouseover', function(){
		//		fakeImagesElem[index].classList.add('active');
		//		name.innerHTML = '<p class="author-name">'+ interview.author.name +'</p><p class="author-city">м. '+ interview.author.city +', </p><p class="author-profession">'+ interview.author.profession +'</p></div>'
		//		contentData.news.forEach(function(news, i){
		//			if(contentData.news[i].author == interview.author.name){
		//				fakePostsElem[i].classList.add('active')
		//			}
		//		});
		//		citiesElem.forEach(function(el, i){
		//			if(el.innerText.replace(/[\r\n]/g, '').toUpperCase() == (interview.author.city).toUpperCase()){
		//				el.classList.add('active')
		//			}
		//		});
		//	});
		//	fakeImagesElem[index].addEventListener('mouseout', function(){
		//		fakeImagesElem[index].classList.remove('active');
		//		name.innerHTML = '';
		//		contentData.news.forEach(function(news, i){
		//			if(contentData.news[i].author == interview.author.name){
		//				fakePostsElem[i].classList.remove('active')
		//			}
		//		});
		//		citiesElem.forEach(function(el, i){
		//			if(el.innerText.replace(/[\r\n]/g, '').toUpperCase() == (interview.author.city).toUpperCase()){
		//				el.classList.remove('active')
		//			}
		//		})
		//	})
		//});

	//	fakeMonthsElem.forEach(function(month, monthsIndex){
	//		month.addEventListener('mouseover', function(){
	//			fakeDaysElem.forEach(function(el, daysIndex){
	//				if(monthsIndex == daysIndex){
	//					el.classList.add('active')
	//				}
	//			});
	//			fakeInterviewElem.forEach(function(el, daysIndex){
	//				if(monthsIndex == daysIndex){
	//					el.classList.add('active')
	//				}
	//			});
	//			contentData.interview.forEach(function(el, imgIndex){
	//				if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
	//					fakeImagesElem[imgIndex].classList.add('active')
	//				}
	//			});
	//			contentData.news.forEach(function(el, imgIndex){
	//				if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
	//					fakePostsElem[imgIndex].classList.add('active')
	//				}
	//			})
	//		});
	//		month.addEventListener('mouseout', function(){
	//			fakeDaysElem.forEach(function(el, daysIndex){
	//				if(monthsIndex == daysIndex){
	//					el.classList.remove('active')
	//				}
	//			});
	//			fakeInterviewElem.forEach(function(el, daysIndex){
	//				if(monthsIndex == daysIndex){
	//					el.classList.remove('active')
	//				}
	//			});
	//			contentData.interview.forEach(function(el, imgIndex){
	//				if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
	//					fakeImagesElem[imgIndex].classList.remove('active')
	//				}
	//			});
	//			contentData.news.forEach(function(el, imgIndex){
	//				if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
	//					fakePostsElem[imgIndex].classList.remove('active')
	//				}
	//			})
	//		})
	//	});
	//});

	$('#header .close').bind('click', function(){
        //document.body.classList.remove('scaled');
        //document.body.classList.add('not-scaled');
        //document.getElementsByClassName('cities-wrapper')[0].classList.add('hided');

		carousel.scale();
	});

	carousel = new Carousel(wrapper, contentData, new Date());

	carousel.init();

	window.carousel = carousel;


});