      // Initial array of topics
      var topics = ["dog", "cat", "lion", "tiger", "bear", "eagle", "parakeet", "parrot", "alligator", "zebra"];
      // Function for displaying topic data
            function displayTopicInfo() {

        $("#gifContainer").empty();
        //Empties the container of previously searched gifs if any.

        var gifTopic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Creates AJAX call for the specific topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(queryURL);
          console.log(response);

          for(i=0; i<10; i++){

 

          // Saving the image url property

          var gifdiv = $("<div>");
          gifdiv.attr("class", "gifImages")
          var stillimageurl = response.data[i].images.fixed_width_still.url;
          var movingimageurl = response.data[i].images.fixed_width.url;
          var ratingUrl = response.data[i].rating;
          // Creating and storing an image tag
          var topicImage = $("<img>");
          // Setting the topic image attributes
          topicImage.attr("src", stillimageurl);
          topicImage.attr("movingimageurl", movingimageurl);
          topicImage.attr("stillimageurl", stillimageurl);
          topicImage.attr("class", "gif");
          topicImage.attr("data-state", "still");

          gifdiv.append(topicImage);
          var gifRating = $("<div>GIF Rating: " + response.data[i].rating + "</div>");
          gifRating.attr("class", "ratings");
          gifdiv.append(gifRating);
          //note about the gifRating, the hwDemo picture shows the ratings on top of the images, but the instructions say to display the rating under every gif, so I went with the instructions.
          $("#gifContainer").prepend(gifdiv);

        }
          // Creates an element to hold the gifs
          // Appends the gif
        });
      }
      function renderButtons() {
        $("#buttonsMain").empty();
        // Delete the content inside the topic buttons div prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        for (var i = 0; i < topics.length; i++) {
          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of topicButtons to our button
          a.addClass("topicButtons");

          //Pulls in the bootstrap button qualities
          a.addClass("btn btn-primary");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttonsMain").append(a);
        }
        // Loop through the array of topics, then generate buttons for each topic in the array

      }
      // This function handles events where the add a topic button is clicked
      function addATopic() {
      $("#addTopic").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();
        console.log("Add a topic was run");
        var newTopic = $("#topicInput").val().trim();

        topics.push(newTopic);
        // The renderButtons function is called, rendering the list of topic buttons
        renderButtons();
      });        
    }
      function animateGifs() {
      
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("movingimageurl"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("stillimageurl"));
        $(this).attr("data-state", "still");
      }
      }
      $(document).on("click", ".topicButtons", displayTopicInfo);

      $(document).on("click", ".gif", animateGifs);
      // Calling the renderButtons function to display the initial list of movies
      $(document).ready(function(){

      animateGifs();
      renderButtons();
      addATopic();

});

