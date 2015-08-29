(function() {
	function inputParser(text) {
		var domains = text.split(/\n/);
		getResultForDomains(domains);
		console.log(domains);
		// TODO : Phe
	}

	$('#domain-checker').bind('submit', function(e) {
		e.preventDefault();
		var data = $('#domain-checker').find('textarea').val();
		inputParser(data);
	});
})();
