

var config = {
  apiKey: "AIzaSyAbveEsJJYzFrleIyMUl-hV9ilXMpuYurg",
  authDomain: "food-project-1fdbb.firebaseapp.com",
  databaseURL: "https://food-project-1fdbb.firebaseio.com",
  projectId: "food-project-1fdbb",
  storageBucket: "food-project-1fdbb.appspot.com",
  messagingSenderId: "389102904783"
};
  firebase.initializeApp(config);

  var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
    callbacks: {
      signInSuccess: function(currentUser, credential, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
  };


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


    function getYelp(searchTerm) {
        // var yelpApi = yelpURL + yelp;
        var queryObj = {
            url: 'http://localhost:3000/api/yelp?location=' + searchTerm.split(' ').join('+'),
            method: 'GET',
            dataType: 'json'
        }
        console.log(queryObj);
        $.ajax(queryObj)
          .done(function(response) {
            console.log(response);
            console.log(response.businesses);
            var data = response.businesses;

            for (var i = 15; i < data.length; i++) {
                var yelpDiv = $("<div>");
                var image = $("<img>");
                var price = data[i].price;
                var rating = data[i].rating;
                var name = data[i].name;
                var location = data[i].location.address1;
                var distance = data[i].distance;
                console.log(rating);
                console.log(price);
                console.log(name);
                console.log(location);
                console.log(distance);

                image.attr("src", data[i].image_url);

                yelpDiv.append(name,image,rating,price,location,distance);
                $("#yelp-images").append(yelpDiv);
            }
        });
    }
    ui.start('#firebaseui-auth-container', uiConfig);

