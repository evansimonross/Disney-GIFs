//Three default sets of movies and the current topics displayed initialized as arrays of strings
var animalMovies = ['lion king', 'aristocats', '101 dalmatians', 'fox and the hound', 'lady and the tramp', 'dumbo', 'bambi', 'jungle book', 'robin hood', 'finding nemo', 'ratatouille', 'princess and the frog', 'zootopia'];
var princessMovies = ['beauty and the beast', 'snow white', 'cinderella', 'pochahontas', 'mulan', 'princess and the frog', 'little mermaid', 'sleeping beauty', 'tangled', 'aladdin', 'brave', 'frozen'];
var otherMovies = ['tarzan', 'up', 'peter pan', 'inside out', 'treasure planet', 'atlantis', 'monsters inc', 'lilo and stitch', 'hercules', 'alice in wonderland', 'toy story', 'wall-e', 'pinocchio'];
var topics = [];
var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
var repeatClicks = {
    lastButton: "",
    offset: 0
};

//Chooses 5 random movies each from the three default sets and displays them.
function randomTopics() {
    topics = [];
    for (var i = 0; i < 15; i++) {
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
}

// Copies one default set into the topics and displays them.
function animalTopics() {
    topics = animalMovies.slice(0);
    displayTopics();
}

function princessTopics() {
    topics = princessMovies.slice(0);
    displayTopics();
}

function otherTopics() {
    topics = otherMovies.slice(0);
    displayTopics();
}

function displayTopics() {
    $('#buttons').empty();
    $('#buttons').append('<h3>Disney Movies</h3>');
    topics.forEach(function (movie) {
        $('#buttons').append($('<button type="button" class="topicButton btn btn-info btn-sm">' + movie + '</button>'))
    });
}

function addTopic() {
    if ($('input').val() === "") { return; }
    topics.push($('input').val().toLowerCase());
    $('input').val("");
    displayTopics();
}

function clearGIFs() {
    $('#gifs').empty();
    $('#currentMovie').empty();
}

function favoriteGIFs() {
    favorites.forEach(function(element){
        var div = addGIF(element.still, element.animated, element.rating);
    });
}

function addGIF(stillUrl, animatedUrl, rating) {
    var image = $('<img class="gif" src="' + stillUrl + '" data-still="' + stillUrl + '" data-animated="' + animatedUrl + '" data-rating="' + rating + '">');
    var div = $('<div>');
    div.addClass('imageDiv');
    div.append(image);
    div.append('<p>Rated <b>' + rating + '</b>&nbsp;&nbsp;&nbsp;<span class="fa fa-star"></span>&nbsp;&nbsp;&nbsp;<a href = "' + animatedUrl + '" target="_blank"><span class="fa fa-download"></span></a></p>');
    $('#gifs').prepend(div);
    if(indexOfFavorite(stillUrl)!=-1){
        $($(div.children()[1]).children()[1]).css('color','hotpink');
    }
    return div;
}

function indexOfFavorite(stillUrl){
    for(var i=0; i<favorites.length; i++){
        favStill = favorites[i].still;
        if(favStill.substring(15) === stillUrl.substring(15)) { return i; }
    }
    return -1;
}

$(document).on('click', '.topicButton', function () {
    if(repeatClicks.lastButton === $(this).text()){
        repeatClicks.offset += 10;
    }
    else{
        $('#currentMovie').empty();
        repeatClicks.lastButton = $(this).text();
        repeatClicks.offset = 0;
        var movieQuery = "http://www.omdbapi.com/?apikey=trilogy&t=" + $(this).text();
        $.ajax({
            url: movieQuery,
            method: "GET"
        }).then(function (response){
            $('#currentMovie').append('<h3>Current Movie</h3>');
            $('#currentMovie').append('<img src="' + response.Poster + '">');
            $('#currentMovie').append('<h5>' + response.Title + ' (' + response.Year + ')</h5>');
            $('#currentMovie').append('<p>' + response.Plot + '</p>');
        });

    }

    var queryUrl = "https://api.giphy.com/v1/gifs/search?apikey=MIGbFlFU7iE630je8nt9rZuN7qkxVLCq&q=" + $(this).text() + " disney&limit=10&offset=" + repeatClicks.offset + "&rating=R&lang=en";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            //console.log(response.data[i]);
            var stillUrl = response.data[i].images.fixed_height_still.url;
            var animatedUrl = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating.toUpperCase();
            addGIF(stillUrl, animatedUrl, rating);
        }
    });
});

$(document).on('click', '.gif', function () {
    if ($(this).attr('src') === $(this).attr('data-still')) {
        $(this).attr('src', $(this).attr('data-animated'));
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
    }
});

$(document).on('click', '.fa-star', function (event) {
    //event.preventDefault();
    var image = $($(this).parent().parent()[0]).children()[0];
    var favData = { still: $(image).attr('data-still'), animated: $(image).attr('data-animated'), rating: $(image).attr('data-rating')};
    var index = indexOfFavorite(favData.still);
    if(index===-1){
        favorites.push(favData);
        $(this).css('color', 'hotpink');
    }
    else{
        favorites.splice(index,1);
        $(this).css('color', 'black');
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
});

$(document).on('click', '.fa-download', function(event){
    //event.preventDefault();
    var image = $($(this).parent().parent()[0]).children()[0];
});

$(document).ready(function () {
    randomTopics();
});