//MENU SCROLL
jQuery(document).ready(function($){
	$(".tab li a").on("click", function(e){
		e.preventDefault();
		$(".tab li a").removeClass("active");
		$(".tab li").removeClass("active");
		$(this).parent().addClass("active");
		$(this).addClass("active");
		$('.tab-component section').css("display","none");
		$(""+$(this).attr("href")).fadeIn();
	});
});
