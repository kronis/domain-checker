(function() {
	function createTable(domains, tlds) {
		var table = $('<table id="result-table"><thead><tr></tr></thead><tbody></tbody></table>');
		$(table).find('thead tr').append($('<td></td>'));
		tlds.forEach(function(tld) {
			$(table).find('thead tr').append('<th>' + tld + '</th>');
		});

		domains.forEach(function(domain) {
			var row = $('<tr id="' + domain + '"></tr>');
			row.append($('<td>' + domain + '</td>'));
			tlds.forEach(function(tld) {
				row.append($('<td class="' + tld.replace('.', '') + '"></td>'));
			});
			table.append(row);
		});
		return table;
	}

	$('#domain-checker').bind('submit', function(e) {
		e.preventDefault();
		var data = $('#domain-checker').find('textarea').val();
		var domains = data.split(/\n/);
		$('body').append(createTable(domains, domaninsEndings));
		getResultForDomains(domains);
	});
})();
