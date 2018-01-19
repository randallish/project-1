
// global variables
// var apiKey = "a5c09d2dbe71875e792a7dbe0771b30f&rId=";
// var queryURL = "http://food2fork.com/api/get?key=";


var yelpURL = "https://api.yelp.com/v3/businesses/search?api-key=UekWtwsdSdChv7BPj0qe5Koex2GpQ_eO4MkJJIJYyPst0QClEqU5szdU60hG5Vav-qMNnEATvZBHF2z7txq0P6wSAAafOWzLqT2EJrm0I8yRhXPEDXAON_XWAVVeWnYx&location=";
var yelp = []

var input = [];
var count = "&count=1";


$("#search").on("click",function(event) {
    event.preventDefault();
    // storing the search input
    var search = $("#search-input").val().trim();
    input.push(search);
    console.log(input);
    // resetting input to blank value
    $("#search-input").val('');

    // calling ajax
    // getRecipe();
    
    // removing element from array after its searched
    input.splice(0,1);
    console.log(input);
});


$("#yelp-search").on("click",function(event) {
    event.preventDefault();
    var yelpSearch = $("#yelp-input").val().trim();
    yelp.push(yelpSearch);
    console.log(yelp);
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
                console.log(rating);
                console.log(price);
                console.log(name);
                console.log(location);

                image.attr("src", data[i].image_url);

                yelpDiv.append(name,image,rating,price,location);
                $("#yelp-images").append(yelpDiv);
            }
        });
    }