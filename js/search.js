(function functionName(){


	var resultsDIV = document.getElementById("results"),
		// selecting the first form and then selecting a name search
		searchInput = document.forms[0].search,
		currentSearch = '';

		// ES6 function
	var validate = query => {
		// Trim whitespace from start and end of search query
		while(query.charAt(0) === " "){
			query = query.substring(1, query.length);
		}
		if(query.length < 3){
			alert("Your search query is too small, try again.");
			searchInput.focus();
			return;
		}
		while(query.charAt(query.length-1) === ""){
			query = query.substring(0, query.length-1);
    }
		// Check search length, must have 3 characters

		search(query);
	};

	// Finds search matches
	var search = query => {

		// split the user's search query string into an array
		var queryArray = query.split(" ");

		// array to store matched results from database.js
		var results = [];

		// loop through each index of db array
		for(var i=0, j=db.length; i<j; i++){

			// each db[i] is a single video item, each title ends with a pipe "|"
			// save a lowercase variable of the video title
			var dbTitleEnd = db[i].indexOf('|');
			var dbitem = db[i].toLowerCase().substring(0, dbTitleEnd);

			// loop through the user's search query words
			// save a lowercase variable of the search keyword
			for(var ii=0, jj=queryArray.length; ii<jj; ii++){
				var qitem = queryArray[ii].toLowerCase();

				// is the keyword anywhere in the video title?
				// If a match is found, push full db[i] into results array
				var compare = dbitem.indexOf(qitem);
				if(compare !== -1){
					results.push(db[i]);
				}
      }
    }

		results.sort();

		// Check that matches were found, and run output functions
		if(results.length == 0){
			noMatch();
			console.log(results.length);
		}else{
			showMatches(results);
		}
	};

	// Put "No Results"
	var noMatch = () => {
		console.log("hello");
		var html = ''+
			'<p>No Results found.</p>'+
			'<p style="font-size:1rem;">Try searching for "JavaScript".  Just an idea.</p>';
		resultsDIV.innerHTML = html;
	};

	// Put matches into page as paragraphs with anchors
	var showMatches = function(results){

		var html = '<p>Results</p>', title, url;

		// loop through all the results search() function
		for(var i=0, j=results.length; i<j; i++){

			// title of video ends with pipe
			// pull the title's string using index numbers
			titleEnd = results[i].indexOf('|');
			title = results[i].substring(0, titleEnd);

			// pull the video url after the title
			url = results[i].substring(results[i].indexOf('|')+1, results[i].length);
			// make the video link
			html += '<p><a href=' + url + '>' + title + '</a></p>';
		}
		resultsDIV.innerHTML = html;
	};

	document.forms[0].onsubmit = () => {
		var query = searchInput.value;
		validate(query);

		return false;
  }

})();
