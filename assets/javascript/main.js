
// global variables
var apiKey = "a5c09d2dbe71875e792a7dbe0771b30f&q=";
var queryURL = "http://food2fork.com/api/search?key=";
var input = [];
var limit = "&count=1";

$("#search").on("click",function(event) {
    event.preventDefault();
    // storing the search input
    var search = $("#search-input").val().trim();
    input.push(search);
    console.log(input);
    // resetting input to blank value
    $("#search-input").val('');

    // calling ajax
    getRecipe();
    
    // removing element from array after its searched
    input.splice(0,1);
    console.log(input);
});


function getRecipe() {
    var newURL = queryURL + apiKey + input + limit;

    $.ajax({
        url:newURL,
        method: "GET"
      })
      .done(function(response) {
          console.log(newURL);
          console.log(response);
          console.log(response.title);

          var recipeTitle = $("<h1>").text(response.title);
          var recipeLink = $("<a>").attr("href", response.f2f_url).append(recipeTitle);
          var recipeImage = $("<img>").attr("src", response.image_url);

          $("#recipe").append(recipeLink, recipeImage);
      });
    };