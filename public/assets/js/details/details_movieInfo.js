const postImg = $('#postImg');
const background = $('#movie-detail-background');
const title = $('#title');
const rating = $('#rating');
const format = $('#format');
const time = $('#time');
const genre = $('#genre');
const language = $('#language');
const releaseDate = $('#releaseDate');
const info = $('#info');
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Convert seconds into hours, minutes and second
function formatSec(seconds) {
    let hours = 0, mins = 0;
    hours = parseInt(seconds / 3600);
    seconds %= 3600;
    mins = parseInt(seconds / 60);
    let format = "";
    format += hours == 0 ? "" : hours.toString() + "hr ";
    format += mins == 0 ? "" : mins.toString() + "min";
    return format;
}

// Convert genre to String
function formatGenre(genre) {
    if (genre.length == 0) return "";
    let format = ""
    for (let i = 0; i < genre.length; ++i) {
        if (i < genre.length - 1) {
            format += genre[i];
            format += ",";
        } else {
            format += genre[i];
        }
    }
    return format;
}

// Convert Date to String
function formatReleaseDate(releaseDate) {
    releaseDate = new Date(releaseDate);
    const releaseYear = releaseDate.getFullYear();
    const releaseMonth = releaseDate.getMonth();
    const releaseDay = releaseDate.getDate();
    return releaseDay.toString() + " " + month[releaseMonth] + "," + releaseYear;
}

function getMovieIdFromUrl() {
    const url = window.location.href;
    let index = url.lastIndexOf('\/');
    let str = url.substring(index + 1, url.length);
    return str;
}

let movieDetail;

$.ajax({
    type: 'post',
    url: '/details/movieInfo',
    contentType: 'application/json',
    data: JSON.stringify({
        id: getMovieIdFromUrl()
    })
}).then (function (responMessage) {
    movieDetail = responMessage.doc;
    postImgUrl = movieDetail.images[0].mainImg;
    movieName = movieDetail.movieName;
    IMDBRating = movieDetail.IMDBRating;
    runtimeInSecs = movieDetail.runtimeInSecs;
    movieGenre = movieDetail.genre;
    movieLanguage = movieDetail.language;
    movieReleaseDate = movieDetail.releaseDate;
    backgroundImgUrl = movieDetail.images[0].others[0];
    movieDescription = movieDetail.description;
    movieFormat = '2D, 3D, IMAX 2D, IMAX 3D';

    postImg.append("<img src=\"" + postImgUrl + "\">");
    title.text(movieName);
    rating.text(IMDBRating);
    format.text(movieFormat);
    time.text(formatSec(runtimeInSecs));
    genre.text(formatGenre(movieGenre));
    language.text(movieLanguage);
    releaseDate.text(formatReleaseDate(movieReleaseDate));
    background.css('background-image', background.css('background-image') + ', ' + 'url(' + backgroundImgUrl + ')');
    info.text(movieDescription);
});

const book = $('#book');

book.click(function () {

});