/*
Displays a list of query suggestions to the user when they type.
Displays the suggestions in order of key press..
Stores past search queries locally. 
*/

$(document).ready(function() {
	var responses = {};
	var currentKeyPressCount = 0;
	var keyPressCount = 0;
	
	$("#search_box").keyup(function(){
		keyPressCount += 1;
		var searchInput = this.value;
		console.log("searchInput: " + searchInput);
		
		if (responses[searchInput] != undefined) {
			successCallback(searchInput, responses[searchInput], keyPressCount);
		}
		else {
			updateSuggestions(searchInput, keyPressCount);
		}
	});
	
	function successCallback(searchInput, data, count){
		console.log("successCallback: " + JSON.stringify(arguments));
		responses[searchInput] = data
		var suggestionList = "<ul>"
		for (var i=0; i<data.length; i++){
			suggestionList += "<li>" + data[i] + "</li>"
		}
		suggestionList += "</ul>"
		if (currentKeyPressCount <= count){
			currentKeyPressCount = count
			$("#suggestions").html(suggestionList)
		}
	};
	
	function updateSuggestions(searchInput, count){
		$.ajax({
			url: "http://suggestqueries.google.com/complete/search?",
			data: {q: searchInput, client:'firefox'}, 
			type:"GET",
			dataType: 'jsonp',
			success: function(data){successCallback(searchInput, data[1], count)},
			});
	};
	
});