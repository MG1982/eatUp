$(document).ready(function() {
  // https://www.food2fork.com/api/search?key=328e7ee2a4092e96d84cefb806a0f42c&q=chicken

  let apiKey = "328e7ee2a4092e96d84cefb806a0f42c";
  let query = "chicken";
  var queryURL =
    "https://www.food2fork.com/api/search?key=" + apiKey + "&q=" + query;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    r = JSON.parse(response);
    console.log(r);
    console.log(r.recipes);
    console.log(r.recipes[0].title);

    // function tableCreator() {
    //     table = $('<table>');
    //     row = $('<tr>');
    //     cell = $('<td>');

    // }

    for (i = 1; i < 5; i++) {
      var meal = $("<div>");
      meal.attr("id", "image" + i);

      // grab the well section and append to it
      $(".images").append(meal);
    }
    imageTitle("#image1", r.recipes[0].image_url, r.recipes[0].social_rank);
    imageTitle("#image2", r.recipes[1].image_url, r.recipes[1].social_rank);
    imageTitle("#image3", r.recipes[2].image_url, r.recipes[2].social_rank);
    imageTitle("#image4", r.recipes[3].image_url, r.recipes[3].social_rank);
  });

  function imageTitle(element, image, rating) {
    $(element).html("<img src=" + image + ">");
    $(element).append("Recipe rating: " + rating);
  }

  function finalMeal() {}

  // Modal click functions

  $("#get-started").on("click", function() {
    $("get-started").hide();
  });

  $("#end-choice").on("click", function() {
    console.log("click works!");
    $("#first-option").modal("hide");
    $("#second-option").modal("show");
  });
});
// MODAL OPTIONS
//...

//onclick restaurant
//onclick recipe
