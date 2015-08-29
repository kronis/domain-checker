
function getResultForDomains(domainNames) {
	domainNames.forEach(function (domainName) {
		['.no', '.se', '.com'].forEach(function (domaninsEnding) {
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
		success: function (data) {
			console.log(data)
		},
		error: function (data) {
			console.log(data);
		}
	});
}




