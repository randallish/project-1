// initialize firebase
var config = {
  apiKey: "AIzaSyAbveEsJJYzFrleIyMUl-hV9ilXMpuYurg",
  authDomain: "food-project-1fdbb.firebaseapp.com",
  databaseURL: "https://food-project-1fdbb.firebaseio.com",
  projectId: "food-project-1fdbb",
  storageBucket: "food-project-1fdbb.appspot.com",
  messagingSenderId: "389102904783"
};
  firebase.initializeApp(config);


// global variables
  var database = firebase.database();
  var search = '';
  var zomatoSearch = '';
  var zomatoKey = "0773a4de72d921649a1fca4f24d04bce";

  // email/password variables
  var userEmail = "";
  var userPassword = "";
  var confirmPassword = "";

  // sign up function for firebase authentication
  $("#sign_up_btn2").on("click",function(event){
    event.preventDefault();
    userEmail = $("#input_email").val().trim();
    userPassword = $("#input_password").val().trim();
    confirmPassword = $("#confirm_password").val().trim();
    var auth = firebase.auth();

    // creating a new user with firebase method
    auth.createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // handling of any errors being processed
      var errorCode  = error.code;
      var errorMessage = error.message;
      console.log("Error Message: " + errorMessage);
      console.log("Error code: " + errorCode);

      // calling for password/email validation
      userValidation();
      window.location.href= "./home.html";
    })
});
//parallax
$('.parallax').parallax();

$("#login_btn2").on("click",function(event){
    event.preventDefault();
    userEmail = $("#input_email").val().trim();
    userPassword = $("#input_password").val().trim();

    var auth = firebase.auth();
    // signing in a registered user
    auth.signInWithEmailAndPassword(userEmail, userPassword).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Problem: " + errorCode + " Message: " +errorMessage);
	}).then(function(success){
        console.log("Logged In", success);
        userValidation();
        window.location.href="./home.html";
    });
});

// signing out a user
$("#signout-button").on("click",function() {

    // confirming signout with a modal
    $("#modal1").modal();

    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });

});


// checking password and email restrictions
function userValidation() {

    if (userPassword.length <= 7) {
        $("#password-warning").text("Password must contain at least 8 characters").css("color", "red");
        $("#input_password").focus();
        return false;
    }
    if(userPassword != confirmPassword) {
        $("#confirm-warning").text("Passwords do not match. Try again").css("color","red");
        $("#confirm_password").focus();
        $("#password-warning").hide();
        return false;
    }
    if (confirmPassword.length == 0) {
        $("#confirm-warning").text("Please re-type your password").css("color","red");
        $("#confirm-password").focus();
        return false;
    }
    if(userEmail.length == 0) {
        $("#email-warning"),text("Please input a valid email").css("color","red");
        $("input_email").focus();
        return false;
    }
    else{
        return true;
    };
    };

// on click function
$("#search").on("click",function(event) {
    event.preventDefault();
    // storing the search input
    search = $("#search-input").val().trim();
    // resetting input to blank value
    $("#search-input").val('');

    // calling ajax
    getRecipe();
    // getVideo();
});


function getRecipe() {
    var foodURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=3&tags=" + search;

    console.log(foodURL);
    $.ajax({
        url:foodURL,
        method: "GET",
        dataType: "json",
        headers: {"X-Mashape-Key":"Dt9Xg2tPUSmsh9L4MxBy6vXKq18Zp1Eb87fjsnLLIYrk0DnUBv"}
      })
      .done(function(response) {
        //   var recipe = response.recipes;
        //   var randomRecipe = recipe[Math.floor(Math.random() * recipe.length)];
        //   console.log(randomRecipe);

          var recipeFrame1 = $("<iframe>").attr("src", response.recipes[0].spoonacularSourceUrl);
          var recipeFrame2 = $("<iframe>").attr("src", response.recipes[1].spoonacularSourceUrl);
          var recipeFrame3 = $("<iframe>").attr("src", response.recipes[2].spoonacularSourceUrl);
          $("#option1").html(recipeFrame1);
          $("#option2").html(recipeFrame2);
          $("#option3").html(recipeFrame3);
      });
    };



$("#zomato-search").on("click",function(event) {
    event.preventDefault();
    zomatoSearch = $("#zomato-input").val().trim();
    getZomato();
    $("#zomato-input").val('');
});



function getZomato() {
    var zomatoURL = "https://developers.zomato.com/api/v2.1/search?q=" + zomatoSearch;
    $.ajax({
        url:zomatoURL,
        method: "GET",
        dataType: "json",
        headers: {"user-key": zomatoKey}
    })
    .done(function(response){
        console.log(response);
        // console.log(zomatoURL);
        for (i=0; i<7; i++) {
        // code under this comment will make thumnails appear, but most restaurants do not have images.
        // $('#zomatolist').append("<img src=" + response.restaurants[i].restaurant.thumb + "></img>");
        $("#zomatolist").append(response.restaurants[i].restaurant.name + "<br>");
        $('#zomatolist').append(response.restaurants[i].restaurant.location.address + "<br>");
        $('#zomatolist').append(response.restaurants[i].restaurant.location.city + "<br>");
        $('#zomatolist').append(response.restaurants[i].restaurant.location.zipcode + "<br>");
        // creating a button to link to menu of restauant.
        // $('#zomatolist').append('<input type="button" class="menubuttons" value="View Menu" src='+ response.restaurants[i].restaurant.menu_url +'>' + "<hr>");
        }
    });
};



// function getVideo() {
//     var videoURL="https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/videos/search?query=" + search;
//     $.ajax({
//         url:videoURL,
//         method: "GET",
//         dataType: "json",
//         headers: {"X-Mashape-Key":"Dt9Xg2tPUSmsh9L4MxBy6vXKq18Zp1Eb87fjsnLLIYrk0DnUBv"}
//     })
//     .done(function(response) {
//         console.log(response.videos);
//         var youtube = "https://www.youtube.com/embed/" + response.videos[4].youTubeId;
//         console.log(youtube);
//         var video1 = $("<iframe>").attr("src", youtube);
//         $("#video").append(video1);
//     });

// };

function hideButtons() {
    $("#zomato-search").hide();
    $("zomato-input").hide();
    $("#search").hide();
    $("#search-input").hide();
}
