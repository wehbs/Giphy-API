$(document).ready(function () {


  var foods = ["pizza", "hotdog", "eggplant", "salad", "potatoes"];


  renderButtons()


  // Add new button
  $("#addFood").on("click", function (event) {
    event.preventDefault();

    var food = $("#foodInput").val().trim();

    foods.push(food);

    renderButtons();
  });


  // Search the Giphy Api based on the value of the button clicked
  function searchGiphyAPI() {

    $("#foods").empty();
    var foodSearch = $(this).attr("data-name");

    // QueryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodSearch + "&api_key=dc6zaTOxFJmzC";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function (response) {
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var foodDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);

        var foodImage = $("<img>");
        foodImage.attr("src", results[i].images.fixed_height_still.url);

        foodDiv.append(p);
        foodDiv.append(foodImage);

        $("#foods").prepend(foodDiv);
      }

    });
  }


  // Create buttons
  function renderButtons() {

    $("#foodButtons").empty();

    for (var i = 0; i < foods.length; i++) {

      var createButton = $("<button>");
      createButton.addClass("btn btn-primary");
      createButton.attr("data-name", foods[i]);
      createButton.text(foods[i]);
      $("#foodButtons").append(createButton);
    }
  }

  $(document).on("click", ".btn-primary", searchGiphyAPI);


});