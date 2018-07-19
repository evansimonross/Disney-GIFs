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
    alert("CLICK");
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