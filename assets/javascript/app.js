$(document).ready(function() {
  $("#results").hide();
  $("#intro").show();
  $("#get-started").show();

  let time1;
  let time2;
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

  $("#get-started").on("click", function() {
    $(this).hide();
  });

  // start over click function
  $("#start-over").on("click", function() {
    $("#results").hide();
    $("#intro").show();
    $("#get-started").show();
  });

  // Modal click functions
  $("#first-option").on("shown.bs.modal", function() {
    $("#intro").hide();
    $("#results").hide();

    // END CHOICE (RECIPE)
    $(".recipe").on("click", function() {
      // console.log(this);
      // console.log("recipe selected click works!");
      // JQUERY NEEDED TO ADD 4 RANDOM CHOICES FROM API (titles 0,1,2+3)
      $("#first-option").modal("hide");
      $("#second-option").modal("show");
    });

    // END CHOICE (RESTAURANT)
    $(".restaurant").on("click", function() {
      $("#first-option").modal("hide");
      $("#second-option").modal("show");
      // console.log("restaurant selected click works!");
      // console.log(this);
    });
  });

  // FIRST CHOICE FROM 4 RANDOM OPTIONS
  $("#second-option").on("shown.bs.modal", function() {
    timer1();
    if ($("#second-option").is(":visible")) {
      $(".first-choice").on("click", function() {
        clearInterval(time1);
        answered = false;
        // SWITCH CLASSES AND APPEND TO SECOND CHOICE MODAL
        $(this)
          .attr("id", "user-choice-img")
          .removeClass("first-choice")
          .addClass("second-choice");
        console.log("first choice click works!");
        console.log(this);
        $(".user-choice").prepend(this);
        // JQUERY NEEDED TO ADD 3 RANDOM CHOICES FROM API TO THE SECOND CHOICE MODAL (titles 4,5+6)
        $("#second-option").modal("hide");
        $("#third-option").modal("show");
      });
    } else {
      $(".first-choice").on("click", function() {
        return false;
      });
    }
  });
  $("#second-option").on("hidden.bs.modal", function() {
    clearInterval(time1);
  });

  // SECOND CHOICE FROM 4 RANDOM OPTIONS
  $("#third-option").on("shown.bs.modal", function() {
    timer2();

    if ($("#third-option").is(":visible")) {
      $(".second-choice").on("click", function() {
        clearInterval(time2);
        // SWITCH CLASSES AND APPEND TO END RESULT DIV
        $(this)
          .removeClass("second-choice")
          .addClass("end-result");
        $("#result").prepend(this);
        $("#third-option").modal("hide");
        console.log("second choice click works!");
        console.log(this);
      });
    } else {
      $(".second-choice").on("click", function() {
        return false;
      });
    }
    $("#third-option").on("hidden.bs.modal", function() {
      $("#results").show();
      clearInterval(time2);
    });
  });

  //TIMER FOR FIRST 4 MEALS SELECTION MODAL
  function timer1() {
    seconds = 10;
    $("#timer1").html("00:" + seconds);
    $("#timer1").html("00:" + seconds);
    time1 = setInterval(showTimer, 1000);
  } // starts/stops the countdown and handles the html display of the timer.
  function showTimer() {
    seconds--;
    if (seconds < 10) {
      $("#timer1").html("00:0" + seconds);
    } else {
      $("#timer1").html("00:" + seconds);
    }
    if (seconds < 1) {
      clearInterval(time1);
      //call a function that picks a random meal from array.
    }
  }
});
//TIMER FOR SECOND 4 MEALS SELECTION MODAL
function timer2() {
  seconds = 10;
  $("#timer2").html("00:" + seconds);
  $("#timer2").html("00:" + seconds);
  time2 = setInterval(showTimer, 1000);
} // starts/stops the countdown and handles the html display of the timer.
function showTimer() {
  seconds--;
  if (seconds < 10) {
    $("#timer2").html("00:0" + seconds);
  } else {
    $("#timer2").html("00:" + seconds);
  }
  if (seconds < 1) {
    clearInterval(time2);
    //call a function that picks a random meal from array.
  }
}

//onclick restaurant
// //onclick recipe

//
