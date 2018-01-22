
// var config = {
// 	apiKey: "AIzaSyAbveEsJJYzFrleIyMUl-hV9ilXMpuYurg",
// 	authDomain: "food-project-1fdbb.firebaseapp.com",
// 	databaseURL: "https://food-project-1fdbb.firebaseio.com",
// 	projectId: "food-project-1fdbb",
// 	storageBucket: "food-project-1fdbb.appspot.com",
// 	messagingSenderId: "389102904783"
//   };
// 	firebase.initializeApp(config);
// 	var database = firebase.database();



$("#sign_in_btn").click(function() {
	window.location.href="./existing.html";
});



$("#sign_up_btn").click(function() {
	window.location.href="./new.html";
	userEmail = $("#input_email").val().trim();
    userPassword = $("#input_password").val().trim();
    var auth = firebase.auth();


    auth.signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      var errorCode  = error.code;
      var errorMessage = error.message;
      console.log("Error Message: " + errorMessage);
	});
});
