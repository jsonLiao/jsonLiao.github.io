$(function() {
	var location0 = window.location.pathname;
	$(".list .list-item a").on('click', function(event) {
		var href = $(this).attr("href");
		var location1 = location0 + "#/" + href;
		window.location = location1;
		if (!$(this).parent().hasClass('active-dir')) {
			$("#loadMsg").attr("src", href + ".html");
		}
		$(".list .list-item").removeClass('active-dir');
		$(this).parent().addClass('active-dir');

		var sideBarhref = $(this).attr("data-href");
		$.cookie("sideBar", sideBarhref);
		console.log($.cookie("sideBar"));
		return false;
	});
	var cur = $.cookie("sideBar");
	if ($.cookie("sideBar")) {
		if(window.location.href.indexOf("#") > -1){
			$('a[data-href="' + cur + '"]').parent().addClass('active-dir');
			$("#loadMsg").attr("src", "view/" + cur + ".html");
		}
	} else {
		//$(".list .list-item").eq(0).addClass('active-dir');
	}
})
