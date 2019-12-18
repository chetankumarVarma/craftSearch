$(document).ready(function(){

	$('.filter_bhk').click(function(){
		$(".filter_bhk").removeClass('selected');
		$(".filter_bhk").css('background-color','#fff');
		$(".filter_bhk").css('color','#000');
		/*if($(this).hasClass('selected')){
			$(this).removeClass('selected');
			$(this).css('background-color','#fff');
			$(this).css('color','#000');
		}
		else {
		}*/
		$(this).addClass('selected');
		$(this).css('background-color','#56A366');
		$(this).css('color','#fff');

		// const listItems = $('.filter_ul li');
		// var bhk = [];
		// for (let i = 0; i < listItems.length; i++) {
		//     if($(listItems[i]).children('dt').hasClass('selected')){
		// 		var bhk_val= $(listItems[i]).children('dt').html();
		// 		console.log(bhk_val);
		// 		bhk.push(bhk_val);
		// 	}

		// }
		// console.log(bhk);

	});

});