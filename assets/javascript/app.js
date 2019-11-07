$(document).ready(function() {
  // https://www.food2fork.com/api/search?key=328e7ee2a4092e96d84cefb806a0f42c&q=chicken

  //let apiKey = "328e7ee2a4092e96d84cefb806a0f42c";
  let apiKey = "695d18000643e99343927f8c94c14c06";
  let query = "chicken";
  var queryURL =
    "https://www.food2fork.com/api/search?key=" + apiKey + "&q=" + query;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    r = JSON.parse(response);
    recipes = r.recipes;
   // console.log(r);
    //console.log(r.recipes);
   // console.log(r.recipes[0].title);

    // function tableCreator() {
    //     table = $('<table>');
    //     row = $('<tr>');
    //     cell = $('<td>');

    // }

    var dish = '';

    for (let i = 0; i < 4; i++) {
      console.log('1',i); 
      dish = randomdish();
      //console.log(dish);
      console.log('2',i);
      $("#option" + i).attr("src",dish.image_url); 
      console.log('3',i);
    }
    
  });

/*   function imageTitle(element, image, rating) {
    $(element).html("<img src=" + image + ">");
    $(element).append("Recipe rating: " + rating);
  } */

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


//To pick a dish randomly
function randomdish() {
  console.log('hehe');
  var randomnum =  Math.floor(Math.random() * 31);
  console.log('hehe2');
   randomdish2 = recipes[randomnum];
  console.log(randomdish2);
   return (randomdish2)
}

//onclick restaurant
// //onclick recipe

//
