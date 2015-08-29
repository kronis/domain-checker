

var domaninsEndings = ['.no', '.se', '.com'];

function getResultForDomains() {
	var domainnames = Array.prototype.slice.call(arguments);
	var promises = [];
	domainnames.forEach(function (domainname) {
		domaninsEndings.forEach(function (domaninsEnding) {
			var promise = getResultForDomain(domainname, domaninsEnding);
			promises.push(promise);
		});
	});
	$.when.all(promises).then(function(schemas) {
		console.log("DONE", this, schemas); // 'schemas' is now an array
	}, function(e) {
		console.log("My ajax failed");
	});
};


function getResultForDomain(domainname, domaninsEnding) {
	return $.ajax({
		url: '/ds/check.cgi',
		data:{
			domainname: domainname.concat(domaninsEnding)
		},
		success: function (data) {
			console.log('success', data);
		},
		error: function (data) {
			console.log(data);
		}
	});
}



getResultForDomains('capraconsulting', 'volvo');
