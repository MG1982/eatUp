// https://www.food2fork.com/api/search?key=328e7ee2a4092e96d84cefb806a0f42c&q=chicken

let apiKey = "328e7ee2a4092e96d84cefb806a0f42c";
let query = "chicken";
var queryURL =
    "https://www.food2fork.com/api/search?key=" +
    apiKey + "&q=" + query;
let firstChoice;
let secondChoice;
let thirdChoice;
let finalChoice;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    r = JSON.parse(response)
    console.log(r)
    console.log(r.recipes)
    console.log(r.recipes[0].title)


    imagePrinter()

})

//function to set Attributes (image link + rating) 
function imageAttributes(element, image, rating) {
    $(element).attr("src", image)
    $(element).append("Recipe rating: " + rating)
}

//function placing attributes to each div
function imagePrinter() {
    for (i = 0; i < 4; i++) {
        imageAttributes("#option" + i, r.recipes[i].image_url, r.recipes[i].social_rank);
    }

}

function finalMeal() {

}




//onclick restaurant
//onclick recipe