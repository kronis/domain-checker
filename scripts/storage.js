function isDomainSaved(domain, tld, callback) {
	var ref = new Firebase("http://domain-checker.firebaseio.com/");
	ref.once("value", function(snapshot) {
		if(!snapshot.child(domain + '-' + tld).exists()) {
			callback();
		}
	});
}

function saveDomain(domain, tld, data) {
	var callback = function() {
		var ref = new Firebase("http://domain-checker.firebaseio.com/");
		var row = {};
		row[domain + '-' + tld] = data;
		ref.update(row);
	}
	isDomainSaved(domain, tld, callback);
}

function getData(callback) {
	var ref = new Firebase("http://domain-checker.firebaseio.com/");
	ref.once("value", function(snapshot) {
		callback(snapshot.val());
	});
}
