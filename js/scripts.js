$( window ).ready(function(){
		$('.one-slider').owlCarousel({
			items: 1,
			dots: false,
			nav: true,
			//autoWidth: true,
			loop: true
		});
        $('.rewiews-slider').owlCarousel({
            dots: false,
            nav: true,
            center:true,
            autoWidth: true,
            loop: true,
            responsive : {
                0 : {
                    items:1,
                    margin: 40,
                },
                768 : {
                    items:3,
                    margin: 45,
                }
            }
        });
});
$(document).ready(function(){
    $(".down").on("click", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('data-href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top; 
       //анимируем переход на расстояние - top за 1500 мс
       $('body,html').animate({scrollTop: top}, 1000);
  });
});

/* = POPUP = */
$(document).ready(function(){
    var popupLink = $('.popup-link');
    var popup = $('.modal-popup');
    var allBg = $('.bg');
    var close = $('.close-popup');

    function popupclose(){
        allBg.fadeOut(300);
        popup.fadeOut(300);
    }
    allBg.on('click', function(){ popupclose(); });
    close.on('click', function(){ popupclose(); });
    
    popupLink.on('click', function(){
        var winTop = $(window).scrollTop();
        var oneId = $(this).attr('data-modal');
        popup.each(function(){
            var twoId = $(this).attr('data-modal');
            allBg.fadeIn(300);
            if(twoId === oneId){
                var thisWidth = $(this).width();
                $(this).css({
                    'top' : winTop + 60 + 'px',
                    'left' : '50%',
                    'margin-left' : -thisWidth/2 + 'px'
                }).fadeIn(300);
            }
        });
    }); 
});
