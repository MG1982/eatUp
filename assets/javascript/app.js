// TIMER VARIABLES
let seconds;
let timeIntervalID;
//TIMER FOR MODALS
function startTimer(secs, callback) {
  seconds = secs;

  clearInterval(timeIntervalID);

  $(".timer").html(seconds);

  timeIntervalID = setInterval(function() {
    seconds--;
    if (seconds <= 0) {
      callback();
      clearInterval(timeIntervalID);
    }
    $(".timer").html(seconds);
  }, 1000);
}
//DOC READY FUNCTION
$(document).ready(function() {
  start();

  // https://www.food2fork.com/api/search?key=328e7ee2a4092e96d84cefb806a0f42c&q=chicken

  // let apiKey = "328e7ee2a4092e96d84cefb806a0f42c";
  // let apiKey = "15a561c6ad7e4fde1b7d89cb776dad5f"; //MANIS TEST KEY
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

    var dish = "";

    for (let i = 0; i < 4; i++) {
      // console.log("1", i);
      dish = randomdish();
      //console.log(dish);
      // console.log("2", i);
      $("#option" + i)
        .attr({ src: dish.image_url, data: dish.title })
        .addClass(dish.source_url);
      // console.log("3", i);
    }
  });

  //To pick a dish randomly
  function randomdish() {
    // console.log("hehe");
    var randomnum = Math.floor(Math.random() * 31);
    // console.log("hehe2");
    randomdish2 = recipes[randomnum];
    console.log(randomdish2);
    return randomdish2;
  }

  // resets lots of stuff
  function start() {
    let rOptions = $(".random-options");
    let rOptionsTwo = $(".random-options-two");
    let finalChoice = $("#final-choice");
    $("#results").hide();
    $("#intro").show();
    $("#get-started").show();
    rOptions.empty();
    rOptionsTwo.empty();
    finalChoice.empty();
    let reGenrOptions = $(
      "<div class='row'><div class='col'><div id='title0'></div><img src='assets/Images/Placeholder.png' class='first-choice' id='option0' height='200px' /></div><div class='col'><div id='title1'></div><img src='assets/Images/Placeholder.png' class='first-choice' id='option1' height='200px' /></div></div><div class='row'><div class='col'><div id='title2'></div><img src='assets/Images/Placeholder.png' class='first-choice' id='option2' height='200px' /></div><div class='col'><div id='title3'></div><img src='assets/Images/Placeholder.png' class='first-choice' id='option3' height='200px' /></div>"
    );
    let reGenrOptionsTwo = $(
      "<div class='row'><div class='col'><div id='user-choice-title'></div><div class='user-choice'></div></div><div class='col'><div id='title4'></div><img src='assets/Images/Placeholder.png' id='option4' class='second-choice' height='200px' /></div></div><div class='row'><div class='col'><div id='title5'></div><img src='assets/Images/Placeholder.png' id='option5' class='second-choice' height='200px' /></div><div class='col'><div id='title6'></div><img src='assets/Images/Placeholder.png' id='option6' class='second-choice' height='200px' /></div>"
    );

    reGenrOptions.appendTo(rOptions);
    reGenrOptionsTwo.appendTo(rOptionsTwo);
  }

  //Restart button for small close button on each Modal.
  $(".restart").on("click", function() {
    $("#results").hide();
    start();
    clearInterval(timeIntervalID);
  });

  //Hides the get started button after click
  $("#get-started").on("click", function() {
    $(this).hide();
  });

  // start over click function
  $("#start-over").on("click", function() {
    start();
    clearInterval(timeIntervalID);
    for (let i = 0; i < 4; i++) {
      // console.log("1", i);
      dish = randomdish();
      //console.log(dish);
      // console.log("2", i);
      $("#option" + i)
        .attr({ src: dish.image_url, data: dish.title })
        .addClass(dish.source_url);
      // console.log("3", i);
    }
  });
  // start over click function
  $("#start-over-two").on("click", function() {
    start();
    clearInterval(timeIntervalID);
    for (let i = 0; i < 4; i++) {
      // console.log("1", i);
      dish = randomdish();
      //console.log(dish);
      // console.log("2", i);
      $("#option" + i)
        .attr({ src: dish.image_url, data: dish.title })
        .addClass(dish.source_url);
      // console.log("3", i);
    }
  });

  // Modal click functions
  $("#first-option").on("shown.bs.modal", function() {
    $("#intro").hide();
    $("#results").hide();

    // END CHOICE (RECIPE)
    $(".recipe").on("click", function() {
      // console.log(this);
      // console.log("recipe selected click works!");
      $("#recipe-result").show();
      $("#nutrition-result").hide();
      $("#first-option").modal("hide");
      $("#second-option").modal("show");
    });

    $(".nut").on("click", function() {
      // console.log(this);
      console.log("nutrition table selected click works!");
      $("#recipe-result").hide();
      $("#nutrition-result").show();
      $("#first-option").modal("hide");
      $("#results").show();
    });

    // END CHOICE (RESTAURANT) COMING SOON...
    // $(".restaurant").on("click", function() {
    // $("#first-option").modal("hide");
    // $("#second-option").modal("show");
    // console.log("restaurant selected click works!");
    // console.log(this);
    // });
  });
  //END OF RECIPE OR RESTURAUNT MODAL

  // FIRST CHOICE FROM 4 RANDOM MEAL OPTIONS
  $("#second-option").on("shown.bs.modal", function() {
    if ($("#second-option").is(":visible")) {
      startTimer(10, function() {
        console.log(
          "TIME IS UP! - picking random dish and moving to next Modal"
        );
        // IF TIMER REACHES 0 RANDOM PICK FROM 4 AND MOVES TO NEXT MODAL
        let index = Math.floor(Math.random() * 3);
        let secondRandomChoice = $("#option" + index);
        secondRandomChoice
          .attr("id", "user-choice-img")
          .removeClass("first-choice")
          .addClass("second-choice");
        $(".user-choice").prepend(secondRandomChoice);
        $("#second-option").modal("hide");
        $("#third-option").modal("show");
        // code copy and pasted here to add images to second choice options if no click event
        var imgid = $(".second-choice").attr("id");
        imgid = imgid.replace("option", "");
        for (i = 4; i < 8; i++) {
          var randomnum = Math.floor(Math.random() * 31);
          var randomdish = r.recipes[randomnum];
          if (i !== parseInt(imgid)) {
            var imgurl = randomdish.image_url;
            $('img[id="option' + i + '"]')
              .attr({ src: imgurl, data: randomdish.title })
              .addClass(randomdish.source_url);
          }
        }
      });
      $(".first-choice").on("click", function() {
        // SWITCH CLASSES AND APPEND TO SECOND CHOICE MODAL
        $(this)
          .attr("id", "user-choice-img")
          .removeClass("first-choice")
          .addClass("second-choice");
        // console.log("first choice click works!");
        // console.log(this);
        $(".user-choice").prepend(this);
        $("#second-option").modal("hide");
        $("#third-option").modal("show");
        var imgid = $(".second-choice").attr("id");
        imgid = imgid.replace("option", "");
        for (i = 4; i < 8; i++) {
          var randomnum = Math.floor(Math.random() * 31);
          var randomdish = r.recipes[randomnum];
          if (i !== parseInt(imgid)) {
            var imgurl = randomdish.image_url;
            $('img[id="option' + i + '"]')
              .attr({ src: imgurl, data: randomdish.title })
              .addClass(randomdish.source_url);
          }
        }
      });
    } else {
      $(".first-choice").on("click", function() {
        return false;
      });
    }
  });

  $("#second-option").on("hidden.bs.modal", function() {
    $(".first-choice").on("click", function() {
      // console.log("first choice click works!");
      // SWITCH CLASSES AND APPEND TO SECOND CHOICE MODAL
      $(this)
        .attr("id", "user-choice-img")
        .removeClass("first-choice")
        .addClass("second-choice");
      // console.log(this);
      $(".user-choice").prepend(this);
      $("#second-option").modal("hide");
      $("#third-option").modal("show");

      var imgid = $(this).attr("id");
      imgid = imgid.replace("option", "");
      for (i = 4; i < 8; i++) {
        var randomnum = Math.floor(Math.random() * 31);
        var randomdish = r.recipes[randomnum];
        // console.log(randomdish);
        // console.log(imgid);
        // console.log(titleID);
        console.log(i);
        if (i !== parseInt(imgid)) {
          var imgurl = randomdish.image_url;
          console.log(imgurl);
          // console.log(title);
          $('img[id="option' + i + '"]')
            .attr({ src: imgurl, data: randomdish.title })
            .addClass(randomdish.source_url);
        }
      }
    });

    // SECOND CHOICE FROM 4 RANDOM OPTIONS
    $("#third-option").on("shown.bs.modal", function() {
      if ($("#third-option").is(":visible")) {
        startTimer(10, function() {
          console.log(
            "TIME IS UP! - picking random dish and moving to results page"
          );
          // IF TIMER REACHES 0 RANDOM PICK FROM 4 AND MOVES TO NEXT MODAL
          let index = Math.floor(Math.random() * 4) + 4;
          let secondRandomChoice = $("#option" + index);
          secondRandomChoice
            .attr("id", "user-choice-img")
            .removeClass("second-choice")
            .addClass("end-result");
          $("#final-choice").prepend(secondRandomChoice);
          $("#third-option").modal("hide");
          $("#results").show();
        });
        $(".second-choice").on("click", function() {
          // REMOVE CLASSES AND APPEND DATA TO END RESULT DIVS
          $(this).removeClass("second-choice");
          $("#final-choice").prepend(this);
          $("#third-option").modal("hide");
          // console.log("second choice click works!");
          $(".recipe-title").html($(this).attr("data"));
          $(".recipe-url").html(
            "<a target='_blank' href='" +
              $(this).attr("class") +
              "'>Visit recipe website </a>"
          );
          // console.log(this);
          // console.log($(this).attr("data"));
          // console.log($(this).attr("class"));
          $("#results").show();
        });
      } else {
        $(".second-choice").on("click", function() {
          return false;
        });
      }
      $("#third-option").on("hidden.bs.modal", function() {
        clearInterval(timeIntervalID);
      });
    });
  });
});
