// TIMER VARIABLES
let seconds;
let timeIntervalID;
//TIMER FOR MODALS
function startTimer(secs, callback) {
  seconds = secs;

  clearInterval(timeIntervalID);

  $(".timer").html(seconds);

  timeIntervalID = setInterval(function () {
    seconds--;
    if (seconds <= 0) {
      callback();
      clearInterval(timeIntervalID);
    }
    $(".timer").html(seconds);
  }, 1000);
}
//DOC READY FUNCTION
$(document).ready(function () {
  start();

  let apiKey = "f7fa810975b0eab355eea6ac33eed813";
  let queryList = ["chicken", "lamb", "pork", "pasta", "fish", "beef", "rice", "noodles", "cheese", "eggs", "nuts", "tofu"]
  let query = queryList[Math.floor(Math.random() * (queryList.length - 1))]
  var queryURL =
    "https://www.food2fork.com/api/search?key=" + apiKey + "&q=" + query;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    r = JSON.parse(response);
    recipes = r.recipes;

    var dish = "";

    for (let i = 0; i < 4; i++) {
      dish = randomDish();
      $("#option" + i)
        .attr({ src: dish.image_url, data: dish.title })
        .addClass(dish.source_url);
    }
  });

  //To pick a dish randomly
  function randomDish() {
    var randomnum = Math.floor(Math.random() * 29);
    randomDish2 = recipes[randomnum];
    return randomDish2;
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
  $(".restart").on("click", function () {
    $("#results").hide();
    start();
    clearInterval(timeIntervalID);
  });

  //Hides the get started button after click
  $("#get-started").on("click", function () {
    $(this).hide();
  });

  // start over click function
  $("#start-over").on("click", function () {
    start();
    clearInterval(timeIntervalID);
    for (let i = 0; i < 4; i++) {
      dish = randomDish();
      $("#option" + i)
        .attr({ src: dish.image_url, data: dish.title })
        .addClass(dish.source_url);
    }
  });
  // start over click function
  $("#start-over-two").on("click", function () {
    start();
    clearInterval(timeIntervalID);
    for (let i = 0; i < 4; i++) {
      // console.log("1", i);
      dish = randomDish();
      //console.log(dish);
      // console.log("2", i);
      $("#option" + i)
        .attr({ src: dish.image_url, data: dish.title })
        .addClass(dish.source_url);
      // console.log("3", i);
    }
  });

  // Modal click functions
  $("#first-option").on("shown.bs.modal", function () {
    $("#intro").hide();
    $("#results").hide();

    // END CHOICE (RECIPE)

    $(".recipe").on("click", function () {
      // console.log(this);
      // console.log("recipe selected click works!");
      $("#recipe-result").show();
      $("#nutrition-result").hide();
      $("#first-option").modal("hide");
      $("#second-option").modal("show");
    });

    $(".nut").on("click", function () {
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
  $("#second-option").on("shown.bs.modal", function () {
    if ($("#second-option").is(":visible")) {
      startTimer(10, function () {
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
          var randomnum = Math.floor(Math.random() * 29);
          var randomDish = r.recipes[randomnum];
          if (i !== parseInt(imgid)) {
            var imgurl = randomDish.image_url;
            $('img[id="option' + i + '"]')
              .attr({ src: imgurl, data: randomDish.title })
              .addClass(randomDish.source_url);
          }
        }
      });
      $(".first-choice").on("click", function () {
        // SWITCH CLASSES AND APPEND TO SECOND CHOICE MODAL
        $(this)
          .attr("id", "user-choice-img")
          .removeClass("first-choice")
          .addClass("second-choice");
        $(".user-choice").prepend(this);
        $("#second-option").modal("hide");
        $("#third-option").modal("show");
        var imgid = $(".second-choice").attr("id");
        imgid = imgid.replace("option", "");
        for (i = 4; i < 8; i++) {
          var randomnum = Math.floor(Math.random() * 29);
          var randomDish = r.recipes[randomnum];
          if (i !== parseInt(imgid)) {
            var imgurl = randomDish.image_url;
            $('img[id="option' + i + '"]')
              .attr({ src: imgurl, data: randomDish.title })
              .addClass(randomDish.source_url);
          }
        }
      });
    } else {
      $(".first-choice").on("click", function () {
        return false;
      });
    }
  });

  $("#second-option").on("hidden.bs.modal", function () {
    $(".first-choice").on("click", function () {
      // SWITCH CLASSES AND APPEND TO SECOND CHOICE MODAL
      $(this)
        .attr("id", "user-choice-img")
        .removeClass("first-choice")
        .addClass("second-choice");
      $(".user-choice").prepend(this);
      $("#second-option").modal("hide");
      $("#third-option").modal("show");

      var imgid = $(this).attr("id");
      imgid = imgid.replace("option", "");
      for (i = 4; i < 8; i++) {
        var randomnum = Math.floor(Math.random() * 29);
        var randomDish = r.recipes[randomnum];
        if (i !== parseInt(imgid)) {
          var imgurl = randomDish.image_url;
          $('img[id="option' + i + '"]')
            .attr({ src: imgurl, data: randomDish.title })
            .addClass(randomDish.source_url);
        }
      }
    });

    // SECOND CHOICE FROM 4 RANDOM OPTIONS
    $("#third-option").on("shown.bs.modal", function () {
      if ($("#third-option").is(":visible")) {
        startTimer(10, function () {
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
        $(".second-choice").on("click", function () {
          // REMOVE CLASSES AND APPEND DATA TO END RESULT DIVS
          $(this).removeClass("second-choice");
          $("#final-choice").prepend(this);
          $("#third-option").modal("hide");
          $(".recipe-title").html($(this).attr("data"));
          $(".recipe-url").html(
            "<a target='_blank' href='" +
            $(this).attr("class") +
            "'>Visit recipe website </a>"
          );
          $("#results").show();
        });
      } else {
        $(".second-choice").on("click", function () {
          return false;
        });
      }
      $("#third-option").on("hidden.bs.modal", function () {
        clearInterval(timeIntervalID);
      });
    });
  });
});