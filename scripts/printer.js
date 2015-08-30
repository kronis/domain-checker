function updateTd(data) {
	var className = data.status === 'Not' ? 'taken' : 'free';
	var text = data.status === 'Not' ? '-' : '\u2611';
	$('#result-table').find('td.' + data.tld).addClass(className).text(text);
}
