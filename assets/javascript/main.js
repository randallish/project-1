
// global variables
// var apiKey = "a5c09d2dbe71875e792a7dbe0771b30f&q=";
// var queryURL = "http://food2fork.com/api/search?key=";
// var input = [];
// var count = "&count=1";
// var recipeInput = [];
// var newQueryURL = "http://food2fork.com/api/get?key=a5c09d2dbe71875e792a7dbe0771b30f&rId=" + recipeInput;
var apiKey = "cb4a11a5a1c39b9d50bd44a893dd3334&q=";
var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=";
var input = [];
var appId = "911135b9&_app_key="

// var yelpKey = "UekWtwsdSdChv7BPj0qe5Koex2GpQ_eO4MkJJIJYyPst0QClEqU5szdU60hG5Vav-qMNnEATvZBHF2z7txq0P6wSAAafOWzLqT2EJrm0I8yRhXPEDXAON_XWAVVeWnYx";
// var yelpURL = "https://api.yelp.com/v3/businesses/search?location=";
// var limit = "&limit=10";
// var yelp = [];

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
    input.splice(0,1);
});


// $("#yelp-search").on("click",function(event) {
//     event.preventDefault();
//     var yelpSearch = $("#yelp-input").val().trim();
//     yelp.push(yelpSearch);
//     console.log(yelp);
//     getRestaurant();
// });


function getRecipe() {
    var newURL = queryURL + appId + apiKey + input;

    $.ajax({
        url:newURL,
        method: "GET",
        dataType: "json",
      })
      .done(function(response) {
          // var recipeTitle = $("<h1>").text(response.recipes[0].title);
          // var recipeLink = $("<a>").attr("href", response.recipes[0].f2f_url).append(recipeTitle);
          // var recipeImage = $("<img>").attr("src", response.recipes[0].image_url);
          // var ingredients = $("<ol>").text(response.recipes[0].ingredients);
          // $("#recipe").append(recipeTitle, recipeLink, recipeImage, ingredients);
          // recipeInput.push(response.recipes[0].recipe_id);
          // console.log(response)

          console.log(response.matches);
          var recipeName = $("<h1>").text(response.matches[0].recipeName);
          var recipeImage = $("<img>").attr("src", response.matches[0].imageUrlsBySize[90]);
          var recipeIngredients = $("<ul>").text("Ingredients used: " + response.matches[0].ingredients);
          // var recipeFlavors = $("<ul>").text("Bitterness: " + response.matches[0].flavors.bitter);
          $("#recipe").append(recipeName, recipeImage, recipeIngredients, recipeFlavors);
      });
    };

    // function getIngredients() {
    //     var newNewUrl = newQueryURL;
    //     $.ajax({
    //         url: newNewUrl,
    //         method: "GET",
    //         dataType: "json",
    //     }).done(function(response) {
    //
    //     })
    // };

    //
    //
    // function getRestaurant() {
    //     var newURL2 = yelpURL + yelp + limit;
    //
    //     $.ajax({
    //         url: yelpURL,
    //         method: "GET",
    //         dataType: "json",
    //         headers: {'Authorization':+ "Bearer UekWtwsdSdChv7BPj0qe5Koex2GpQ_eO4MkJJIJYyPst0QClEqU5szdU60hG5Vav-qMNnEATvZBHF2z7txq0P6wSAAafOWzLqT2EJrm0I8yRhXPEDXAON_XWAVVeWnYx"}
    //     })
    //     .done(function(data) {
    //         console.log(data);
    //         console.log(newURL2);
    //     });
    // };
