var domaninsEndings = ['.no', '.se'];
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
			updateTd(data);
		},
		error: function (data) {
			console.log(data);
		}
	});
}




