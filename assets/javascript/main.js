

var config = {
  apiKey: "AIzaSyAbveEsJJYzFrleIyMUl-hV9ilXMpuYurg",
  authDomain: "food-project-1fdbb.firebaseapp.com",
  databaseURL: "https://food-project-1fdbb.firebaseio.com",
  projectId: "food-project-1fdbb",
  storageBucket: "food-project-1fdbb.appspot.com",
  messagingSenderId: "389102904783"
};
  firebase.initializeApp(config);


var database = firebase.database();
var apiKey = "a5c09d2dbe71875e792a7dbe0771b30f&q=";
var queryURL = "http://food2fork.com/api/search?key=";
var input = [];
var count = "&count=3";



  $("#login_in_btn2").on("click",function(event){
    var userEmail = $("#input_email").val().trim();
    var userPassword = $("#input_password").val().trim();
    var auth = firebase.auth();


    auth.signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      var errorCode  = error.code;
      var errorMessage = error.message;
      console.log("Error Message: " + errorMessage);



    });
  });

$("#search").on("click",function(event) {
    event.preventDefault();
    // storing the search input
    var search = $("#search-input").val().trim();
    input.push(search);
    console.log(input);
    // resetting input to blank value
    $("#search-input").val('');

    console.log(input);
});


// $("#yelp-search").on("click",function(event) {
//     event.preventDefault();
//     var yelpSearch = $("#yelp-input").val().trim();
//     getYelp(yelpSearch);
//     $("#yelp-input").val('');
//     hideButtons();
// });

// function hideButtons() {
//     $("#yelp-search").hide();
//     $("#yelp-input").hide();
//     $("#search").hide();
//     $("#search-input").hide();
// }

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

   