// Initialize Firebase
var config = {
    apiKey: "***REMOVED***",
    authDomain: "find-my-spot-philly.firebaseapp.com",
    databaseURL: "https://find-my-spot-philly.firebaseio.com",
    projectId: "find-my-spot-philly",
    storageBucket: "",
    messagingSenderId: "***REMOVED***"
};

firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

$(document).ready(function () {
    //this initializes a global object called "neighborhoods"
    // use:
    // neighborhoods.list[0].value()
    loadData();


    console.log(neighborhoods);

});
var neighborhoods;

function loadData() {
    // Only needs to run once on load.
    var queryurl = "assets/data/neighborhoods-list.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function (jsonData) {
        //puts the data in our global space
        window.neighborhoods = jsonData;
    });

}

// Initial Values 
var firstVar = "";

// Whenever a user clicks the submit-bid button
$("#findIncome").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    window.location.replace("Results2.html?name="+ $("#exampleInput1").val())
    // console.log("Results.html?name="+ $("#exampleInput1").val())

    //****window.location.href

    // // // Get the input values
    // // employeeRate = parseInt($("#employee-rate").val());
    // // employeeName = $("#employee-name").val();

    // firstVar = $("#employee-name").val();

    // // if (employeeRate > highrate) {
    // // Save the new employee in Firebase
    // database.ref().push({
    //     myVar: firstVar,
    //     created: firebase.database.ServerValue.TIMESTAMP

    // })

    // } else {
    //     // Alert
    //     alert("Sorry that bid is too low. Try again.");
    // }

});

$("#results-page").ready(function () {
    var link = window.location.href;
    var url = new URL(link);
    var c = url.searchParams.get("Income");
    console.log(c);

    var button = $("<button>").text("Query Income").addClass("btn btn-primary btn-block");
    button.on("click", function () {

        var hoodsRef = database.ref("Philly").child("hoods");
        var startIncome = "Income" - 5000
        var endIncome = "Income" + 5000

        window.NeighborResults = [];

        hoodsRef.orderByChild("median-income").startAt(startIncome).endAt(endIncome).on("child_added", function (snapshot) {
            window.NeighborResults.push(snapshot.val());
        });

        console.log(NeighborResults);

    });
});

    $("#package").on("click", function (event) {
        // Prevent form from submitting
        event.preventDefault();
        var geoName = "PENNYPACK_PARK"; 
        window.location.replace("Details.html?package=" + geoName);
        
       

    });