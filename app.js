const config = {
    apiKey: "AIzaSyDYFFFsnjD8t12velnNKQJf_cV90-yPCWU",
    authDomain: "service-storage-14ac1.firebaseapp.com",
    databaseURL: "https://service-storage-14ac1.firebaseio.com",
    projectId: "service-storage-14ac1",
    storageBucket: "service-storage-14ac1.appspot.com",
    messagingSenderId: "304859561030",
    appId: "1:304859561030:web:ca33d79aa66cfaafd9de47"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart =$("#first-train-input").val().trim()
    var trainFreq = $("#frequency-input").val().trim();

    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      frequency: trainFreq,
      nextArrival: nextTrain,
      minsAway: tMinutesTillTrain
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.nextArrival);
    console.log(newTrain.minsAway);
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFreq = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().nextArrival;
    var minsAway = childSnapshot.val().minsAway;
  
    // Employee Info
    console.log(trainName);
    console.log(trainRole);
    console.log(trainStart);
    console.log(trainRate);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(nextTrain),
      $("<td>").text(minsAway),
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  

  