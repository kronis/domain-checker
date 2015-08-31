function updateTd(data, table) {
	var className = data.taken ? 'taken' : 'free';
	var text = data.taken ? '-' : '\u2611';
	if (data.domian === "") {
		$(table)
			$(table).find('tr[class=""]')
			.find('td.' + data.tld)
			.addClass(className)
			.text(text);
	} else {
		$(table)
			.find('tr.' + data.domian)
			.find('td.' + data.tld)
			.addClass(className)
			.text(text);
	}
}
