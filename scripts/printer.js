function updateTd(data) {
	console.log(data);
	$('#result-table').find('td.' + data.tld).text(data.status);
}
