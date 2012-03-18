function openPage(path, updateHistory) {
	if (updateHistory) {
		window.history.pushState('j-li.net-hist|' + path, 'Title', path);
	}
	
	$('#content').fadeOut(100, function() {
		$.getJSON(path + "?ajax", function(data) {
			if (data.view == 'index') $('#submenu').fadeOut(500);
			else $('#submenu').fadeIn(500);
			
			$('#content').html(data.html).fadeIn(100);
			$('#submenu li a').removeClass('active');
			$('#submenu li a.' + data.view).addClass('active');
			
			updateClickHandlers();
			if (data.title !== '') document.title = data.title + ' >> j-li.net';
			else document.title = 'j-li.net';
		});
	});
}

$(document).ready(function() {
	if (Modernizr.history) {
		window.history.replaceState('j-li.net-hist|', 'Title', window.location.pathname);
		$('a.ajaxlink').click(function() {
			openPage($(this).attr('href'), true);
			return false;
		});
	}
});

function updateClickHandlers() {
	$('#content a.ajaxlink').click(function() {
		openPage($(this).attr("href"), true);
		return false;
	});
}

window.onpopstate = function(event) {
	if (event.state.substr(0, 14) == 'j-li.net-hist|') {
		openPage(event.state.substr(14), false);
	}
};