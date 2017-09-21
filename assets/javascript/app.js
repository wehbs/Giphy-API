$(document).ready(function () {


  var foods = ["pizza", "hotdog", "eggplant", "salad", "potatoes"];

  renderButtons()

  // Add new button
  $("#addFood").on("click", function (event) {
    // Prevents the page from reloading as this is the default action for a submit button in a form
    event.preventDefault();
    // Gets the value of the text box input and also removes spaces before and after the text
    var food = $("#foodInput").val().trim();
    // Add the new search term to the foods array
    foods.push(food);

    renderButtons();
    // Clear out the text field after adding a new search button
    $("#foodInput").val("")

  });

  // Search the Giphy Api based on the value of the button clicked
  function searchGiphyAPI() {
    // Clears out the results from the previous search before populating new results
    $("#foods").empty();
    $("#heading").empty();
    // Add a heading with instructions
    $("#heading").append("<h1>Click on a PIC to make it GIF!</h1>");
    // Captures the value of the data-name attribute from the button that was pressed
    var foodSearch = $(this).attr("data-name");
    // QueryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodSearch + "&api_key=dc6zaTOxFJmzC";
    // Ajax call to pull in the objects from the Giphy API
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function (response) {
      var results = response.data;
      // Loops through only 10 gifs
      for (var i = 0; i < 10; i++) {
        // Create 10 Divs to hold gifs
        var foodDiv = $("<div class=col-md-4>" + "<br>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        // Create img tags and add some attributes
        var foodImage = $("<img>");
        foodImage.attr("src", results[i].images.fixed_width_still.url);
        foodImage.attr("data-still", results[i].images.fixed_width_still.url);
        foodImage.attr("data-animate", results[i].images.fixed_width.url);
        foodImage.attr("data-state", "still");
        foodImage.attr("class", "gif");

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

  // Turn motion on and off when image is clicked
  function gifAnimate() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

  $(document).on("click", ".btn-primary", searchGiphyAPI);
  $(document).on("click", "img", gifAnimate);


});