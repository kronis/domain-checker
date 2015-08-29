(function() {
	function createTable(domains, tlds) {
		var table = $('<table><thead><tr></tr></thead><tbody></tbody></table>');
		tlds.forEach(function(tld) {
			$(table).find('thead tr').append('<th>' + tld + '</th>');
		});

		domains.forEach(function(domain) {
			var row = $('<tr id="' + domain + '"></tr>');
			row.append($('<td>' + domain + '</td>'));
			tlds.forEach(function(tld) {
				row.append($('<td class="' + tld + '"></td>'));
			});
		});
		return table;
	}

	function inputParser(text) {
		var domains = text.split(/\n/);
		getResultForDomains(domains);
	}
	$('#domain-checker').bind('submit', function(e) {
		e.preventDefault();
		var data = $('#domain-checker').find('textarea').val();
		inputParser(data);
		$('body').append(createTable(data, domaninsEndings));
	});
})();
