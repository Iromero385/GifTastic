var topics =["Friends", "Fresh Prince", "Charmed", "Buffy The Vampire Slayer"]
var initializingButtons = function(){
  $("#buttonArea").empty();
    for(key in topics){
      debugger;
      var newBotton = $("<button>")
      newBotton.attr("class","btn btn-success p-1 m-1 gifButton")
      newBotton.attr("data-tag",topics[key]);
      newBotton.text(topics[key]);
      
      $("#buttonArea").append(newBotton);
    }
  }   
initializingButtons();
  $(document).on("click",".gifButton", function() {
      var newTag = $(this).attr("data-tag")
      // Storing our giphy API URL for a random cat image
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newTag + "&api_key=1XnieqPzGYUSuP5YhR6gY2Suzx8kh4iw&limit=10";
      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {     
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
            $("#images").prepend(newImage);
            $("#images").prepend("<h3 text-info>"+"Rating: "+rated+"</h3>");
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
  });
  
  $("#addTag").on("click", function(event){
    event.preventDefault();
    var newTopic = $("#newTag").val().trim();
    topics.push(newTopic);
    $("#newTag").val("")
    initializingButtons();
  });