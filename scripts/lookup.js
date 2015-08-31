var domaninsEndings = ['.no', '.se', '.com', '.net', '.org', '.me', '.as', '.cc', '.nu'];
function getResultForDomains(domainNames) {
	domainNames.forEach(function (domainName) {
		domaninsEndings.forEach(function (domaninsEnding) {
			getResultForDomain(domainName, domaninsEnding);
		});
	});
}

function getResultForDomain(domainname, domaninsEnding) {
	return $.ajax({
		url: '/ds/check.cgi',
		data:{
			domainname: domainname.concat(domaninsEnding)
		},
		success: function (html) {
			var data = parseHtmlFromResponse(html);
			saveDomain(data.domian, data.tld, html);
			updateTd(data, '#result-table');
		},
		error: function (data) {
			console.log(data);
		}
	});
}
