document.getElementById('generate').addEventListener('click', function() {
	fetch('http://example.com/movies.json')
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(myJson) {
	    console.log(JSON.stringify(myJson));
	  });
}, false);