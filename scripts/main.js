function printSavedData() {
	function printer(datas) {
		var dataArray = Object.keys(datas).map(function (key) {
			return datas[key];
		});

		var jsonArray = [];
		dataArray.forEach(function(data) {
			jsonArray.push(parseHtmlFromResponse(data));
		});

		var tlds = _.uniq(_.pluck(jsonArray, 'tld'));
		var domains = _.uniq(_.pluck(jsonArray, 'domian'));
		$('body').append(createTable(domains, tlds, 'saved-table'));

		jsonArray.forEach(function(data) {
			console.log(data);
			updateTd(data, '#saved-table');
		});
	} 	
	getData(printer);
}

(function () {
	$('#domain-checker').bind('submit', function(e) {
		e.preventDefault();
		var data = $('#domain-checker').find('textarea').val();
		var domains = data.split(/\n/);
		$('body').append(createTable(domains, domaninsEndings, 'result-table'));
		getResultForDomains(domains);
	});

	printSavedData();
})();
