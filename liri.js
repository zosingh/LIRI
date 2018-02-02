require("dotenv").config();

var keys = require('./keys.js');
var fs = require ('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var userChoice = process.argv[2];

// Twitter code
if (userChoice === "my-tweets") {
  
  // set Twitter parameters
  var params = {screen_name: 'N/A',
          count: 20
         };

    var client = new Twitter(keys.twitter);
    
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error & response.statusCode === 200) {
        for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
          console.log(tweets[i].created_at);
        }
      }
  });
}

// Spotify code
if (userChoice === "spotify-this-song") {
  var songTitle=process.argv[3] || "The Sign";
 
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      } else{
        //used to shorten repeat code
        var data = data.tracks.items[0];
          console.log("****************************************");
          console.log("Artist(s): "+data.album.artists[0].name);
          console.log("Song Name: "+data.name);
          console.log("Link: "+data.artists[0].external_urls.spotify);
          console.log("Album: "+data.album.name);
          console.log("****************************************");
      } 
  });

}

// OMDB code
if (userChoice==="movie-this") {
  // stores movie into movieTitle... When no movie selected default search is Mr. Nobody
  var movieTitle=process.argv[3] || "Mr Nobody";
  movieTitle.split(" ").join("+");
  var url ="http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";
  //console.log(url);
    request(url, function (error, response, body) {
  // if there were no errors and the response code was 200 (i.e. the request was successful)
        if (!error && response.statusCode == 200) {
          var body =JSON.parse(body);
              console.log("****************************************");
              console.log("Title: "+body.Title);
              console.log("Year: "+body.Year);
              console.log("Rating: "+body.imdbRating);
              console.log("Country: "+body.Country);
              console.log("Language: "+body.Language);
              console.log("Plot: "+body.Plot);
              console.log("Actors: "+body.Actors);
              console.log("Tomato Rating: "+body.tomatoRating);
              console.log("Tomato URL: "+body.tomatoURL);
              console.log("*****************************************");
       }
    });
}

// DWIS code
if (userChoice === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data){
    if (error) {
      return console.log(error);
    }else{
      var randomSong = data;
      var array = data.split(',');
      
            var spotify = new Spotify(keys.spotify);
            spotify.search({ type: 'track', query: array[1] }, function(err, data) {
        //used to shorten repeat code
        var data = data.tracks.items[0];
        console.log("Artist(s): "+data.album.artists[0].name);
        console.log("Song Name: "+data.name);
        console.log("Link: "+data.artists[0].external_urls.spotify);
        console.log("Album: "+data.album.name);
      })
    }
  });
}