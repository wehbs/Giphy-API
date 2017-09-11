$(document).ready(function() {





var topics = [];










// Example queryURL for Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

$.ajax({
  url: queryURL,
  method: 'GET'
}).done(function(response) {
  console.log(response);
  $("#pic").attr("src", response.data[0].images.original_still.url);
});








});
