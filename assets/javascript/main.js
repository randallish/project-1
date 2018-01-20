

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
    console.log(input);
    // resetting input to blank value
    $("#search-input").val('');

    console.log(input);
});


$("#yelp-search").on("click",function(event) {
    event.preventDefault();
    var yelpSearch = $("#yelp-input").val().trim();
    getYelp(yelpSearch);
    $("#yelp-input").val('');
    hideButtons();
});

function hideButtons() {
    $("#yelp-search").hide();
    $("#yelp-input").hide();
    $("#search").hide();
    $("#search-input").hide();
}


   