function createTable(domains, tlds, tableId) {
	var table = $('<table id="' + tableId + '" class="table table-striped table-hover table-condensed"><thead><tr></tr></thead><tbody></tbody></table>');
	$(table).find('thead tr').append($('<th></th>'));
	tlds.forEach(function(tld) {
		$(table).find('thead tr').append('<th>' + tld + '</th>');
	});
	$(table).find('thead tr').append('<th>Score</th>');

	if (!domains) {
		return table;
	}
	domains.forEach(function(domain) {
		var row = $('<tr class="' + domain + '"></tr>');
		row.append($('<td>' + domain + '</td>'));
		tlds.forEach(function(tld) {
			row.append($('<td class="' + tld.replace('.', '') + '"></td>'));
		});
		table.append(row);
	});
	return table;
}
