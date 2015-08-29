function parseHtmlFromResponse(html) {
	html = $(html);
	return {
		domian: $(html).find('td:nth(2)').text().split('.')[0],
		tld: $(html).find('td:nth(2)').text().split('.')[1],
		status: $(html).find('td:nth(6)').text().split(' ')[0],
		whois: $(html).find('td:nth(6)').find('a:first').attr('href') 
	};
}
