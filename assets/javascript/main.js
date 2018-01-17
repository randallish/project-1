
// global variables
var apiKey = "a5c09d2dbe71875e792a7dbe0771b30f&rId=";
var queryURL = "http://food2fork.com/api/get?key=";
var input = [];
var count = "&count=1";

var yelpKey = "UekWtwsdSdChv7BPj0qe5Koex2GpQ_eO4MkJJIJYyPst0QClEqU5szdU60hG5Vav-qMNnEATvZBHF2z7txq0P6wSAAafOWzLqT2EJrm0I8yRhXPEDXAON_XWAVVeWnYx";
var yelpURL = "https://api.yelp.com/v3/businesses/search?location=";
var limit = "&limit=10";
var yelp = [];

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


$("#yelp-search").on("click",function(event) {
    event.preventDefault();
    var yelpSearch = $("#yelp-input").val().trim();
    yelp.push(yelpSearch);
    console.log(yelp);
    getRestaurant();

});


function getRecipe() {
    var newURL = queryURL + apiKey + input + count;

    $.ajax({
        url:newURL,
        method: "GET",
        dataType: "json",
      })
      .done(function(response) {
          console.log(newURL);
          console.log(response);
          console.log(response.recipe[0]);

          var recipeTitle = $("<h1>").text(response.recipe.title);
          var recipeLink = $("<a>").attr("href", response.recipe.f2f_url).append(recipeTitle);
          var recipeImage = $("<img>").attr("src", response.recipe.image_url);
          var ingredients = $("<ol>").text(response.recipe.ingredients);

          $("#recipe").append(recipeLink, recipeImage,ingredients);
      });
    };


    function getRestaurant() {
        var newURL2 = yelpURL + yelp + limit;

        $.ajax({
            url: yelpURL,
            method: "GET",
            dataType: "json",
            headers: {'Authorization':+ "Bearer UekWtwsdSdChv7BPj0qe5Koex2GpQ_eO4MkJJIJYyPst0QClEqU5szdU60hG5Vav-qMNnEATvZBHF2z7txq0P6wSAAafOWzLqT2EJrm0I8yRhXPEDXAON_XWAVVeWnYx"}
        })
        .done(function(data) {
            console.log(data);
            console.log(newURL2);
        });
    };