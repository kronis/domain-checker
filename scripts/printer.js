(function() {

	function createTd(text, link) {
		var td = document.createElement('td');
		var text = document.createTextNode(text);
		td.appendChild(text);
		if (link) {
			var link = document.createElement('a');
			var text = document.createTextNode('Link');
			link.appendChild(text);
			td.appendChild(link);
		}
		return td;
	}

	function createTr(data) {
		var tr = document.createElement('tr');
		var i;
		for (i = 0, i < data.results; i++) {
		
		}
	}
})();
