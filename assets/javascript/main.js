// initialize firebase
var firebaseKey = config.FIREBASE_KEY;
var firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "food-project-1fdbb.firebaseapp.com",
  databaseURL: "https://food-project-1fdbb.firebaseio.com",
  projectId: "food-project-1fdbb",
  storageBucket: "food-project-1fdbb.appspot.com",
  messagingSenderId: "389102904783"
};
  firebase.initializeApp(firebaseConfig);



// not currently using, but for future advancements to store data
  var database = firebase.database();

  // global variables
  var search = '';
  var zomatoSearch = '';
  const zomatoKey = config.ZOMATO_KEY;
  const spoonacularKey = config.SPOONACULAR_KEY;

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

    // if it passes all conditionals
    if (userValidation()==true) {

    // creating a new user with firebase method
    auth.createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
       
     // handling of any errors being processed
      var errorCode  = error.code;
      var errorMessage = error.message;
      console.log("Error Message: " + errorMessage);
      console.log("Error code: " + errorCode);

      // user is created and taken to home page
      }).then(function(success){
      window.location.href= "./home.html";
      console.log("woohoo");
    });
    }
});
//materialize images
$('.parallax').parallax();


// signing up a new user
$("#login_btn2").on("click",function(event){
    event.preventDefault();
    userEmail = $("#input_email").val().trim();
    userPassword = $("#input_password").val().trim();
    var auth = firebase.auth();

    // signing in a registered user
    auth.signInWithEmailAndPassword(userEmail, userPassword).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        userValidation();
        console.log("Problem: " + errorCode + " Message: " +errorMessage);

        // no errors, login success
	}).then(function(success){
        console.log("Logged In Success: " + userEmail);
        window.location.href="./home.html";
    });
});

// checking state if a user is signed in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {

    // grabbing user name from the object
    email= user.email;
    console.log(email);
    $("#user-name").html(email).css("color", "red");
}
else {
    $("#user-name").hide();
}
});



// signing out a user
$("#logout").on("click",function() {
    firebase.auth().signOut().then(function(success) {
        console.log('Signed Out', success);
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
    if (userPassword.text == "") {
       $("#password-warning").text("Must Fill In Field").css("color", "red");
        $("#input_password").focus();
        return false;
    }
    if(userPassword != confirmPassword) {
        $("#confirm-warning").text("Passwords do not match. Try again").css("color","red");
        $("#confirm_password").focus();
        $("#password-warning").hide();
        return false;
    }
     if (userEmail.text == "") {
       $("#password-warning").text("Must Fill In Field").css("color", "red");
        $("#input_password").focus();
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

// on click for searching a recipe
$("#search").on("click",function(event) {
    event.preventDefault();

    // storing the search input
    search = $("#search-input").val().trim();

    // resetting input to blank value
    $("#search-input").val('');

    // calling ajax
    getRecipe();
});

// ajax for getting a random recipe
function getRecipe() {
    var foodURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=3&tags=" + search;

    console.log(foodURL);
    $.ajax({
        url:foodURL,
        method: "GET",
        dataType: "json",
        headers: {"X-Mashape-Key":spoonacularKey}
      })

      .done(function(response) {

        // appending to iframe
          var recipeFrame1 = $("<iframe>").attr("src", response.recipes[0].spoonacularSourceUrl);
          var recipeFrame2 = $("<iframe>").attr("src", response.recipes[1].spoonacularSourceUrl);
          var recipeFrame3 = $("<iframe>").attr("src", response.recipes[2].spoonacularSourceUrl);
          $("#option1").html(recipeFrame1);
          $("#option2").html(recipeFrame2);
          $("#option3").html(recipeFrame3);
      });
    };

    // getting a random food fact
function getRandomFact() {
    var factsURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random";
    $.ajax({
        url:factsURL,
        method: "GET",
        dataType: "json",
        headers: {"X-Mashape-Key":spoonacularKey}
      })
      .done(function(facts) {
          console.log(facts.text);
          $("#random-facts").append(facts.text);
      });
};

// calling our function and materialize
$("#menu").on("click",function(){
    getRandomFact();

    // emptying facts on each click
    $("#random-facts").empty();

    // materialize target
    $('.tap-target').tapTarget('open');
});

// 
$("#zomato-search").on("click",function(event) {
    event.preventDefault();
    zomatoSearch = $("#zomato-input").val().trim();
    getZomato();
    $("#zomato-input").val('');
});


// returns restaurants nearby
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
        $("#zomatolist").append(response.restaurants[i].restaurant.name + "<br>");
        $('#zomatolist').append(response.restaurants[i].restaurant.location.address + "<br><hr>");
        }
    });
};


function hideButtons() {
    $("#zomato-search").hide();
    $("zomato-input").hide();
    $("#search").hide();
    $("#search-input").hide();
}
