
// global variables
var apiKey = "a5c09d2dbe71875e792a7dbe0771b30f&q=";
var queryURL = "http://food2fork.com/api/search?key=";
var input = [];
var count = "&count=1";

var yelpKey = "UekWtwsdSdChv7BPj0qe5Koex2GpQ_eO4MkJJIJYyPst0QClEqU5szdU60hG5Vav-qMNnEATvZBHF2z7txq0P6wSAAafOWzLqT2EJrm0I8yRhXPEDXAON_XWAVVeWnYx"
var yelpURL = "https://api.yelp.com/v3/businesses/search?key=";
var limit = "&limit=10";

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
    var newURL = queryURL + apiKey + input + count;

    $.ajax({
        url:newURL,
        method: "GET",
        dataType: "json",
      })
      .done(function(response) {
          console.log(newURL);
          console.log(response);
          console.log(response.recipes[0]);

          var recipeTitle = $("<h1>").text(response.recipes[0].title);
          var recipeLink = $("<a>").attr("href", response.recipes[0].f2f_url).append(recipeTitle);
          var recipeImage = $("<img>").attr("src", response.recipes[0].image_url);

          $("#recipe").append(recipeLink, recipeImage);
      });
    };


    function getRestaurant() {
        var newURL2 = yelpURL + yelpKey + input + limit;

        $.ajax({
            url: yelpURL,
            method: "GET",
            Authorization: "Bearer<yelpKey>"
        })
        .done(function(data) {
            console.log(data);
            console.log(newURL2);
        });
    };