$(document).ready(function() {





var foods = ["pizza", "hotdog", "eggplant", "salad", "potatoes"];







console.log(foods);


// Example queryURL for Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

$.ajax({
  url: queryURL,
  method: 'GET'
}).done(function(response) {
  console.log(response);
  $("#pic").attr("src", response.data[0].images.original_still.url);
});

function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#foodButtons").empty();

  for (var i = 0; i < foods.length; i++) {

    var a = $("<button>");
    a.addClass("food");
    a.attr("data-name", foods[i]);
    a.text(foods[i]);
    $("#foodButtons").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#addFood").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var food = $("#foodInput").val().trim();

  // Adding movie from the textbox to our array
  foods.push(food);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});


renderButtons()





});
