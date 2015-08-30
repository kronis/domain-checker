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

function getData() {
	var ref = new Firebase("http://domain-checker.firebaseio.com/");
	ref.once("value", function(snapshot) {
		var datas = snapshot.val();
		for (var prop in datas) {
			console.log("o." + prop + " = " + datas[prop]);
		}
	});
}

getData();
