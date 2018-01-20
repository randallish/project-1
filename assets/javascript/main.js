// global variables
var apiKey = "a5c09d2dbe71875e792a7dbe0771b30f&q=";
var queryURL = "http://food2fork.com/api/search?key=";
var input = [];
var count = "&count=3";
//
// var ingredientsURL = "http://food2fork.com/api/get?key=a5c09d2dbe71875e792a7dbe0771b30f&rId=" + ingredientInput;
// var ingredientInput = [];

// on click function
$("#search").on("click",function(event) {
    event.preventDefault();
    // storing the search input
    var search = $("#search-input").val().trim();
    input.push(search);
    // resetting input to blank value
    $("#search-input").val('');

    // calling ajax
    getRecipe();
    // removing element from array after its searched
});

function getRecipe() {
    var newURL = queryURL + apiKey + input + count;

    $.ajax({
        url:newURL,
        method: "GET",
        dataType: "json"
      })
      .done(function(response) {

          for (i=0; i<3; i++) {
              var recipeTitle = $("<h1>").text(response.recipes[i].title);
              var recipeLink = $("<a>").attr("href", response.recipes[i].f2f_url).append(recipeTitle);
              var recipeImage = $("<img>").attr("src", response.recipes[i].image_url);
              var ingredients = $("<ol>").text(response.recipes[i].ingredients);
              var recipeFrame = $("<iframe>").attr("src", response.recipes[i].source_url);
              $("#recipe").append(recipeTitle, recipeLink, recipeImage, ingredients, recipeFrame);
              console.log(response);
          }

      });
    };
