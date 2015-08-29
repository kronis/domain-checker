(function() {
	var tests = [];
	tests.push('<tr bgcolor="#DDDDDD" height=20><td></td><td class="OptionalRow"><img src="/gif/tld/dk.gif" width=18 height=12 title="Danmark" hspace=1></td><td>radium.dk</td><td align=right></td><td class="OptionalRow" align=right></td><td class="OptionalRow" align=right></td><td>Opptatt (<a href="https://www.domeneshop.no/whois.cgi?domainname=radium.dk" target="_blank">Eierinfo</a>&nbsp;|&nbsp;<a href="https://www.domeneshop.no/transfer.cgi?domainname=radium.dk">Flytt</a><span class="OptionalRow">&nbsp;|&nbsp;<a href="http://www.radium.dk/" target="_blank">Webside</a></span>)</td></tr>');
	var restults = [];

	for(i = 0; i < tests.length; i++) {
		var data = tests[i];
		data = $(data);
		console.log(data);
		results.push({
			country: 'todo',
			domian: 'todo',
			info: {
				status: 'todo',
				owner: 'todo'

			}

		});
	}
	console.log('test');
})();
