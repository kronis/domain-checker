(function() {
	function parseHtml(html) {
		html = $(html);
		return {
			domian: $(html).find('td:nth(2)').text().split('.')[0],
			status: $(html).find('td:nth(6)').text().split(' ')[0],
			whois: $(html).find('td:nth(6)').find('a:first').attr('href') 
		};
	}
})();
