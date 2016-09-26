var keys = require('./keys.js')
var Twitter = require('twitter');
var i;
var cmd = process.argv[2];
var subcmd = process.argv[3];
var flag=1;

if ( cmd == "my-tweets")
{ 
			var client = new Twitter({
		  consumer_key: keys.twitterKeys.consumer_key,
		  consumer_secret: keys.twitterKeys.consumer_secret,
		  access_token_key: keys.twitterKeys.access_token_key,
		  access_token_secret: keys.twitterKeys.access_token_secret
		});
		 
		var params = {screen_name: 'doiob_doob'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	{
		  	 	for(i=0;i<9;i++)
			  	{
			     	console.log(tweets[i].text);
			 	}
		 	}
		  }
		});
}
if ( cmd == "spotify-this-song")
{
	var i=0;

	var spotify = require('spotify');
	if ( typeof subcmd === 'undefined')
	{
		 // spotigy.get is not working this is a workaround.
		spotify.search({ type: 'album', query: 'Ace of Base' }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
    		}
    		for(i=0;i<20;i++)
	    	{
	    			if ( data.albums.items[i].name.indexOf('The Sign') != -1)
	    			{
	    				console.log("Album  :  Ace of Base")
					 	console.log("URL    :  "+data.albums.items[0].external_urls.spotify)
					 	console.log("Song   :  "+data.albums.items[0].name)
	    			}
	    	}
    	
      });
    	 
		
	  
	}
	else
	{
		spotify.search({ type: 'track', query: subcmd }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    
	 	console.log("Album  :  "+data.tracks.items[0].album.name)
	 	console.log("Artist :  "+data.tracks.items[0].artists[0].name)
	 	console.log("URL    :  "+data.tracks.items[0].external_urls.spotify)
	 	console.log("Song   :  "+data.tracks.items[0].name)
		});
	}
	
}

if ( cmd == "movie-this")
{
	var request = require('request');

	if ( typeof subcmd === 'undefined')
	{
		subcmd = 'Mr. Nobody'
		console.log('If you haven\'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/')
		console.log('It\'s on Netflix!')
	}

	var url = "http://www.omdbapi.com/?tomatoes=true&t=" + subcmd 
	var result;
	
		request(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	result = JSON.parse(body)
	    	
	        console.log('Title		: '+result.Title);
	        console.log('Year		: '+result.Year); 
	        console.log('Rated		: '+result.Rated); 
	        console.log('Country		: '+result.Country);
	        console.log('Language	: '+result.Language);
	        console.log('Actors 		: '+result.Actors);
	        console.log('tomatoRating	: '+result.tomatoRating);
	        console.log('tomatoURL 	: '+result.tomatoURL);
	        console.log('Plot		: '+result.Plot);
	  	}
    	});

}