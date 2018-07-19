var animalMovies = ['lion king', 'aristocats', '101 dalmatians', 'fox and the hound', 'lady and the tramp', 'dumbo', 'bambi', 'jungle book', 'robin hood', 'finding nemo', 'ratatouille', 'princess and the frog', 'zootopia'];
var princessMovies = ['beauty and the beast', 'snow white', 'cinderella', 'pochahontas', 'mulan', 'princess and the frog', 'little mermaid', 'sleeping beauty', 'tangled', 'aladdin', 'brave', 'frozen'];
var otherMovies = ['tarzan', 'up', 'peter pan', 'inside out', 'treasure planet', 'atlantis', 'monsters inc', 'lilo and stitch', 'hercules', 'alice in wonderland', 'toy story', 'wall-e'];
var topics = [];

function displayTopics(){
    topics.forEach(function(movie){
        $('#buttons').append($('<button type="button" class="topicButton btn btn-info btn-sm">' + movie + '</button>'))
    });
}

$(document).on('click','.topicButton',function(){

    var queryUrl = "https://api.giphy.com/v1/gifs/search?apikey=MIGbFlFU7iE630je8nt9rZuN7qkxVLCq&q=" + $(this).text() + " disney&limit=10&offset=0&rating=R&lang=en";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        for(var i=0;i<10;i++){
            console.log(response.data[i]);
            var stillUrl = response.data[i].images.fixed_height_still.url;
            var animatedUrl = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;
            var image = $('<img class="gif" src="' + stillUrl + '" data-still="' + stillUrl + '" data-animated="' + animatedUrl + '">');
            $('#gifs').prepend(image);
        }
        
    });
});

$(document).ready(function () {
    for (var i = 0; i < 12; i++) {
        if (i % 3 === 0) {
            var movie = animalMovies[Math.floor(Math.random() * animalMovies.length)];
            if (topics.indexOf(movie) === -1) {
                topics.push(movie);
            }
            else {
                i--;
            }
        }
        else if (i % 3 === 1) {
            var movie = princessMovies[Math.floor(Math.random() * princessMovies.length)];
            if (topics.indexOf(movie) === -1) {
                topics.push(movie);
            }
            else {
                i--;
            }
        }
        else {
            var movie = otherMovies[Math.floor(Math.random() * otherMovies.length)];
            if (topics.indexOf(movie) === -1) {
                topics.push(movie);
            }
            else {
                i--;
            }
        }
    }
    displayTopics();
});