"use strict";

// Grabs the twitter keys
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

// Captures User Request and executes appropriate function
var operator = process.argv[2];

	if (operator == "my-tweets") {
		getTweets();
		}
		
		else if (operator == "spotify-this-song") {
			getSongInfo();
		}
		
		else if (operator == "movie-this") {
			getMovieRequest();
		}
		
		else if (operator == "do-what-it-says") {
			doWhatItSays();
		}

		else {
			console.log("Please enter appropriate request.")
		}
// End of Operator capture


// movie-this pull (WORKING!)
function getMovieRequest()
    {

	// Store all of the arguments in an array
	var movieArgs = process.argv;

    // Create variable for holding the default movie name
	var movieName = "Mr.+Nobody";

	// Loop throught all of the words in the node argument
	// Add the "+"s
	for (var i = 3; i< movieArgs.length; i++) {

		if (i > 3 && i < movieArgs.length) {

			movieName = movieName + "+" + movieArgs[i];
		}

		else {
			movieName = movieArgs[3];
		}
	} 

    // Then run a request to the OMDB API with the movie specified 
    var queryURL = 'http://www.omdbapi.com/?t=' + movieName +'&tomatoes=true&y=&plot=short&r=json';

    // Then create a request to the queryUrl
    request(queryURL, function omdbResult(err, resp, body){
	// If the request is successful
	if(!err && resp.statusCode === 200) {
		// Then log the Release Year for the movie
		// ...
		console.log("\nTitle: " + "\n" + JSON.parse(body).Title);
		console.log("\nRelease year: " +  "\n" + JSON.parse(body).Year);
		console.log("\nIMDB Rating: " +  "\n" + JSON.parse(body).Rated);
 		console.log("\nProduced In: " +  "\n" + JSON.parse(body).Country);
  		console.log("\nLanguage: " +  "\n" + JSON.parse(body).Language);
 		console.log("\nPlot: " +  "\n" + JSON.parse(body).Plot);
 		console.log("\nStaring: " +  "\n" + JSON.parse(body).Actors);
        console.log("\nRotten Tomatoes Rating: " +  "\n" + JSON.parse(body).tomatoRating);
        console.log("\nRotten Tomatoes URL: " +  "\n" + JSON.parse(body).tomatoURL + "\n");
	    }
    });
}

// my-tweets pull (WORKING!)
function getTweets()
    {
	//Require twitter node package
    var twitter = require("twitter");

	//Grab the keys.js info
	var twitterKeys = require('./keys.js').twitterKeys;

	//Set client to the grabbed key
	var user = new twitter(twitterKeys);

	//Set screen_name and number of tweets to pull
	var params = {screen_name: '@cherrybug68', count: 20};

	//Get timeline info
	user.get('statuses/user_timeline', params, function(error, tweets) {
	 	
	 	//If error occurs
	 	if (error) {
		    console.log('Error occurred: ' + error);
		    return;
		}
	 	
	 	//If no error
	 	if (!error) {
		
			//Display twenty current tweets, numbered 1-20
			for (var i = 0; i < tweets.length; i++) {
				console.log((i + 1) + '. ' + tweets[i].text);
			}    
		}
	});
}

// spotify-this-song (WORKING!)
function getSongInfo()
    {
	// Store all of the arguments in an array
	var songArgs = process.argv;

	var songTitle = "The Sign + Ace of Base";

 	for (var i = 3; i< songArgs.length; i++) {

		if (i > 3 && i < songArgs.length) {

		songTitle = songTitle + " " + songArgs[i];
		}

		else {
			songTitle = songArgs[3];
		}
	}

	// Spotify search for song title
        spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    
        if ( err ) {
            console.log('Error occurred: ' + err);
        return;
        }
 
		console.log("\nArtist(s): " + "\n" + data.tracks.items[0].artists[0].name);
		console.log("\nSong Name: " + "\n" + data.tracks.items[0].name);
		console.log("\nSong Link: " + "\n" + data.tracks.items[0].external_urls.spotify);
		console.log("\nAlbum: " + "\n" + data.tracks.items[0].album.name);
    });
}

// do-what-it-says (NOT WORKING...will continue to work on this)
function doWhatItSays()
	{
		fs.readFile("random.txt", "utf8", readFileResult);
	};

function readFileResult(err, data) {
	if (err) {
		console.log("something isn't working");
	}
	else {
		var fileData = data.split(',');
		var operator = fileData[0]
		console.log("fileData 1: " + fileData[1]);
		console.log("Operator: " + operator);
	}
};