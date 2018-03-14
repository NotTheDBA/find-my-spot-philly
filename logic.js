// Initialize Firebase
var config = {

};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

// Assign the reference to the database to a variable named 'database'
// var database = ...


// Initial Values
var initialBid = 0;
var initialemployee = "No one :-(";
var highrate = initialBid;
var highemployee = initialemployee;
var employeerate
    // --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

        // Change this to find the most recent added record
        if (snapshot.child("highemployee").exists() && snapshot.child("highrate").exists()) {

            // Set the variables for highemployee/highrate equal to the stored values in firebase.

            // Change the HTML to reflect the stored values
            $("#recent-employee").text(highemployee);


        }

        // Else Firebase doesn't have a highrate/highemployee, so use the initial local values.
        else {

            // Change the HTML to reflect the initial values
            $("#recent-employee").text(initialBid);
            $("#recent-rate").text(initialemployee);

        }


        // If any errors are experienced, log them to console.
    },
    function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get the input values
    employeerate = parseInt($("#employee-rate").val());
    employeeName = $("#employee-name").val();


    if (employeerate > highrate) {

        // Save the new rate in Firebase
        database.ref().set({
            highrate: employeerate,
            highemployee: employeeName
        })

        // Store the new high rate and employee name as a local variable
        highrate = employeerate
        highemployee = employeeName


        // Change the HTML to reflect the new high rate and employee
        $("#recent-employee").text(highemployee);
        $("#recent-rate").text(highrate);

    } else {
        // Alert
        alert("Sorry that bid is too low. Try again.");
    }

});