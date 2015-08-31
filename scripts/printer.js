function updateTd(data, table) {
	var className = data.status === 'Not' ? 'taken' : 'free';
	var text = data.status === 'Not' ? '-' : '\u2611';
	$(table).find('td.' + data.tld).addClass(className).text(text);
}
