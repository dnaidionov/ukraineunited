$(function(){
	"use strict";

	var months;

	if (lang =='en') {
		months = {
			first: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			second: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		};
	}
	if (lang =='ru') {
		months = {
			first: [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
			second: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
		};
	}
	if (lang =='ua') {
		months = {
			first: [ 'Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'],
			second: [ 'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
		};
	}





    function setActiveMounth(element, index){
        var that = this;
        try{
            var activeIndex = 0;

            for(var i = 0, n = element.children.length; i < n;i++ ){
                if(element.children[i] !== 0 && element.children[i] !== (element.children.length-1)){
                    var el = element.children[i];
                        //prevEl = element.children[i-1],
                        //nextEl = element.children[i+1];
                    if(parseInt(el.getAttribute('data-month-index')) === index){
                        activeIndex = index;
                        el.classList.add('active');

                        var x = (index-1) * el.offsetWidth;
                        //if
                        var translateTo = '-webkit-transform: translate3d(-' + x + 'px,0,0);' +
                            '-moz-transform: translate3d(-' + x + 'px,0,0);' +
                            ' transform: translate3d(-' + x + 'px,0,0);';
                        element.style.cssText = translateTo;

                        var margin = (document.body.offsetWidth - el.offsetWidth*3)/2;
                        if(index-1 < 0) {
                            el.style.margin = "0 " + margin +'px' + " 0 " + (margin + el.offsetWidth) + "px";
                        } else {
                            el.style.margin = "0 " + margin +'px';
                        }


                        //el.classList.remove('hided');
                    } else {
                        //el.classList.add('hided');
                        el.classList.remove('active');

                        el.style.margin = '0';
                    }
                }
            }
            //element.children[activeIndex-1].classList.remove('hided');
            //element.children[(activeIndex+1) <= (months.first.length-1) ? (activeIndex+1) : activeIndex].classList.remove('hided');

            /*month.style.cssText += moveTo('center', month);
            month.nextSibling.style.cssText += moveTo('right', month.nextSibling);
            month.previousSibling.style.cssText += moveTo('left', month.previousSibling);
            setTimeout(function () {
                document.body.classList.remove('scaled');
                document.body.classList.add('not-scaled');
                $('.cities-wrapper').remove();
            }, 200);
            setTimeout(function () {
                $('.fake-carousel').hide(0);
                startPosition(month);
            }, 500);*/

        }
        catch(er){
            console.log(er);
        }
        //addMounthEvents(that.data);
    }

    function getMounthIndex(date){
        var dt = new Date(date);
        return dt.getMonth();
    }

	function setActive(element){
		try{
			element.parentNode.children.forEach(function(el){
				el.classList.remove('active');
			});
			element.classList.add('active');
		}
		catch(er){
			console.log(er);
		}
	}

	function createScroller(el){
		var scroller = document.createElement('div');
		scroller.className = 'content-scroller';
		el.appendChild(scroller);
		return scroller;
	}

	function getDay(date){
		return parseInt(date.split('.')[0]);
	}

	function createNews(wrapper, data, date){
		var ind = 1;
		var createPost = function(newsData, index){
				var element = document.createElement('div'),
					postDate = document.createElement('span'),
					post = document.createElement('p');

                postDate.className = 'carousel-post-date';
                postDate.textContent = getDate(newsData.eventDate);
                element.appendChild(postDate);

				element.className = 'carousel-element';
				if(parseInt(newsData.eventDate.split('.')[1]) !== date.getMonth() + 1){
					element.classList.add('hided');
                    element.setAttribute('data-global-index', index + 1);
				}else{
					element.setAttribute('data-index', ind);
					ind = ind + 1;
				}



				post.className = 'carousel-post';
				post.textContent = newsData.text;
				element.appendChild(post);
				return element;
			},
			getDate = function(date){
				var postDate = date.split('.');

				if (lang == 'en') {
					return months.first[parseInt(postDate[1]) - 1] + ', ' + parseInt(postDate[0]);
				}
				return parseInt(postDate[0]) + ' ' + months.first[parseInt(postDate[1]) - 1] + ', ' + postDate[2];
			};
		data.forEach(function(el, index){
			wrapper.appendChild(createPost(el, index));
		});
	}


	function createTimeline(wrapper, date, data, scaled, scope){
        /*var fakeDaysWrapper, fakeMonthWrapper, fakeInterviewsWrapper,
            createFakeDays = function(index){
                var daysWrap = document.createElement('div');
                daysWrap.className = 'fake-days';
                daysWrap.style.width = document.body.offsetWidth / months.second.length + 'px';
                daysWrap.setAttribute('data-day-wrapper-index', index);
                for(var i = 0; i < 10; i++){
                    var day = document.createElement('div');
                    day.className = 'fake-day';
                    day.style.width = (daysWrap / 10).toFixed(2) + 'px';
                    day.setAttribute('data-day-index', i);
                    daysWrap.appendChild(day)
                }
                return daysWrap;
            };

        fakeDaysWrapper = document.createElement('div');
        fakeMonthWrapper = document.createElement('div');
        fakeInterviewsWrapper = document.createElement('div');*/
        var that = scope;


		var createDays = function(date, isInterviewDay, days, data){
                var fakeDaysWrapper,
                    createFakeDays = function(index){
                        var daysFakeWrap = document.createElement('div');
                        daysFakeWrap.className = 'fake-days';
                        daysFakeWrap.style.width = document.body.offsetWidth / months.second.length + 'px';
                        daysFakeWrap.setAttribute('data-day-wrapper-index', index);
                        for(var i = 0; i < 10; i++){
                            var day = document.createElement('div');
                            day.className = 'fake-day';
                            day.style.width = (daysWrap / 10).toFixed(2) + 'px';
                            day.setAttribute('data-day-index', i);
                            daysFakeWrap.appendChild(day)
                        }
                        return daysFakeWrap;
                    };

                fakeDaysWrapper = document.createElement('div');
                fakeDaysWrapper.className = 'fake-days-wrapper';

                !scaled ? fakeDaysWrapper.classList.add('hided') : fakeDaysWrapper.classList.remove('hided');

                for(var i = 0; i < months.second.length; i++){
                    (function(i){
                        fakeDaysWrapper.appendChild(createFakeDays(i));
                    })(i);
                }

				var daysCount = new Date(date.getYear(), date.getMonth() + 1, 0).getDate(),
					day, daysType = 'day', daysWrap, scroller;
				if(isInterviewDay){
					daysType = 'interview-day';
				}

				daysWrap = document.createElement('div');
				daysWrap.className = 'timeline-' + daysType + '-wrapper';
				scroller = createScroller(daysWrap);

				for(var i = 1; i <= daysCount; i++){
					day = document.createElement('div');
					day.style.width = (document.body.offsetWidth / daysCount) + 'px';
					day.className = 'timeline-day';
					day.setAttribute('data-index', i);
					if(days){
						days.forEach(function(el, index){
							if(i === el){
								day.classList.add('interview-day');
							}
						});
					}
					scroller.appendChild(day);
				}
                daysWrap.appendChild(fakeDaysWrapper);

				return daysWrap;
			},
			createIntenviewDays = function(date, eventDate){
				return createDays(date, true, eventDate, data);
			},
			dates = {
				publishDate: [],
				interviewDate: []
			};

		Object.keys(data).forEach(function(type, typeIndex){
			data[type].forEach(function(el){
				dates[Object.keys(dates)[typeIndex]].push(parseInt(el.eventDate.split('.')[0]))
			});
		});

        //var mounth = createMonth();
        if(wrapper.children.length > 0){
		    wrapper.insertBefore(createDays(date, false, dates.publishDate, data, scaled), wrapper.firstChild);
		    wrapper.appendChild(createIntenviewDays(date, dates.interviewDate, data, scaled));
        } else {
           wrapper.appendChild(createDays(date, false, dates.publishDate, data, scaled));
           wrapper.appendChild(createIntenviewDays(date, dates.interviewDate, data, scaled));
        }

    }

    function createMonth(wrapper, date, data, scaled, scope){
        var createM = function(){
            var monthWrap = document.createElement('div');
            var monthScroll = document.createElement('div');

            monthWrap.className = 'timeline-months-wrapper';
            monthScroll.className = 'months-scroll';


            for(var i = 0; i < months.second.length; i++) {
                var month = document.createElement('div'),
                    mName = document.createElement('p');

                month.className = 'timeline-month';
                month.setAttribute('data-month-index', i);

                //month.style.width = document.body.offsetWidth / months.second.length + 'px';

                mName.textContent = months.second[i];
                month.appendChild(mName);
                monthWrap.appendChild(month);
            }

            monthScroll.appendChild(monthWrap);

            return monthScroll;
        }

        var mounth = createM();
        wrapper.insertBefore(mounth, wrapper.children[1]);
        setActiveMounth(mounth.children[0], getMounthIndex(date));
    }


	function createAuthorsName(wrapper){
		var createName = function(){
			var name = document.createElement('p'),
				nameWrap = document.createElement('div'),
				author = document.createElement('div'),
				city = document.createElement('p'),
				profession = document.createElement('p');

			nameWrap.className = 'author-info';
			author.className = 'author';
			name.className = 'author-name';
			author.appendChild(name);

			city.className = 'author-city';
			author.appendChild(city);

			profession.className = 'author-profession';
			author.appendChild(profession);

			nameWrap.appendChild(author);

			return nameWrap;
		};
		wrapper.appendChild(createName());
	}

	function createAuthorsPhoto(wrapper, data, date){
		var createPhoto = function(data, index){
			var photo = document.createElement('img'),
				photoMask = document.createElement('div'),
				photoWrap = document.createElement('div');

			photoWrap.className = 'author-photo';

			if(parseInt(data.eventDate.split('.')[1]) !== date.getMonth() + 1){
				photoWrap.classList.add('hided');
			}

			photoMask.className = 'photo-mask';
			photoWrap.setAttribute('data-index', index + 1);
			photoWrap.setAttribute('data-filename', data.filename);
			photoWrap.setAttribute('data-id', data.id);
			photo.setAttribute('src', 'img/photos/' + data.author.photo);
			/*if(isFake){
			 var filter = document.createElement('div');
			 filter.className = 'gray-filter';
			 photoWrap.appendChild(filter)
			 }*/
			photoWrap.appendChild(photo);
			photoWrap.appendChild(photoMask);

			return photoWrap;
		};
		data.forEach(function(el, index){
			if(parseInt(el.eventDate.split('.')[1]) === date.getMonth() + 1){
				wrapper.appendChild(createPhoto(el, index));
			}else{
				wrapper.appendChild(createPhoto(el, index));
			}
		});
	}



	function Carousel(element, data, date){
		var that = this;
		//this.isScale = false;
		this.wrapper = element;
		this.scaled = false;
		this.data = data;
		this.date = date;
		this.currentMonthData = {};
		this.allData = {};
        this.activeNewsIndex = 0;
        this.activeGlobalNewsIndex = 0;

		this.carouselStructure = {
			newsWrapper: {
				clName: 'carousel-news-wrapper'
			},
			timelineWrapper: {
				clName: 'carousel-timeline'
			},
			authorsWrapper: {
				clName: 'carousel-authors-wrapper'
			}
		};

        this.ScrollListener = function(ev){
            var ind = parseInt(ev.target.getAttribute('data-index')? ev.target.getAttribute('data-index') : ev.target.parentNode.getAttribute('data-index'));

            if(that.isScale) that.scale();
            that.scrollTo(ind);
        }

        this.ScrollGlobalListener = function(ev){
            if(!ev.target.classList.contains('hided') && !ev.target.parentNode.classList.contains('hided')){
                var ind = parseInt(ev.target.getAttribute('data-global-index')? ev.target.getAttribute('data-global-index') : ev.target.parentNode.getAttribute('data-global-index'));
                //getMounthIndex(that.allData["news"][ind].eventDate);
                //this.refresh(new Date(that.allData["news"][ind-1].eventDate));
                //that.scrollTo(ind);
                //that.scale();
                var mInd = parseInt(that.allData["news"][ind-1].eventDate.split('.')[1]);
                var currDate = new Date();
                    //transformMonth = (mInd  < 9) ? '0' + (mInd  + 1) : (mInd  + 1),
                    //refreshDate = currDate.getFullYear().toString() + '-' + transformMonth + '-01';

                //var date = new Date(mounth[el.getAttribute('data-month-index')]);



                that.refresh(new Date(currDate.getFullYear(), mInd - 1, 1), ind);
            }
        }

		this.init = function(){


			var that = this;
            this.scrollDelta = 0;

			this.currentMonthData = {};
			Object.keys(this.data).forEach(function(type, typeIndex){

				that.currentMonthData[type] = [];
				that.allData[type] = [];
				that.data[type].forEach(function(el, index){
					if(parseInt(el.eventDate.split('.')[1]) === that.date.getMonth() + 1){
						that.currentMonthData[type].push(el);
					}
					that.allData[type].push(el);

				});


			});

			Object.keys(this.carouselStructure).forEach(function(el, index){
				that.carouselStructure[el].element = document.createElement('div');
				that.carouselStructure[el].element.className = that.carouselStructure[el].clName;
				that.wrapper.appendChild(that.carouselStructure[el].element)
			});
			this.carouselStructure.newsWrapper.scroller = createScroller(this.carouselStructure.newsWrapper.element);
			this.carouselStructure.authorsWrapper.scroller = createScroller(this.carouselStructure.authorsWrapper.element);

			createNews(this.carouselStructure.newsWrapper.scroller, this.allData.news, this.date);
			//createFakeTimeline(this.carouselStructure.timelineWrapper.element);
            createTimeline(this.carouselStructure.timelineWrapper.element, this.date, this.currentMonthData, this.scaled, this);
            createMonth(this.carouselStructure.timelineWrapper.element, this.date, this.currentMonthData, this.scaled, this);
			createAuthorsName(this.carouselStructure.authorsWrapper.element, this.allData.interview, this.date);
			createAuthorsPhoto(this.carouselStructure.authorsWrapper.scroller, this.allData.interview, this.date);



			this.carouselStructure.newsWrapper.scroller.children.forEach(function(el){

                    if(el.getAttribute('data-index')){
                        el.addEventListener('click', that.ScrollListener);
                    } else {
                        if(el.getAttribute('data-global-index')){
                            el.addEventListener('click', that.ScrollGlobalListener);
                        }
                    }

			});
			this.carouselStructure.timelineWrapper.element.children[0].children[0].children.forEach(function(el){
				el.addEventListener('click', function(){
					var days = [];
					that.currentMonthData.news.forEach(function(el){
						days.push(parseInt(el.eventDate.split('.')[0]))
					});
					var index = days.indexOf(parseInt(el.getAttribute('data-index')));
					if(index !== -1){
						that.scrollTo(index + 1);
					}
				})
			});


			this.scrollTo(1);
            addEvents(this.data);
            addMounthEvents(that.data);
		};

        function showAllMounth(){
            /*document.getElementsByClassName('timeline-months-wrapper')[0].children.forEach(function(el){
                el.classList.remove('hided');
                el.classList.remove('active');
            });*/
            var element = document.getElementsByClassName('timeline-months-wrapper')[0];
            element.style.cssText = "";
            element.children.forEach(function(el){
                el.classList.remove('active');
                el.style.cssText = "";
            });

        }

        function swapTimelines(isScale){
            if(isScale){
                var timelineDay = document.getElementsByClassName('timeline-day-wrapper')[0];
                timelineDay.children[0].classList.add('hided');
                timelineDay.children[1].classList.remove('hided');
                var timelineInterDay = document.getElementsByClassName('timeline-interview-day-wrapper')[0];
                timelineInterDay.children[0].classList.add('hided');
                timelineInterDay.children[1].classList.remove('hided');
            } else {
                var timelineDay = document.getElementsByClassName('timeline-day-wrapper')[0];
                timelineDay.children[1].classList.add('hided');
                timelineDay.children[0].classList.remove('hided');
                var timelineInterDay = document.getElementsByClassName('timeline-interview-day-wrapper')[0];
                timelineInterDay.children[1].classList.add('hided');
                timelineInterDay.children[0].classList.remove('hided');
            }
        }

        function isEmptyMounth(monthsIndex){
            var isEmpty = true;

            data.news.forEach(function(el, ind){
                if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
                    isEmpty = false;
                }
            });
            return isEmpty;
        }

        function addMounthEvents(contentData) {
            var fakeImagesElem = document.getElementsByClassName('author-photo');
            var fakePostsElem = document.getElementsByClassName('carousel-element');

            document.getElementsByClassName('timeline-months-wrapper')[0].children.forEach(function(month, monthsIndex){
                if(!isEmptyMounth(monthsIndex)){
                    month.addEventListener('mouseover', function(){
                        /*fakeDaysElem.forEach(function(el, daysIndex){
                         if(monthsIndex == daysIndex){
                         el.classList.add('active')
                         }
                         });
                         fakeInterviewElem.forEach(function(el, daysIndex){
                         if(monthsIndex == daysIndex){
                         el.classList.add('active')
                         }
                         });*/
                        contentData.interview.forEach(function(el, imgIndex){
                            if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
                                fakeImagesElem[imgIndex].classList.add('selected');
                            }
                        });
                        contentData.news.forEach(function(el, imgIndex){
                            if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
                                fakePostsElem[imgIndex].classList.add('selected')
                            }
                        })
                    });
                    month.addEventListener('mouseout', function(){
                        /*fakeDaysElem.forEach(function(el, daysIndex){
                         if(monthsIndex == daysIndex){
                         el.classList.remove('active')
                         }
                         });
                         fakeInterviewElem.forEach(function(el, daysIndex){
                         if(monthsIndex == daysIndex){
                         el.classList.remove('active')
                         }
                         });*/
                        contentData.interview.forEach(function(el, imgIndex){
                            if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
                                fakeImagesElem[imgIndex].classList.remove('selected')
                            }
                        });
                        contentData.news.forEach(function(el, imgIndex){
                            if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
                                fakePostsElem[imgIndex].classList.remove('selected')
                            }
                        })
                    });
                    month.addEventListener('click', function(ev){
                        var ind = parseInt(ev.target.getAttribute('data-month-index')? ev.target.getAttribute('data-month-index') : ev.target.parentNode.getAttribute('data-month-index'));
                        var currDate = new Date(),
                            transformMonth = (ind  < 9) ? '0' + (ind  + 1) : (ind  + 1),
                            refreshDate = currDate.getFullYear().toString() + '-' + transformMonth + '-01';

                        //var date = new Date(mounth[el.getAttribute('data-month-index')]);

                        var fakeImagesElem = document.getElementsByClassName('author-photo');
                        var fakePostsElem = document.getElementsByClassName('carousel-element');

                        //that.refresh(new Date(currDate.getFullYear(), transformMonth - 1, 1), 1);

                        contentData.interview.forEach(function(el, imgIndex){
                            if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
                                fakeImagesElem[imgIndex].classList.remove('selected')
                            }
                        });
                        contentData.news.forEach(function(el, imgIndex){
                            if(parseInt(el.eventDate.split('.')[1]) == monthsIndex+1){
                                fakePostsElem[imgIndex].classList.remove('selected')
                            }
                        })
                        that.refresh(new Date(currDate.getFullYear(), transformMonth - 1, 1), 1);
                    })
                } else {
                    month.classList.add('empty');
                };
            });
        }

        function addEvents(contentData) {
            var fakeImagesElem = document.getElementsByClassName('author-photo');
            var fakePostsElem = document.getElementsByClassName('carousel-element');
            var citiesElem = document.getElementsByClassName('cities-wrapper')[0];

            /*var fakeDaysElem = document.getElementsByClassName('fake-days-wrapper')[0].children,
                fakeInterviewElem = document.getElementsByClassName('fake-days-wrapper')[1].children;*/

            document.getElementsByClassName('content-scroller')[0].addEventListener('wheel', function(ev){
                if(that.isScale){
                    var delta = ev.deltaY || ev.detail || ev.wheelDelta;
                    if(0 < delta){
                        that.activeGlobalNewsIndex = (that.activeGlobalNewsIndex > that.allData.news.length-1) ? that.activeGlobalNewsIndex : (that.activeGlobalNewsIndex + 1);
                        that.globalScrollTo(that.activeGlobalNewsIndex);
                    }
                    else {
                        that.activeGlobalNewsIndex = (that.activeGlobalNewsIndex - 1) < 1 ? that.activeGlobalNewsIndex : (that.activeGlobalNewsIndex - 1);
                        that.globalScrollTo(that.activeGlobalNewsIndex);
                    }
                } else {
                    var delta = ev.deltaY || ev.detail || ev.wheelDelta;
                    if(0 < delta){
                        that.activeNewsIndex = (that.activeNewsIndex > that.currentMonthData.news.length-1) ? that.activeNewsIndex : (that.activeNewsIndex + 1);
                        that.scrollTo(that.activeNewsIndex);
                    }
                    else {
                        that.activeNewsIndex = (that.activeNewsIndex - 1) < 1 ? that.activeNewsIndex : (that.activeNewsIndex - 1);
                        that.scrollTo(that.activeNewsIndex);
                    }
                }



                ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false);

            });

            //Todo

            var name = document.createElement('div');
            name.className = 'fake-author-name';
            document.getElementsByClassName('carousel-wrapper')[0].appendChild(name);

            contentData.interview.forEach(function(interview, index){
                fakeImagesElem[index].addEventListener('mouseover', function(){
            		fakeImagesElem[index].classList.add('selected');

                    if(that.isScale){
                        name.style.left = fakeImagesElem[index].getBoundingClientRect().left+ 'px';
                        //name.style.bottom = (fakeImagesElem[index].getBoundingClientRect().bottom - 120) + 'px';
                        name.style.display = 'block';
                        name.innerHTML = '<p class="author-name">'+ interview.author.name +'</p><p class="author-city">м. '+ interview.author.city +', </p><p class="author-profession">'+ interview.author.profession +'</p></div>';
                    }

            		contentData.news.forEach(function(news, i){
            			if(contentData.news[i].author == interview.author.name){
            				fakePostsElem[i].classList.add('selected')
            			}
            		});
            		citiesElem.children.forEach(function(el, i){
            			if(el.textContent.replace(/[\r\n]/g, '').toUpperCase() == (interview.author.city).toUpperCase()){
            				el.classList.add('active')
            			}
            		});
            	});




            	fakeImagesElem[index].addEventListener('mouseout', function(){
            		fakeImagesElem[index].classList.remove('selected');
                    if(that.isScale) {
                        name.style.display = 'none';
                        name.innerHTML = '';
                    }
            		contentData.news.forEach(function(news, i){
            			if(contentData.news[i].author == interview.author.name){
            				fakePostsElem[i].classList.remove('selected')
            			}
            		});
                    citiesElem.children.forEach(function(el, i){
            			if(el.textContent.replace(/[\r\n]/g, '').toUpperCase() == (interview.author.city).toUpperCase()){
            				el.classList.remove('active')
            			}
            		})
            	})
            });



        };

        function filterNews(isFilter) {

            if (isFilter) {
                document.getElementsByClassName('carousel-element').forEach(function (el) {
                    el.classList.remove('hided');
                    el.classList.remove('active');
                });
                document.getElementsByClassName('author-photo').forEach(function (el) {
                    el.classList.remove('hided');
                    el.classList.remove('active');
                });

                /*document.getElementsByClassName('author-photo').forEach(function(el){
                    var old_element = el;
                    var new_element = old_element.cloneNode(true);
                    old_element.parentNode.replaceChild(new_element, old_element);
                });*/

                //addMounthEvents(that.data);


            } else {
                var ind = 1;
                document.getElementsByClassName('carousel-element').forEach(function(el, index){
                    if(parseInt(that.data.news[index].eventDate.split('.')[1]) !== that.date.getMonth() + 1){
                        el.classList.add('hided');
                        el.removeAttribute('data-index');
                        el.setAttribute('data-global-index', index + 1);
                    }else{
                        el.classList.remove('hided');

                        el.setAttribute('data-index', ind);
                        el.removeAttribute('data-global-index' + 1);
                        ind = ind + 1;
                    }
                });
                ind = 1;
                document.getElementsByClassName('author-photo').forEach(function(el, index){
                    if(parseInt(that.data.interview[index].eventDate.split('.')[1]) !== that.date.getMonth() + 1){
                        el.classList.add('hided');
                        el.removeAttribute('data-index');
                        el.setAttribute('data-global-index', index + 1);
                    }else{
                        el.classList.remove('hided');
                        el.setAttribute('data-index', ind);
                        el.removeAttribute('data-global-index' + 1);
                        ind = ind + 1;
                    }
                });
                //addMounthEvents(that.data);
            }
        }

        this.setCurrentMounth = function(mounth){

        }

		this.scale = function(){
			this.isScale = !this.isScale;
			var that = this, fakeMonthsElem, citiesElem, fakeDaysElem, name ;
            //addMounthEvents(that.data);

			if(this.isScale){
				/*document.getElementsByClassName('carousel-element').forEach(function(el){
					el.classList.remove('hided')
				});
				document.getElementsByClassName('author-photo').forEach(function(el){
					el.classList.remove('hided')
				});*/
                filterNews(true);

                showAllMounth();
                swapTimelines(true);

                //this.activeGlobalNewsIndex = this.activeNewsIndex;

				document.body.classList.add('scaled');
				document.body.classList.remove('not-scaled');
				document.getElementsByClassName('cities-wrapper')[0].classList.remove('hided');
			} else{
                filterNews(false);
                setActiveMounth(document.getElementsByClassName('timeline-months-wrapper')[0], that.date.getMonth());
                //addMounthEvents(that.data);
                swapTimelines(false);

                that.scrollTo(that.activeNewsIndex);

				document.body.classList.remove('scaled');
				document.body.classList.add('not-scaled');
				document.getElementsByClassName('cities-wrapper')[0].classList.add('hided');
			}

		};
	}

	Carousel.prototype.refresh = function(date, ind){
		var that = this;
		this.date = date;

        //this.activeGlobalNewsIndex = this.activeNewsIndex;

        this.currentMonthData = {};
        Object.keys(this.data).forEach(function(type, typeIndex){
            that.currentMonthData[type] = [];
            that.allData[type] = [];
            that.data[type].forEach(function(el, index){
                if(parseInt(el.eventDate.split('.')[1]) === that.date.getMonth() + 1){
                    that.currentMonthData[type].push(el);
                }
                that.allData[type].push(el);
            });
        });


        //while (this.carouselStructure.timelineWrapper.element.firstChild) {
        this.carouselStructure.timelineWrapper.element.removeChild(this.carouselStructure.timelineWrapper.element.children[0]);
        this.carouselStructure.timelineWrapper.element.removeChild(this.carouselStructure.timelineWrapper.element.children[1]);
        //}
        createTimeline(this.carouselStructure.timelineWrapper.element, this.date, this.currentMonthData, this.scaled, this);






        this.refreshNews(date, ind);

        this.carouselStructure.newsWrapper.scroller.children.forEach(function(el){
            if(el.getAttribute('data-index')){
                el.addEventListener('click', function(){
                    that.scrollTo(parseInt(el.getAttribute('data-index')));
                });
            }
        });
        this.carouselStructure.newsWrapper.scroller.children.forEach(function(el){
            var old_element = el;
            var new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
        });

        this.carouselStructure.newsWrapper.scroller.children.forEach(function(el){
            if(el.getAttribute('data-index')){
                el.addEventListener('click', that.ScrollListener);
            } else {
                    if(el.getAttribute('data-global-index')){
                        el.addEventListener('click', that.ScrollGlobalListener);
                    }

            }
        });

        this.carouselStructure.timelineWrapper.element.children[0].children[0].children.forEach(function(el){
            el.addEventListener('click', function(){
                var days = [];
                that.currentMonthData.news.forEach(function(el){
                    days.push(parseInt(el.eventDate.split('.')[0]))
                });
                var index = days.indexOf(parseInt(el.getAttribute('data-index')));
                if(index !== -1){
                    that.scrollTo(index + 1);
                }
            })
        });






        if(this.isScale) this.scale();
        else {
            setActiveMounth(document.getElementsByClassName('timeline-months-wrapper')[0], that.date.getMonth());
        };
		/*for(var i = 0; i < 3; i++){
		 this.wrapper.removeChild(this.wrapper.children[0]);
		 }

		 //Инициализировать заново не нужно, просто фильтровать по новостям.
		 this.init();*/

	};

    Carousel.prototype.refreshNews = function(date, ind){
        var that = this;
        var scrollInd = ind;

        var ind = 1;
        document.getElementsByClassName('carousel-element').forEach(function(el, index){
            if(parseInt(that.data.news[index].eventDate.split('.')[1]) !== that.date.getMonth() + 1){
                el.classList.add('hided');
                el.removeAttribute('data-index');
                el.setAttribute('data-global-index', index + 1);
                //el.removeEventListener('click', that.ScrollListener);
            } else {
                el.classList.remove('hided');
                el.setAttribute('data-index', ind);
                el.removeAttribute('data-global-index');
                ind = ind + 1;

                /*el.addEventListener('click', function(that, ind){
                    that.scrollTo(ind);
                })*/
            }
        });

        var ind = 1;
        document.getElementsByClassName('author-photo').forEach(function(el, index){
            if(parseInt(that.data.interview[index].eventDate.split('.')[1]) !== that.date.getMonth() + 1){
                el.classList.add('hided');
                el.removeAttribute('data-index');
            }else{
                el.classList.remove('hided');
                el.setAttribute('data-index', ind);
                ind = ind + 1;
            }
        });

        var getLocalOffset = function(mouthIndex){
            var offInd = 0;
            /*that.allData["news"].forEach(function(el, ind){
                if(el.eventDate === that.allData["news"][mouthIndex].eventDate){
                    offInd = ind;
                }
            });*/
            that.currentMonthData["news"].forEach(function(el, ind){
                if(el.eventDate === that.allData["news"][mouthIndex].eventDate){
                    offInd = ind;
                }
            });

            return offInd;
        };

        this.scrollTo(getLocalOffset(scrollInd-1)+1);


    };

    Carousel.prototype.globalScrollTo = function(index){
        this.activeGlobalNewsIndex = index;
        var that = this,
            scrollers = document.getElementsByClassName('content-scroller'),
            center, translateTo;

        scrollers.forEach(function(scroller, i){
            var width = scroller.children[0].offsetWidth || 10;
            switch(i){
                case 0:
                    center = ((document.body.offsetWidth / 2) + width / 2 - (width * (index )));
                    break;

                default :
                    center = ((document.body.offsetWidth / 2) + width / 2 - (width * ( index )));
                    break;
            }
            translateTo = '-webkit-transform: translate3d(' + center + 'px,0,0);' +
                '-moz-transform: translate3d(' + center + 'px,0,0);' +
                ' transform: translate3d(' + center + 'px,0,0);';
            scroller.style.cssText = translateTo;
        });

    };

	Carousel.prototype.scrollTo = function(index){
        this.activeNewsIndex = index;

		var that = this,
			scrollers = document.getElementsByClassName('content-scroller'),
			center, translateTo,
			nearestInterview = function(date){
				var publishDay = parseInt(that.currentMonthData.news[date - 1].eventDate.split('.')[0]),
					interviewIndex, diff;
				diff = that.currentMonthData.interview.map(function(el){
					return ((publishDay - parseInt(el.eventDate.split('.')[0])) >= 0) ? publishDay - parseInt(el.eventDate.split('.')[0]) : null;
				});
				interviewIndex = diff.indexOf(Math.min.apply(Math, diff.filter(function(el){
					return el !== null;
				})));
				return interviewIndex
			};

		var getNewsOffset = function(curMouthIndex){
			var offInd = 0;
			that.allData["news"].forEach(function(el, ind){
				if(that.currentMonthData["news"].length > 0 && el.eventDate === that.currentMonthData["news"][curMouthIndex].eventDate){
					offInd = ind;
				}
			});


			return offInd;
		};

		var getInterviewOffset = function(curMouthIndex){
			var offInd = 0;
			that.allData.interview.forEach(function(el, ind){
				if(that.currentMonthData["interview"].length > 0 && el.eventDate === that.currentMonthData.interview[curMouthIndex].eventDate){
					offInd = ind;
				}
			});

			return offInd;
		};
		var setActiveName = function(obj){
			var author = document.getElementsByClassName('author-info')[0],
				authorName = author.getElementsByClassName('author-name')[0],
				authorCity = author.getElementsByClassName('author-city')[0],
				authorProff = author.getElementsByClassName('author-profession')[0];

            //author.classList.add('fadeinOut');
            //setTimeout(function() {
                authorName.textContent = obj.author.name;
                authorCity.textContent = 'м. ' + obj.author.city + ', ';
                authorProff.textContent = obj.author.profession;
           // }, 250);
            //setTimeout(function(){
                author.classList.remove('fadeinOut');
            //}, 500);



		};

		if (this.currentMonthData.news.length > 0) {
			this.activeGlobalNewsIndex = getNewsOffset(index-1) + 1;
			setActive(this.carouselStructure.newsWrapper.scroller.children[getNewsOffset(index - 1)]);
			setActive(this.carouselStructure.timelineWrapper.element.children[0].children[0].children[getDay(this.currentMonthData.news[index - 1].eventDate) - 1]);
		}

		if (this.currentMonthData.interview.length > 0) {
			setActive(this.carouselStructure.timelineWrapper.element.children[2].children[0].children[getDay(this.currentMonthData.interview[nearestInterview(index)].eventDate) - 1]);
			//setActiveName(this.data.interview[index]);
			setActiveName(this.data.interview[(getInterviewOffset(nearestInterview(index)) + 1) - 1]);
			setActive(this.carouselStructure.authorsWrapper.scroller.children[(getInterviewOffset(nearestInterview(index)))]);
		}

		scrollers.forEach(function(scroller, i){
			var width = 10;
			if (scroller.children.length > 0) {
				var width = scroller.children[0].offsetWidth;
			}
			switch(i){
				case 0:
					if (that.currentMonthData.news.length > 0) {
						center = ((document.body.offsetWidth / 2) + width / 2 - (width * (getNewsOffset(index - 1) + 1)));
					}
					break;
				case 1:
					if (that.currentMonthData.news.length > 0) {
						//center = ((document.body.offsetWidth / 2) + width / 2 - (width * ((getInterviewOffset(nearestInterview(index)) + 1))));					//center = (document.body.offsetWidth / 2) + width / 2 - ((width - 0.3) * parseInt(that.currentMonthData.interview[nearestInterview(index)].eventDate.split('.')[0]));
						//var offsetIndex = getNewsOffset(index - 1);
						center = (document.body.offsetWidth / 2) + width / 2 - ((width - 0.3) * parseInt(that.currentMonthData.news[index - 1].eventDate.split('.')[0]));
					}
                    break;
                case 2:
                    if (that.currentMonthData.interview.length > 0) {
						center = (document.body.offsetWidth / 2) + width / 2 - ((width - 0.3) * parseInt(that.currentMonthData.interview[nearestInterview(index)].eventDate.split('.')[0]));
					}
                    break;
				default :
					if (that.currentMonthData.interview.length > 0) {
						center = ((document.body.offsetWidth / 2) + width / 2 - (width * ((getInterviewOffset(nearestInterview(index)) + 1))));
					}
					break;
			}
			translateTo = '-webkit-transform: translate3d(' + center + 'px,0,0);' +
			'-moz-transform: translate3d(' + center + 'px,0,0);' +
			' transform: translate3d(' + center + 'px,0,0);';
			scroller.style.cssText = translateTo;
		});

	};

	window.Carousel = Carousel;
});
