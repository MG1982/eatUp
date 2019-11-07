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
  // END CHOICE (RECIPE)
  $(".recipe").on("click", function() {
    console.log(this);
    console.log("recipe selected click works!");
    // JQUERY NEEDED TO ADD 4 RANDOM CHOICES FROM API (titles 0,1,2+3)
    $("#first-option").modal("hide");
    $("#second-option").modal("show");
  });
  // END CHOICE (RESTAURANT)
  $(".restaurant").on("click", function() {
    console.log("restaurant selected click works!");
    // JQUERY NEEDED TO ADD RANDOM CHOICES FROM API (titles 0,1,2+3)
    $("#first-option").modal("hide");
    $("#second-option").modal("show");
    console.log(this);
  });
  // FIRST CHOICE FROM 4 RANDOM OPTIONS
  $(".first-choice").on("click", function() {
    console.log("first choice click works!");
    // SWITCH CLASSES AND APPEND TO SECOND CHOICE MODAL
    $(this)
      .attr("id", "user-choice-img")
      .removeClass("first-choice")
      .addClass("second-choice");
    console.log(this);
    $(".user-choice").prepend(this);
    // JQUERY NEEDED TO ADD 3 RANDOM CHOICES FROM API TO THE SECOND CHOICE MODAL (titles 4,5+6)
    $("#second-option").modal("hide");
    $("#third-option").modal("show");
  });

  // SECOND CHOICE FROM 4 RANDOM OPTIONS
  $(".second-choice").on("click", function() {
    console.log("second choice click works!");
    // SWITCH CLASSES AND APPEND TO END RESULT MODAL
    $(this)
      .removeClass("second-choice")
      .addClass("end-result");
    $("#third-option").modal("hide");
    $(".show-img").prepend(this);
    $("#end-result").modal("show");
    console.log(this);
  });
});

//onclick restaurant
// //onclick recipe

//
