
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
  var apiKey = "a5c09d2dbe71875e792a7dbe0771b30f&q=";
  var queryURL = "http://food2fork.com/api/search?key=";
  var count = "&count=30";
  var search = '';
  var zomatoSearch = '';
  var zomatoKey = "0773a4de72d921649a1fca4f24d04bce";

  // email/password variables
  var userEmail = "";
  var userPassword = "";
  var confirmPassword = "";

  $("#dropdown_menu").hide();

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

    })
});


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

        if (userEmail){
        window.location.href="./index.html";
        }
        else {
            return false;
        }
    });
    $("#user-name").append(userEmail);

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
        window.location.href= './index.html';
        return true;
    };
    };

// on click function
$("#search").on("click",function(event) {
  
  $("#dropdown_menu").show();

    event.preventDefault();
    // storing the search input
    search = $("#search-input").val().trim();
    // resetting input to blank value
    $("#search-input").val('');

    // calling ajax
    getRecipe();
    // removing element from array after its searched
});


function getRecipe() {
    var newURL = queryURL + apiKey + search + count;
    $.ajax({
        url:newURL,
        method: "GET",
        dataType: "json"
      })
      .done(function(response) {
          var recipe = response.recipes;
          var randomRecipe = recipe[Math.floor(Math.random() * recipe.length)];
          console.log(randomRecipe)
          for (i=0; i<3; i++) {
              var recipeTitle = $("<h1>").text(response.recipes[i].title);
              var recipeLink = $("<a>").attr("href", response.recipes[i].f2f_url).append(recipeTitle);
              var recipeImage = $("<img>").attr("src", response.recipes[i].image_url).addClass("image_result");
              var ingredients = $("<ol>").text(response.recipes[i].ingredients);
              var recipeFrame = $("<iframe>").attr("src", response.recipes[i].source_url);
              $("#recipe").append(recipeTitle, recipeLink, recipeImage, ingredients, recipeFrame);
              console.log(response);
          }
      });
    };



$("#zomato-search").on("click",function(event) {
    event.preventDefault();
    zomatoSearch = $("#zomato-input").val().trim();
    getZomato();
    $("#zomato-input").val('');
    hideButtons();
});



function getZomato() {
    var zomatoURL = "https://developers.zomato.com/api/v2.1/search?q=" + zomatoSearch;
    $.ajax({
        url:zomatoURL,
        method: "GET",
        dataType: "json",
        headers: {"user-key": zomatoKey},
    })
    .done(function(response){
        console.log(response);
        console.log(zomatoURL);
    });
};

function hideButtons() {
    $("#zomato-search").hide();
    $("zomato-input").hide();
    $("#search").hide();
    $("#search-input").hide();
}