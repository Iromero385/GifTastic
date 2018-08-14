  var topics =["Friends", "Fresh Prince", "Charmed", "Buffy The Vampire Slayer"]
  var initializingButtons = function(){
    $("#buttonArea").empty();
    for(key in topics){
      var newBotton = $("<button>")
      newBotton.attr("class","btn btn-success p-1 m-1 gifButton")
      newBotton.attr("data-tag",topics[key]);
      newBotton.text(topics[key]);
      $("#buttonArea").append(newBotton);
    }
  }
  initializingButtons();
  $(".gifButton").on("click", function(event) {
    debugger;
      var newTag = $(this).attr("data-tag")
      // Storing our giphy API URL for a random cat image
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newTag + "&api_key=1XnieqPzGYUSuP5YhR6gY2Suzx8kh4iw&limit=10";
      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
  
      // After the data from the AJAX request comes back
        .then(function(response) {
          console.log(response);
        
          for(var i = 0; i < 10 ; i++){
            var stillUrl = response.data[i].images.fixed_height_still.url;
            var moveUrl = response.data[i].images.fixed_height.url;
            var rated = response.data[i].rating
  
            // Creating and storing an image tag
            var newImage = $("<img class='img-responsive clickBait' style='height: 300px;'>");
  
            // Setting the catImage src attribute to imageUrl
            newImage.attr("src", stillUrl);
            newImage.attr("data-still", stillUrl);
            newImage.attr("data-animate", moveUrl);
            newImage.attr('data-state', "still");
           
  
            // Prepending the catImage to the images div
            $("#images").prepend(rated);
            $("#images").prepend(newImage);
          }
        });
    });
  
    $(document).on('click', '.clickBait', function(){
      var state = $(this).attr('data-state');
      var moving = $(this).attr('data-animate');
      var still = $(this).attr('data-still');
  
      if(state === "still"){
        $(this).attr('src', moving);
        $(this).attr('data-state', 'animate');
      }
      else{
        $(this).attr('src', still);
        $(this).attr('data-state', 'still');
      }
    })
  
  $("#addTag").on("click", function(event){
    event.preventDefault();
    var newTopic = $("#newTag").val().trim();
    $("#newTag").val("")
    topics.push(newTopic);
    initializingButtons();

    // var newBotton = $("<button>")
    // newBotton.attr("class","btn btn-success p-1 m-1 gifButton")
    // var textLabel = $("#newTag").val();
    // newBotton.text(textLabel);
    // $("#buttonArea").append(newBotton);
    // $("#newTag").val("");
  
  
  
  })
  


